"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "./gsap";

/**
 * Off Brand-style cursor (desktop, fine pointer only).
 * - default: 8px dot
 * - over links/buttons: 48px ring
 * - over [data-cursor="View|Play|Drag"]: 88px ink disc with a word
 * Dot inverts on dark sections via mix-blend-mode: difference.
 * - behind it, a short gold "river" trail follows the pointer and settles when you stop
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState<"dot" | "ring" | "label">("dot");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    registerGsap();
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const el = dot.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    // gold trail: recent pointer points, eased, smoothed into a curve
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pts: { x: number; y: number }[] = [];
    const head = { x: -100, y: -100, tx: -100, ty: -100 };
    let raf = 0;
    const drawTrail = () => {
      head.x += (head.tx - head.x) * 0.35;
      head.y += (head.ty - head.y) * 0.35;
      const last = pts[pts.length - 1];
      if (!last || Math.hypot(last.x - head.x, last.y - head.y) > 2) pts.push({ x: head.x, y: head.y });
      else if (pts.length) pts.shift(); // idle: the tail drains away
      while (pts.length > 22) pts.shift();
      if (trail.current) {
        if (pts.length < 3) trail.current.setAttribute("d", "");
        else {
          let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
          for (let i = 1; i < pts.length - 1; i++) {
            const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2;
            d += `Q${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
          }
          trail.current.setAttribute("d", d);
        }
      }
      raf = requestAnimationFrame(drawTrail);
    };
    if (!reduce) raf = requestAnimationFrame(drawTrail);

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (head.tx < -50) { head.x = e.clientX; head.y = e.clientY; }
      head.tx = e.clientX;
      head.ty = e.clientY;
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.dataset.cursor || "");
      } else if (t.closest("a, button, [role=button], input, textarea, select, label")) {
        setMode("ring");
      } else {
        setMode("dot");
      }
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to(el, { opacity: 1, duration: 0.2 });
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  const size = mode === "label" ? 88 : mode === "ring" ? 48 : 8;
  return (
    <>
    <svg aria-hidden className={`pointer-events-none fixed inset-0 z-[99] h-full w-full ${enabled ? "" : "hidden"}`}>
      <path ref={trail} fill="none" stroke="var(--color-gold)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
    </svg>
    <div
      ref={dot}
      aria-hidden
      hidden={!enabled}
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ mixBlendMode: mode === "label" ? "normal" : "difference" }}
    >
      <div
        className="flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-300 ease-[var(--ease-out-expo)]"
        style={{
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          background: mode === "ring" ? "transparent" : mode === "label" ? "var(--color-ink)" : "#fff",
          border: mode === "ring" ? "1.5px solid #fff" : "none",
        }}
      >
        {mode === "label" && <span className="t-label text-paper">{label}</span>}
      </div>
    </div>
    </>
  );
}
