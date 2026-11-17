import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO, PLATES, asset } from "../theme";
import { MarkGlyph } from "../components/Mark";

/* ==================================================================
   Motion kit for the showreel.
   CameraRig · ScreenOnPlate · CardFlip3D · ConsentGate · StatusCycle
   AnchoredKinetic (InlineKineticText) · Mascot · Typewriter · Icon
================================================================== */

/** Snappy UI spring (cards, type) and the bouncy one reserved for the mascot + celebrations. */
export const UI = { stiffness: 180, damping: 18, mass: 0.8 };
export const BOUNCY = { stiffness: 180, damping: 11, mass: 0.8 };
export const CAM_EASE = Easing.bezier(0.83, 0, 0.17, 1);

export function useUi(at: number, config = UI) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - at, fps, config });
}

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ------------------------------------------------------------------
   CameraRig: a 2.5D virtual camera over a world.
   Each key = "start moving at f, arrive d frames later" at focus (x, y) and zoom z.
------------------------------------------------------------------- */
export type CamKey = { f: number; x: number; y: number; z: number; d?: number; rx?: number; ry?: number };

export function cameraAt(keys: CamKey[], frame: number) {
  let prev = keys[0];
  let cur = keys[0];
  for (let i = 0; i < keys.length; i++) {
    if (frame >= keys[i].f) {
      prev = keys[i - 1] ?? keys[i];
      cur = keys[i];
    }
  }
  const t = interpolate(frame, [cur.f, cur.f + (cur.d ?? 20)], [0, 1], { ...clamp, easing: CAM_EASE });
  const mix = (a: number, b2: number) => a + (b2 - a) * t;
  // zoom interpolates in log space so punches feel even
  const z = Math.exp(mix(Math.log(prev.z), Math.log(cur.z)));
  return { x: mix(prev.x, cur.x), y: mix(prev.y, cur.y), z, rx: mix(prev.rx ?? 0, cur.rx ?? 0), ry: mix(prev.ry ?? 0, cur.ry ?? 0) };
}

export function CameraRig({ keys, children, drift = true, bg = C.paper }: { keys: CamKey[]; children: ReactNode; drift?: boolean; bg?: string }) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const c = cameraAt(keys, frame);
  const dx = drift ? Math.sin(frame / 47) * 4 : 0;
  const dy = drift ? Math.cos(frame / 61) * 3 : 0;
  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden", perspective: 2400 }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width,
          height,
          transformOrigin: "0 0",
          transform: `translate(${width / 2 + dx}px, ${height / 2 + dy}px) scale(${c.z}) rotateX(${c.rx}deg) rotateY(${c.ry}deg) translate(${-c.x}px, ${-c.y}px)`,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
}

/* ------------------------------------------------------------------
   ScreenOnPlate: real photo of a phone, our UI mapped onto the screen
   (projective transform from Codex's corner data), fingers stay on top.
------------------------------------------------------------------- */
function quadMatrix(w: number, h: number, q: [number, number][]) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / den;
  const k = (dx1 * dy3 - dx3 * dy1) / den;
  const a = x1 - x0 + g * x1, bb = x3 - x0 + k * x3;
  const d = y1 - y0 + g * y1, e = y3 - y0 + k * y3;
  return `matrix3d(${a / w},${d / w},0,${g / w},${bb / h},${e / h},0,${k / h},0,0,1,0,${x0},${y0},0,1)`;
}

/** Expands a quad slightly so the UI tucks under the keyed edge. */
function grow(q: [number, number][], by = 0.012): [number, number][] {
  const cx = q.reduce((s, p) => s + p[0], 0) / 4;
  const cy = q.reduce((s, p) => s + p[1], 0) / 4;
  return q.map(([x, y]) => [x + (x - cx) * by, y + (y - cy) * by]);
}

export function plateScreen(key: string) {
  const p = PLATES[key];
  const [tl, tr, , bl] = p.q;
  const sw = Math.hypot(tr[0] - tl[0], tr[1] - tl[1]);
  const sh = Math.hypot(bl[0] - tl[0], bl[1] - tl[1]);
  const cx = p.q.reduce((s, v) => s + v[0], 0) / 4;
  const cy = p.q.reduce((s, v) => s + v[1], 0) / 4;
  return { ...p, sw, sh, cx, cy };
}

