import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO, asset } from "../theme";
import { MarkGlyph } from "./Mark";

/* ------------------------------------------------------------------
   A scripted chat. Every step has a start frame (`at`).
   The thread is bottom-anchored like a real chat app, so new messages
   push older ones up and out of view (natural auto-scroll).
------------------------------------------------------------------- */

export type Step =
  | { t: "them"; at: number; text: string; time?: string }
  | { t: "us"; at: number; text: string; time?: string }
  | { t: "typing"; at: number; until: number }
  | { t: "card"; at: number; title: string; detail: string }
  | { t: "image"; at: number; src: string | null; caption?: string }
  | { t: "chips"; at: number; options: string[]; pick: number; pickAt: number }
  | { t: "note"; at: number; text: string };

function useEnter(at: number) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 200, mass: 0.6 } });
  return { visible: frame >= at, style: { opacity: s, transform: `translateY(${(1 - s) * 14}px) scale(${0.97 + s * 0.03})` } };
}

function Bubble({ step, w }: { step: Extract<Step, { t: "them" | "us" }>; w: number }) {
  const { visible, style } = useEnter(step.at);
  if (!visible) return null;
  const us = step.t === "us";
  return (
    <div style={{ display: "flex", justifyContent: us ? "flex-end" : "flex-start", ...style }}>
      <div style={{ maxWidth: "82%" }}>
        <div
          style={{
            padding: `${w * 0.026}px ${w * 0.034}px`,
            borderRadius: w * 0.045,
            borderBottomRightRadius: us ? w * 0.012 : w * 0.045,
            borderBottomLeftRadius: us ? w * 0.045 : w * 0.012,
            background: us ? C.ink : C.g200,
            color: us ? C.paper : C.ink,
            fontSize: w * 0.034,
            lineHeight: 1.38,
          }}
        >
          {step.text}
        </div>
        {step.time && (
          <div style={{ fontFamily: MONO, fontSize: w * 0.022, color: C.g500, marginTop: 4, textAlign: us ? "right" : "left" }}>{step.time}</div>
        )}
      </div>
    </div>
  );
}

function Typing({ step, w }: { step: Extract<Step, { t: "typing" }>; w: number }) {
  const frame = useCurrentFrame();
  if (frame < step.at || frame >= step.until) return null;
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ display: "flex", gap: w * 0.012, padding: `${w * 0.034}px ${w * 0.04}px`, borderRadius: w * 0.045, borderBottomRightRadius: w * 0.012, background: C.ink }}>
        {[0, 1, 2].map((i) => {
          const o = interpolate(Math.sin((frame - step.at) / 4 - i * 0.9), [-1, 1], [0.25, 1]);
          return <span key={i} style={{ width: w * 0.014, height: w * 0.014, borderRadius: 99, background: C.paper, opacity: o }} />;
        })}
      </div>
    </div>
  );
}

function Card({ step, w }: { step: Extract<Step, { t: "card" }>; w: number }) {
  const { visible, style } = useEnter(step.at);
  if (!visible) return null;
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", ...style }}>
      <div style={{ width: "82%", display: "flex", alignItems: "center", gap: w * 0.03, padding: `${w * 0.03}px ${w * 0.034}px`, background: C.white, border: `1px solid ${C.g200}`, borderRadius: w * 0.045 }}>
        <svg viewBox="0 0 24 24" width={w * 0.05} height={w * 0.05} fill="none" stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4M9 15l2 2 4-4" />
        </svg>
        <div style={{ flex: 1, lineHeight: 1.25 }}>
          <div style={{ fontSize: w * 0.032, fontWeight: 600 }}>{step.title}</div>
          <div style={{ fontSize: w * 0.028, color: C.g500 }}>{step.detail}</div>
        </div>
        <div style={{ width: w * 0.06, height: w * 0.06, borderRadius: 99, background: C.gold, color: C.ink, fontWeight: 700, fontSize: w * 0.032, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
      </div>
    </div>
  );
}

function ImageMsg({ step, w }: { step: Extract<Step, { t: "image" }>; w: number }) {
  const { visible, style } = useEnter(step.at);
  if (!visible) return null;
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", ...style }}>
      <div style={{ width: "62%", borderRadius: w * 0.04, overflow: "hidden", background: C.g200 }}>
        {step.src ? (
          <Img alt="" src={asset(step.src)} style={{ width: "100%", height: w * 0.42, objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ height: w * 0.36, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: w * 0.024, color: C.g500 }}>PHOTO</div>
        )}
        {step.caption && <div style={{ padding: `${w * 0.02}px ${w * 0.03}px`, fontSize: w * 0.028, background: C.ink, color: C.paper }}>{step.caption}</div>}
      </div>
    </div>
  );
}

