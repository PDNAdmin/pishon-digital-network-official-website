"use client";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "./gsap";

/**
 * The River Line (design-plan §5): the Pishon line.
 * One thin line that winds between sections like the river in the PDN mark.
 *
 * - draws as you scroll, led by a glowing gold tip
 * - it's liquid: it bends away from the cursor, and a fast pass or a click
 *   plucks it like a string (the ripple travels along the line)
 * - once drawn, a gold current keeps flowing along it; the end dot pulses
 *
 * Paths are authored on a base canvas and re-scaled to the element's pixel size,
 * then sampled into points so the physics can move them.
 */

/** Scale an absolute M/C/L path (x,y pairs) from a base canvas to w×h. */
export function scalePath(d: string, sx: number, sy: number) {
  let i = 0;
  return d.replace(/-?\d*\.?\d+/g, (n) => {
    const v = parseFloat(n) * (i++ % 2 === 0 ? sx : sy);
    return v.toFixed(1);
  });
}

/** Measures an element and returns its size (updates on resize). */
export function useSize<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setSize((s) => (s && Math.abs(s.w - width) < 1 && Math.abs(s.h - height) < 1 ? s : { w: width, h: height }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

const BASE_W = 1440;
const BASE_H = 240;
const PATHS = {
  a: "M140 0 C140 70 360 70 520 110 C660 145 760 80 700 50 C640 20 600 150 720 168 C900 195 1240 150 1300 240",
  b: "M1300 0 C1300 80 1080 60 930 110 C800 150 720 60 780 40 C845 18 860 160 740 170 C540 190 180 150 140 240",
};

type Props = {
  variant?: keyof typeof PATHS;
  dark?: boolean;
  className?: string;
  height?: number;
};

const N = 64; // sample points (enough for a smooth curve, cheap to move)
const REACH = 110; // px: how far the cursor's influence reaches

/** Catmull-Rom through points → smooth cubic path. */
function smooth(xs: Float32Array, ys: Float32Array) {
  let d = `M${xs[0].toFixed(1)} ${ys[0].toFixed(1)}`;
  for (let i = 0; i < xs.length - 1; i++) {
    const i0 = Math.max(0, i - 1);
    const i3 = Math.min(xs.length - 1, i + 2);
    const c1x = xs[i] + (xs[i + 1] - xs[i0]) / 6;
    const c1y = ys[i] + (ys[i + 1] - ys[i0]) / 6;
    const c2x = xs[i + 1] - (xs[i3] - xs[i]) / 6;
    const c2y = ys[i + 1] - (ys[i3] - ys[i]) / 6;
    d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${xs[i + 1].toFixed(1)} ${ys[i + 1].toFixed(1)}`;
  }
  return d;
}

export default function RiverLine({ variant = "a", dark = false, className = "", height = 200 }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);
  const current = useRef<SVGPathElement>(null);
  const tip = useRef<SVGGElement>(null);
  const end = useRef<HTMLSpanElement>(null);
  const size = useSize(wrap);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (!size || !size.w || !wrap.current) return;
    registerGsap();
    const reduce = prefersReducedMotion();
    const fine = window.matchMedia("(pointer: fine)").matches;
    let alive = true; // false once this line is gone (page change): every callback checks it

    // sample the scaled path into points + normals (once per size)
    const d0 = scalePath(PATHS[variant], size.w / BASE_W, size.h / BASE_H);
    const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
    probe.setAttribute("d", d0);
    const L = probe.getTotalLength();
    const bx = new Float32Array(N + 1), by = new Float32Array(N + 1);
    const nx = new Float32Array(N + 1), ny = new Float32Array(N + 1);
    for (let i = 0; i <= N; i++) {
      const s = (L * i) / N;
      const p = probe.getPointAtLength(s);
      const q = probe.getPointAtLength(Math.min(L, s + 1));
      const r = probe.getPointAtLength(Math.max(0, s - 1));
      const tx = q.x - r.x, ty = q.y - r.y;
      const tl = Math.hypot(tx, ty) || 1;
      bx[i] = p.x; by[i] = p.y;
      nx[i] = -ty / tl; ny[i] = tx / tl;
    }
    const disp = new Float32Array(N + 1), vel = new Float32Array(N + 1);
    const xs = new Float32Array(N + 1), ys = new Float32Array(N + 1);
    let progress = reduce ? 1 : 0;
    let disturbed = false; // only rebuild the curve while it's actually moving
    let wasDrawn = false;
    const pointer = { x: -9999, y: -9999, px: -9999, py: -9999, near: false };
    let rect = wrap.current.getBoundingClientRect();

    line.current?.setAttribute("d", d0);
    current.current?.setAttribute("d", d0);

    /** cheap per-scroll update: just move the tip and end dot */
    const placeMarkers = () => {
      const k = Math.round(progress * N);
      const tx = disturbed ? xs[k] : bx[k], ty = disturbed ? ys[k] : by[k];
      if (tip.current) {
        tip.current.setAttribute("transform", `translate(${tx.toFixed(1)} ${ty.toFixed(1)})`);
        tip.current.style.opacity = progress > 0.01 && progress < 0.985 ? "1" : "0";
      }
      if (end.current) end.current.style.transform = `translate(${bx[N].toFixed(1)}px, ${by[N].toFixed(1)}px) translate(-50%, -50%) scale(${progress >= 0.985 ? 1 : 0})`;
    };
    /** full curve rebuild: only while the line is bending */
    const renderCurve = () => {
      for (let i = 0; i <= N; i++) {
        xs[i] = bx[i] + nx[i] * disp[i];
        ys[i] = by[i] + ny[i] * disp[i];
      }
      const d = disturbed ? smooth(xs, ys) : d0;
      line.current?.setAttribute("d", d);
      current.current?.setAttribute("d", d);
      placeMarkers();
    };

    // physics: a string with springs, coupled neighbours, damping
    let raf = 0;
    let awake = false;
    const step = () => {
      raf = 0;
      if (!alive) return;
      let energy = 0;
      const speed = Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py);
      for (let i = 0; i <= N; i++) {
        let target = 0;
        if (pointer.near && i / N <= progress + 0.02) {
          const dx = pointer.x - bx[i], dy = pointer.y - by[i];
          const dist = Math.hypot(dx, dy);
          if (dist < REACH) {
            const side = dx * nx[i] + dy * ny[i] > 0 ? -1 : 1; // push away from the cursor
            const f = 1 - dist / REACH;
            target = side * f * f * 34;
            if (speed > 14) vel[i] += side * f * Math.min(speed, 60) * 0.06; // a fast pass plucks it
          }
        }
        const lap = i > 0 && i < N ? disp[i - 1] + disp[i + 1] - 2 * disp[i] : -disp[i];
        vel[i] += (target - disp[i]) * 0.06 + lap * 0.22;
        vel[i] *= 0.9;
      }
      for (let i = 0; i <= N; i++) {
        disp[i] += vel[i];
        energy += Math.abs(vel[i]) + Math.abs(disp[i]) * 0.02;
      }
      disp[0] = disp[N] = 0;
      pointer.px = pointer.x;
      pointer.py = pointer.y;
      disturbed = energy > 0.02;
      if (!disturbed) disp.fill(0), vel.fill(0);
      renderCurve();
      if (disturbed || pointer.near) raf = requestAnimationFrame(step);
      else awake = false;
    };
    const wake = () => {
      if (awake || !alive) return;
      awake = true;
      raf = requestAnimationFrame(step);
    };

    const toLocal = (e: PointerEvent) => {
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      const m = REACH;
      pointer.near = pointer.x > -m && pointer.y > -m && pointer.x < rect.width + m && pointer.y < rect.height + m;
    };
    const onMove = (e: PointerEvent) => {
      if (!alive) return;
      toLocal(e);
      if (pointer.near) wake();
    };
    const onDown = (e: PointerEvent) => {
      if (!alive) return;
      toLocal(e);
      if (!pointer.near) return;
      let best = -1, bd = 1e9;
      for (let i = 0; i <= N; i++) {
        const dd = Math.hypot(pointer.x - bx[i], pointer.y - by[i]);
        if (dd < bd) { bd = dd; best = i; }
      }
      if (bd > REACH) return;
      for (let j = Math.max(1, best - 3); j <= Math.min(N - 1, best + 3); j++) vel[j] += (1 - Math.abs(j - best) / 4) * 16;
      wake();
    };
    // keep the line's position cached (no layout reads on every mouse move)
    let rectRaf = 0;
    const refreshRect = () => {
      if (rectRaf || !alive) return;
      rectRaf = requestAnimationFrame(() => {
        rectRaf = 0;
        if (alive && wrap.current) rect = wrap.current.getBoundingClientRect();
      });
    };

    // only listen while the line is on (or near) the screen
    let listening = false;
    const listen = (on: boolean) => {
      if (on === listening || !fine || reduce) return;
      listening = on;
      const fn = on ? window.addEventListener : window.removeEventListener;
      fn("pointermove", onMove as EventListener, { passive: true } as AddEventListenerOptions);
      fn("pointerdown", onDown as EventListener, { passive: true } as AddEventListenerOptions);
      fn("scroll", refreshRect, { passive: true } as AddEventListenerOptions);
      fn("resize", refreshRect);
      if (on) refreshRect();
    };
    const io = new IntersectionObserver(([e]) => alive && listen(e.isIntersecting), { rootMargin: "120px 0px" });
    io.observe(wrap.current);

    placeMarkers();
    let ctx: gsap.Context | undefined;
    if (!reduce) {
      if (line.current) {
        line.current.style.strokeDasharray = "1";
        line.current.style.strokeDashoffset = "1";
      }
      ctx = gsap.context(() => {
        const st = { p: 0 };
        gsap.to(st, {
          p: 1,
          ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top 85%", end: "bottom 45%", scrub: 0.6 },
          onUpdate: () => {
            if (!alive) return;
            progress = st.p;
            if (line.current) line.current.style.strokeDashoffset = String(1 - progress);
            const isDrawn = progress >= 0.985;
            if (isDrawn !== wasDrawn) {
              wasDrawn = isDrawn;
              setDrawn(isDrawn);
            }
            if (!awake) placeMarkers();
          },
        });
      }, wrap);
    } else {
      setDrawn(true);
    }
    return () => {
      alive = false;
      io.disconnect();
      listen(false);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rectRaf);
      ctx?.revert();
    };
  }, [size, variant]);

  const ink = dark ? "var(--color-gold)" : "var(--color-ink)";
  return (
    <div ref={wrap} aria-hidden className={`pointer-events-none relative w-full ${className}`} style={{ height }}>
      {size && (
        <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} className="absolute inset-0 overflow-visible">
          <path ref={line} pathLength={1} fill="none" stroke={ink} strokeWidth={1.5} strokeLinecap="round" />
          {/* the current: a short gold run that keeps flowing once the line is drawn */}
          <path
            ref={current}
            pathLength={1}
            fill="none"
            stroke={dark ? "var(--color-paper)" : "var(--color-gold)"}
            strokeWidth={2.5}
            strokeLinecap="round"
            className={`river-current transition-opacity duration-700 ${drawn ? "opacity-100" : "opacity-0"}`}
          />
          {/* the tip: leads the line while it draws */}
          <g ref={tip} style={{ opacity: 0, transition: "opacity .3s" }}>
            <circle r={9} fill="var(--color-gold)" opacity={0.22} />
            <circle r={4} fill="var(--color-gold)" />
          </g>
        </svg>
      )}
      <span ref={end} className="absolute left-0 top-0 block h-3 w-3 rounded-full bg-gold transition-transform duration-300" style={{ transform: "scale(0)" }}>
        {drawn && <span className="river-drop absolute inset-0 rounded-full border border-gold" />}
      </span>
    </div>
  );
}

/** A sized, drawable path for any container (used by the steps line and hero underline). */
export function FlexPath({
  d,
  baseW,
  baseH,
  stroke,
  strokeWidth = 1.5,
  className = "",
  style,
  pathRef,
}: {
  d: string;
  baseW: number;
  baseH: number;
  stroke: string;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  pathRef?: RefObject<SVGPathElement | null>;
}) {
  const box = useRef<HTMLDivElement>(null);
  const size = useSize(box);
  return (
    <div ref={box} aria-hidden className={`pointer-events-none ${className}`} style={style}>
      {size && size.w > 0 && (
        <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} className="overflow-visible">
          <path
            ref={pathRef}
            d={scalePath(d, size.w / baseW, size.h / baseH)}
            pathLength={1}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