export function ScreenOnPlate({ plate, screenWidth = 520, children, dim = 0 }: { plate: string; screenWidth?: number; children: ReactNode; dim?: number }) {
  const p = plateScreen(plate);
  const w = screenWidth;
  const h = Math.round((w * p.sh) / p.sw);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: p.w, height: p.h, background: C.ink }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, transformOrigin: "0 0", transform: quadMatrix(w, h, grow(p.q as [number, number][])), overflow: "hidden", background: C.paper }}>
        {children}
      </div>
      <Img alt="" src={asset(p.src)} style={{ position: "absolute", inset: 0, width: p.w, height: p.h }} />
      {dim > 0 && <div style={{ position: "absolute", inset: 0, background: `rgba(15,15,16,${dim})` }} />}
    </div>
  );
}

/* ------------------------------------------------------------------
   CardFlip3D: 180° Y-axis flip from front to back.
------------------------------------------------------------------- */
export function CardFlip3D({ at, front, back, width, height, style }: { at: number; front: ReactNode; back: ReactNode; width: number; height: number; style?: CSSProperties }) {
  const p = useUi(at, { stiffness: 120, damping: 16, mass: 0.9 });
  const rot = p * 180;
  const lift = Math.sin(p * Math.PI); // card lifts off the canvas mid-flip
  const face: CSSProperties = { position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" };
  return (
    <div style={{ width, height, perspective: 3000, ...style }}>
      <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transform: `scale(${1 - lift * 0.08}) rotateY(${rot}deg)` }}>
        <div style={face}>{front}</div>
        <div style={{ ...face, transform: "rotateY(180deg)" }}>{back}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Card surface: crisp elevation, tactile.
------------------------------------------------------------------- */
export function Card({ children, style, dark = false, pad = 40 }: { children: ReactNode; style?: CSSProperties; dark?: boolean; pad?: number }) {
  return (
    <div
      style={{
        background: dark ? C.ink : C.white,
        color: dark ? C.paper : C.ink,
        border: dark ? "none" : `1px solid ${C.g200}`,
        borderRadius: 28,
        padding: pad,
        boxShadow: "0 1px 2px rgba(15,15,16,0.06), 0 12px 24px rgba(15,15,16,0.07), 0 40px 80px rgba(15,15,16,0.09)",
        fontFamily: FONT,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   Tap: a fingertip glides in, presses, ripple rings out.
------------------------------------------------------------------- */
export function Tap({ at, size = 64, from = [120, 160] }: { at: number; size?: number; from?: [number, number] }) {
  const frame = useCurrentFrame();
  const inP = useUi(at - 16);
  const press = interpolate(frame, [at - 2, at, at + 5], [1, 0.8, 1], clamp);
  const ripple = interpolate(frame, [at, at + 22], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const out = interpolate(frame, [at + 10, at + 20], [1, 0], clamp);
  if (frame < at - 16 || frame > at + 24) return null;
  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0, pointerEvents: "none" }}>
      {frame >= at && (
        <div style={{ position: "absolute", left: -size * 1.6, top: -size * 1.6, width: size * 3.2, height: size * 3.2, borderRadius: 999, border: `3px solid ${C.gold}`, transform: `scale(${0.3 + ripple * 0.9})`, opacity: 1 - ripple }} />
      )}
      <div
        style={{
          position: "absolute",
          left: -size / 2,
          top: -size / 2,
          width: size,
          height: size,
          borderRadius: 999,
          background: "rgba(15,15,16,0.28)",
          border: "3px solid rgba(255,255,255,0.95)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          transform: `translate(${(1 - inP) * from[0]}px, ${(1 - inP) * from[1]}px) scale(${press})`,
          opacity: inP * out,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
   ConsentGate: the human says yes before anything happens.
------------------------------------------------------------------- */
export function ConsentGate({
  at,
  tapAt,
  who,
  title,
  detail,
  secondary,
  primary,
  done,
  width = 620,
}: {
  at: number;
  tapAt: number;
  who: string;
  title: string;
  detail: string;
  secondary: string;
  primary: string;
  done: string;
  width?: number;
}) {
  const frame = useCurrentFrame();
  const p = useUi(at);
  const tapped = frame >= tapAt;
  const okP = useUi(tapAt + 2);
  const s = width / 620;
  return (
    <div style={{ width, opacity: p, transform: `translateY(${(1 - p) * 40}px) scale(${0.94 + p * 0.06})` }}>
      <Card dark pad={36 * s} style={{ borderRadius: 30 * s }}>
        <div style={{ fontFamily: MONO, fontSize: 17 * s, letterSpacing: "0.08em", color: C.gold, textTransform: "uppercase" }}>{who}</div>
        <div style={{ fontSize: 40 * s, fontWeight: 500, letterSpacing: "-0.02em", marginTop: 14 * s, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 24 * s, color: "rgba(246,245,241,0.65)", marginTop: 10 * s }}>{detail}</div>
        <div style={{ display: "flex", gap: 14 * s, marginTop: 30 * s }}>
          <div style={{ flex: 1, height: 74 * s, borderRadius: 99, border: "1.5px solid rgba(246,245,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 25 * s, opacity: tapped ? 0.35 : 1 }}>
            {secondary}
          </div>
          <div
            style={{
              position: "relative",
              flex: 1.3,
              height: 74 * s,
              borderRadius: 99,
              background: tapped ? C.gold : C.paper,
              color: C.ink,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12 * s,
              fontSize: 25 * s,
              fontWeight: 600,
            }}
          >
            {tapped && <span style={{ display: "inline-flex", transform: `scale(${okP})` }}><Check size={30 * s} /></span>}
            {tapped ? done : primary}
            <Tap at={tapAt} size={60 * s} />
          </div>
        </div>
      </Card>
    </div>
  );
}

export function Check({ size = 28, color = C.ink, bg }: { size?: number; color?: string; bg?: string }) {
  return (
    <span style={{ width: size, height: size, borderRadius: 999, background: bg ?? "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" width={size * (bg ? 0.62 : 1)} height={size * (bg ? 0.62 : 1)} fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------
   StatusCycle: the assistant shows what it's doing, never a black box.
------------------------------------------------------------------- */
export function StatusCycle({ items, size = 1, dark = false }: { items: { at: number; label: string; done?: boolean; alert?: boolean }[]; size?: number; dark?: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const idx = items.findLastIndex((i) => frame >= i.at);
  if (idx < 0) return null;
  const cur = items[idx];
  const enter = spring({ frame: frame - cur.at, fps, config: UI });
  const widthOf = (l: string) => 90 * size + l.length * 15.2 * size;
  const prevW = idx > 0 ? widthOf(items[idx - 1].label) : widthOf(cur.label);
  const w = prevW + (widthOf(cur.label) - prevW) * enter;
  const appear = spring({ frame: frame - items[0].at, fps, config: UI });
  const tone = cur.alert ? C.red : cur.done ? C.gold : dark ? C.paper : C.ink;
  return (
    <div
      style={{
        height: 58 * size,
        width: w,
        borderRadius: 99,
        background: dark ? "rgba(246,245,241,0.08)" : C.white,
        border: `1.5px solid ${cur.done ? C.gold : dark ? "rgba(246,245,241,0.2)" : C.g200}`,
        display: "flex",
        alignItems: "center",
        gap: 14 * size,
        padding: `0 ${22 * size}px`,
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontFamily: MONO,
        fontSize: 21 * size,
        letterSpacing: "0.02em",
        color: dark ? C.paper : C.ink,
        boxShadow: dark ? "none" : "0 8px 20px rgba(15,15,16,0.06)",
        opacity: appear,
        transform: `scale(${0.9 + appear * 0.1})`,
        transformOrigin: "left center",
      }}
    >
      <span style={{ flexShrink: 0, display: "inline-flex" }}>
        {cur.done ? (
          <Check size={26 * size} color={C.ink} bg={C.gold} />
        ) : (
          <svg viewBox="0 0 24 24" width={24 * size} height={24 * size} style={{ transform: `rotate(${frame * 14}deg)` }}>
            <circle cx="12" cy="12" r="9" fill="none" stroke={tone} strokeOpacity={0.2} strokeWidth="3" />
            <path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke={tone} strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span style={{ display: "inline-block", transform: `translateY(${(1 - enter) * 26 * size}px)`, opacity: enter }}>{cur.label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------
   Mascot: the PDN mark as a small companion with 4 states.
------------------------------------------------------------------- */
export type MascotState = "idle" | "working" | "thinking" | "celebrating";

export function Mascot({ state, since = 0, size = 120, dark = false }: { state: MascotState; since?: number; size?: number; dark?: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - since;
  const hop = state === "celebrating" ? spring({ frame: t, fps, config: BOUNCY }) : 0;
  const y = state === "idle" ? Math.sin(frame / 14) * size * 0.03 : state === "celebrating" ? -Math.sin(Math.min(1, t / 14) * Math.PI) * size * 0.35 : 0;
  const tilt = state === "thinking" ? Math.sin(frame / 9) * 7 : state === "celebrating" ? Math.sin(t / 3) * 10 * Math.max(0, 1 - t / 30) : 0;
  const sq = state === "celebrating" ? 1 + (1 - hop) * 0.15 : state === "working" ? 1 + Math.sin(frame / 4) * 0.02 : 1;
  const fg = dark ? C.paper : C.ink;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* working: three dots orbit */}
      {state === "working" &&
        [0, 1, 2].map((i) => {
          const a = frame / 7 + (i * Math.PI * 2) / 3;
          return <span key={i} style={{ position: "absolute", left: size / 2 + Math.cos(a) * size * 0.68 - size * 0.06, top: size / 2 + Math.sin(a) * size * 0.68 - size * 0.06, width: size * 0.12, height: size * 0.12, borderRadius: 99, background: C.gold, opacity: 0.5 + 0.5 * Math.sin(a) }} />;
        })}
      {/* thinking: bubble */}
      {state === "thinking" && (
        <div style={{ position: "absolute", left: size * 0.78, top: -size * 0.42, padding: `${size * 0.06}px ${size * 0.12}px`, borderRadius: 99, background: fg, display: "flex", gap: size * 0.05 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: size * 0.07, height: size * 0.07, borderRadius: 99, background: dark ? C.ink : C.paper, opacity: 0.35 + 0.65 * Math.max(0, Math.sin(frame / 4 - i)) }} />
          ))}
        </div>
      )}
      {/* celebrating: gold burst */}
      {state === "celebrating" &&
        Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          const r = interpolate(t, [0, 18], [size * 0.55, size * 1.15], { ...clamp, easing: Easing.out(Easing.cubic) });
          const o = interpolate(t, [0, 4, 20], [0, 1, 0], clamp);
          return (
            <span
              key={i}
              style={{ position: "absolute", left: size / 2 + Math.cos(a) * r - size * 0.04, top: size / 2 + Math.sin(a) * r - size * 0.11, width: size * 0.08, height: size * 0.22, borderRadius: 99, background: C.gold, opacity: o, transform: `rotate(${(a * 180) / Math.PI + 90}deg)` }}
            />
          );
        })}
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${y}px) rotate(${tilt}deg) scale(${1 / sq}, ${sq})`, transformOrigin: "50% 100%" }}>
        <MarkGlyph size={size} color={fg} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Typewriter
------------------------------------------------------------------- */
export function Typewriter({ text, at, cps = 28, caret = true }: { text: string; at: number; cps?: number; caret?: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = Math.max(0, Math.min(text.length, Math.floor(((frame - at) / fps) * cps)));
  const typing = frame >= at && n < text.length;
  return (
    <span>
      {text.slice(0, n)}
      {caret && (typing || (frame >= at && Math.floor(frame / 12) % 2 === 0 && n < text.length + 1 && frame < at + (text.length / cps) * fps + 20)) && (
        <span style={{ display: "inline-block", width: "0.08em", height: "1em", background: "currentColor", marginLeft: 2, verticalAlign: "-0.12em" }} />
      )}
    </span>
  );
}

/* ------------------------------------------------------------------
   Icons (PDN line set, 24 grid, 1.5 stroke)
------------------------------------------------------------------- */
export const ICONS: Record<string, string> = {
  whatsapp: "M5 3h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8l-5 3V5a2 2 0 0 1 2-2Z|m8 7-1 2c1 4 3 6 7 7l2-1-2-3-2 1-2-2 1-2-3-2Z",
  calendar: "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z|M7 3v4m10-4v4M3 10h18m-13 5 3 3 5-5",
  follow: "M11 18H8l-5 3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v3|M20 14a4 4 0 1 0 1 4M20 11v3h-3",
  fast: "M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z|M14 17h3M3 7h4m-5 5h5m-3 5h3",
  shield: "m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z|m8 12 3 3 5-6",
  clock: "M20 7a9 9 0 1 0 1 6M20 3v4h-4|M12 9v3l2 1",
  email: "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z|m3.5 6 8.5 7L20.5 6",
  sms: "M13 6V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1M7 18h2|M14 7h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-3l-4 3V9a2 2 0 0 1 2-2Z",
  social: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z|M15.5 13a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0|M8 6h4",
  website: "M10 18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v4M3 7h17M6 5h.01M9 5h.01|M14 11h5a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3l-3 3v-8a2 2 0 0 1 1-2Z",
  handover: "M3 3h9a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7l-4 3V3Z|M19.5 14a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0|M12.5 21c.5-3.5 8.5-3.5 9 0M16.5 5a5 5 0 0 1 4 4m-3-1 3 1 .5-3",
  alert: "M12 3 2 20h20L12 3Z|M12 10v4M12 17h.01",
};

export function Icon({ name, size = 32, color = C.ink, stroke = 1.6 }: { name: keyof typeof ICONS | string; size?: number; color?: string; stroke?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name].split("|").map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/** Ink disc with a paper icon: the "3D matte" token, done flat and tactile. */
export function IconToken({ name, size = 96, gold = false }: { name: string; size?: number; gold?: boolean }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: gold ? C.gold : C.ink,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `inset 0 -${size * 0.05}px 0 rgba(0,0,0,0.25), inset 0 ${size * 0.03}px 0 rgba(255,255,255,0.12), 0 ${size * 0.12}px ${size * 0.25}px rgba(15,15,16,0.22)`,
        flexShrink: 0,
      }}
    >
      <Icon name={name} size={size * 0.52} color={gold ? C.ink : C.paper} stroke={1.7} />
    </div>
  );
}

/* ------------------------------------------------------------------
   AnchoredKinetic (InlineKineticText): top + bottom lines hold still,
   the centre line swaps icon + verb on the beat and resizes horizontally.
------------------------------------------------------------------- */
export function AnchoredKinetic({ top, bottom, items, every, size = 120 }: { top: string; bottom: string; items: { icon: string; text: string }[]; every: number; size?: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const idx = Math.min(items.length - 1, Math.floor(frame / every));
  const local = frame - idx * every;
  const enter = spring({ frame: local + 4, fps, config: UI }); // lands on the beat, no empty frame
  const wOf = (t: string) => size * 1.25 + t.length * size * 0.5;
  const prevW = idx > 0 ? wOf(items[idx - 1].text) : wOf(items[0].text) * 0.6;
  const w = prevW + (wOf(items[idx].text) - prevW) * enter;
  const dark = idx % 2 === 1; // hard invert on every other beat
  const fg = dark ? C.paper : C.ink;
  const lineIn = spring({ frame: frame + 6, fps, config: UI });
  return (
    <AbsoluteFill style={{ background: dark ? C.ink : C.paper, alignItems: "center", justifyContent: "center", fontFamily: FONT, color: fg }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.12, fontSize: size, fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 1 }}>
        <div style={{ opacity: lineIn, transform: `translateY(${(1 - lineIn) * 30}px)`, color: dark ? "rgba(246,245,241,0.6)" : C.g500 }}>{top}</div>
        <div style={{ width: w, height: size * 1.18, overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: size * 0.22, whiteSpace: "nowrap", transform: `translateY(${(1 - enter) * 100}%)` }}>
            <span style={{ display: "inline-flex", transform: `scale(${enter}) rotate(${(1 - enter) * -25}deg)` }}>
              <IconToken name={items[idx].icon} size={size * 0.92} gold={dark} />
            </span>
            <span>{items[idx].text}</span>
          </div>
        </div>
        <div style={{ opacity: lineIn, transform: `translateY(${(1 - lineIn) * -30}px)`, color: dark ? "rgba(246,245,241,0.6)" : C.g500 }}>{bottom}</div>
      </div>
    </AbsoluteFill>
  );
}

/* ------------------------------------------------------------------
   Big kinetic caption (mask-up lines) for the end of each act
------------------------------------------------------------------- */
export function Lines({ lines, at = 0, size = 96, color = C.ink, gap = 6, accent }: { lines: string[]; at?: number; size?: number; color?: string; gap?: number; accent?: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ fontFamily: FONT, color, fontSize: size, fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 1.02 }}>
      {lines.map((l, i) => {
        const p = spring({ frame: frame - at - i * gap, fps, config: UI });
        const parts = accent && l.includes(accent) ? l.split(accent) : null;
        return (
          <div key={i} style={{ overflow: "hidden", paddingBottom: size * 0.1, marginBottom: -size * 0.06 }}>
            <div style={{ transform: `translateY(${(1 - p) * 110}%)` }}>
              {parts ? (
                <>
                  {parts[0]}
                  <span style={{ position: "relative", display: "inline-block" }}>
                    {accent}
                    <span style={{ position: "absolute", left: 0, right: 0, bottom: size * 0.02, height: size * 0.07, background: C.gold, transformOrigin: "left", transform: `scaleX(${interpolate(frame, [at + i * gap + 10, at + i * gap + 24], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) })})` }} />
                  </span>
                  {parts[1]}
                </>
              ) : (
                l
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Label({ children, color = C.g500, size = 20 }: { children: ReactNode; color?: string; size?: number }) {
  return <div style={{ fontFamily: MONO, fontSize: size, letterSpacing: "0.1em", textTransform: "uppercase", color }}>{children}</div>;
}