function Chips({ step, w }: { step: Extract<Step, { t: "chips" }>; w: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { visible, style } = useEnter(step.at);
  if (!visible || frame > step.pickAt + 10) return null;
  // finger glides in, presses, chip highlights
  const fingerIn = spring({ frame: frame - (step.pickAt - 18), fps, config: { damping: 200 } });
  const press = interpolate(frame, [step.pickAt - 2, step.pickAt, step.pickAt + 4], [1, 0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chosen = frame >= step.pickAt;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: w * 0.018, ...style }}>
      {step.options.map((o, i) => (
        <div
          key={o}
          style={{
            position: "relative",
            padding: `${w * 0.02}px ${w * 0.034}px`,
            borderRadius: 99,
            border: `1.5px solid ${C.ink}`,
            fontSize: w * 0.03,
            fontWeight: 500,
            background: chosen && i === step.pick ? C.ink : C.white,
            color: chosen && i === step.pick ? C.paper : C.ink,
          }}
        >
          {o}
          {i === step.pick && (
            <span
              style={{
                position: "absolute",
                left: "55%",
                top: "45%",
                width: w * 0.075,
                height: w * 0.075,
                borderRadius: 99,
                background: "rgba(15,15,16,0.28)",
                border: "2px solid rgba(255,255,255,0.9)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                transform: `translate(${(1 - fingerIn) * w * 0.25}px, ${(1 - fingerIn) * w * 0.3}px) scale(${press})`,
                opacity: fingerIn,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Note({ step, w }: { step: Extract<Step, { t: "note" }>; w: number }) {
  const { visible, style } = useEnter(step.at);
  if (!visible) return null;
  return (
    <div style={{ display: "flex", justifyContent: "center", ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: w * 0.015, padding: `${w * 0.016}px ${w * 0.03}px`, borderRadius: 99, background: C.white, border: `1px solid ${C.g200}`, fontFamily: MONO, fontSize: w * 0.022, letterSpacing: "0.04em", textTransform: "uppercase", color: C.g700 }}>
        <MarkGlyph size={w * 0.03} color={C.ink} />
        {step.text}
      </div>
    </div>
  );
}

export function ChatThread({ steps, width }: { steps: Step[]; width: number }) {
  const w = width;
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: w * 0.022, padding: `${w * 0.04}px ${w * 0.035}px`, fontFamily: FONT }}>
      {steps.map((s, i) => {
        switch (s.t) {
          case "them":
          case "us":
            return <Bubble key={i} step={s} w={w} />;
          case "typing":
            return <Typing key={i} step={s} w={w} />;
          case "card":
            return <Card key={i} step={s} w={w} />;
          case "image":
            return <ImageMsg key={i} step={s} w={w} />;
          case "chips":
            return <Chips key={i} step={s} w={w} />;
          case "note":
            return <Note key={i} step={s} w={w} />;
        }
      })}
    </div>
  );
}

export const endOf = (steps: Step[]) =>
  Math.max(...steps.map((s) => (s.t === "typing" ? s.until : s.t === "chips" ? s.pickAt : s.at)));
