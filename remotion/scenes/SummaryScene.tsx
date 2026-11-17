import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Phone } from "../components/Phone";
import { C, MONO } from "../theme";

/** The owner's morning summary: what the assistant handled overnight. */
const STATS = [
  { n: 14, label: "Conversations" },
  { n: 5, label: "Viewings booked" },
  { n: 3, label: "Follow-ups sent" },
  { n: 2, label: "Need you" },
];
const ROWS = [
  { who: "Tolu A.", what: "Viewing booked · Sat 11:00 AM", tag: "Booked" },
  { who: "Mr. Okonkwo", what: "Wants to negotiate the rent", tag: "Call him" },
  { who: "Funmi B.", what: "Asked about 2-beds in Yaba · photos sent", tag: "Answered" },
  { who: "Ibrahim S.", what: "Asked for an agent to call him today", tag: "Call him" },
];

export function SummaryScene({ dark = true, phoneWidth = 470, bare = false }: { dark?: boolean; phoneWidth?: number; bare?: boolean }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const w = phoneWidth;
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const exit = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ background: bare ? "transparent" : dark ? C.g900 : C.paper, alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: `translateY(${(1 - enter) * 24}px)`, opacity: exit }}>
        <Phone width={w} title="Your morning summary" subtitle="From your AI assistant · 7:00 AM" time="7:02 AM" footer={false}>
          <div style={{ padding: `${w * 0.05}px ${w * 0.045}px`, display: "flex", flexDirection: "column", gap: w * 0.035 }}>
            <div style={{ opacity: interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }) }}>
              <div style={{ fontFamily: MONO, fontSize: w * 0.024, letterSpacing: "0.06em", color: C.g500 }}>WHILE YOU WERE AWAY</div>
              <div style={{ fontSize: w * 0.062, fontWeight: 500, lineHeight: 1.1, marginTop: w * 0.015, letterSpacing: "-0.02em" }}>Good morning, Chidi.</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: w * 0.022 }}>
              {STATS.map((s, i) => {
                const st = 25 + i * 8;
                const p = spring({ frame: frame - st, fps, config: { damping: 200 } });
                const val = Math.round(interpolate(frame, [st, st + 30], [0, s.n], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
                const attention = s.label === "Need you";
                return (
                  <div key={s.label} style={{ opacity: p, transform: `translateY(${(1 - p) * 10}px)`, background: attention ? C.ink : C.white, color: attention ? C.paper : C.ink, border: `1px solid ${attention ? C.ink : C.g200}`, borderRadius: w * 0.04, padding: `${w * 0.03}px ${w * 0.035}px` }}>
                    <div style={{ fontSize: w * 0.075, fontWeight: 500, lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: w * 0.028, marginTop: w * 0.01, opacity: 0.7 }}>{s.label}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: w * 0.016 }}>
              {ROWS.map((r, i) => {
                const p = spring({ frame: frame - (70 + i * 12), fps, config: { damping: 200 } });
                const call = r.tag === "Call him";
                return (
                  <div key={r.who} style={{ opacity: p, transform: `translateY(${(1 - p) * 10}px)`, display: "flex", alignItems: "center", gap: w * 0.025, background: C.white, border: `1px solid ${C.g200}`, borderRadius: w * 0.035, padding: `${w * 0.024}px ${w * 0.03}px` }}>
                    <div style={{ flex: 1, lineHeight: 1.25 }}>
                      <div style={{ fontSize: w * 0.031, fontWeight: 600 }}>{r.who}</div>
                      <div style={{ fontSize: w * 0.026, color: C.g500 }}>{r.what}</div>
                    </div>
                    <div style={{ fontSize: w * 0.024, fontWeight: 600, padding: `${w * 0.012}px ${w * 0.024}px`, borderRadius: 99, background: call ? C.gold : C.g200, color: C.ink }}>{r.tag}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Phone>
      </div>
    </AbsoluteFill>
  );
}

export const SUMMARY_DURATION = 200;
