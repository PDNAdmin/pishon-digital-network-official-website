import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO } from "../theme";
import { MarkGlyph } from "../components/Mark";

/**
 * Messages arrive from every channel into one place, and each is answered in seconds.
 * Channel badges are generic (official WhatsApp/Instagram logos to be added from Meta's brand resources).
 */
type Row = { ch: "WhatsApp" | "Instagram" | "Website" | "Email" | "Facebook"; who: string; msg: string; secs: number; at: number };
const ROWS: Row[] = [
  { ch: "WhatsApp", who: "Tolu A.", msg: "Is the 3-bedroom in Lekki still available?", secs: 3, at: 10 },
  { ch: "Instagram", who: "@kemi.styles", msg: "How much is a viewing?", secs: 4, at: 45 },
  { ch: "Website", who: "Visitor from Google", msg: "Do you have anything in Yaba under ₦3m?", secs: 3, at: 80 },
  { ch: "Email", who: "Ibrahim S.", msg: "Can an agent call me tomorrow morning?", secs: 6, at: 115 },
  { ch: "Facebook", who: "Grace O.", msg: "Do you manage short-let apartments?", secs: 4, at: 150 },
];

function ChannelBadge({ ch, s }: { ch: Row["ch"]; s: number }) {
  const paths: Record<Row["ch"], string> = {
    WhatsApp: "M12 18H7l-4 3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-2 M9 10.5c.5 1.5 1.5 2.5 3 3",
    Instagram: "M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M17 7h.01",
    Website: "M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M3 9h18 M6 6.5h.01 M9 6.5h.01",
    Email: "M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M3 7l9 6 9-6",
    Facebook: "M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0 M13 20v-7h2.5 M13 13v-2a2 2 0 0 1 2-2h1.5 M10.5 13H13",
  };
  return (
    <div style={{ width: s, height: s, borderRadius: s * 0.3, border: `1.5px solid ${C.g200}`, display: "flex", alignItems: "center", justifyContent: "center", background: C.white }}>
      <svg viewBox="0 0 24 24" width={s * 0.55} height={s * 0.55} fill="none" stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        {paths[ch].split(" M").map((d, i) => (
          <path key={i} d={i === 0 ? d : "M" + d} />
        ))}
      </svg>
    </div>
  );
}

export function InboxScene({ compact = false }: { compact?: boolean }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const u = compact ? width / 760 : width / 1600; // unit scale
  const exit = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const answered = ROWS.filter((r) => frame >= r.at + 28).length;
  return (
    <AbsoluteFill style={{ background: C.paper, alignItems: "center", justifyContent: "center", fontFamily: FONT, opacity: exit }}>
      <div style={{ width: compact ? 700 * u : 1240 * u, background: C.white, border: `1px solid ${C.g200}`, borderRadius: 32 * u, boxShadow: "0 30px 60px rgba(15,15,16,0.10)", overflow: "hidden" }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${26 * u}px ${36 * u}px`, borderBottom: `1px solid ${C.g200}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 * u }}>
            <div style={{ width: 44 * u, height: 44 * u, borderRadius: 99, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MarkGlyph size={24 * u} color={C.paper} />
            </div>
            <div>
              <div style={{ fontSize: 24 * u, fontWeight: 500, color: C.ink }}>All conversations</div>
              <div style={{ fontSize: 17 * u, color: C.g500 }}>Prime Homes Realty · tonight</div>
            </div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 16 * u, letterSpacing: "0.06em", color: C.ink, display: "flex", alignItems: "center", gap: 10 * u }}>
            <span style={{ width: 9 * u, height: 9 * u, borderRadius: 99, background: C.green }} />
            {answered} / {ROWS.length} ANSWERED
          </div>
        </div>
        {/* rows */}
        <div style={{ padding: `${10 * u}px ${20 * u}px ${20 * u}px` }}>
          {ROWS.map((r) => {
            const p = spring({ frame: frame - r.at, fps, config: { damping: 200 } });
            const done = frame >= r.at + 28;
            const doneP = spring({ frame: frame - (r.at + 28), fps, config: { damping: 200 } });
            return (
              <div key={r.who} style={{ opacity: p, transform: `translateY(${(1 - p) * 18 * u}px)`, display: "flex", flexWrap: compact ? "wrap" : "nowrap", alignItems: "center", gap: 20 * u, padding: `${18 * u}px ${16 * u}px`, borderBottom: `1px solid ${C.g200}` }}>
                <ChannelBadge ch={r.ch} s={52 * u} />
                {!compact && <div style={{ width: 170 * u, fontFamily: MONO, fontSize: 15 * u, letterSpacing: "0.06em", color: C.g500 }}>{r.ch.toUpperCase()}</div>}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 20 * u, fontWeight: 600, color: C.ink }}>
                    {r.who}
                    {compact && <span style={{ fontFamily: MONO, fontSize: 13 * u, letterSpacing: "0.06em", color: C.g500, marginLeft: 10 * u }}>{r.ch.toUpperCase()}</span>}
                  </div>
                  <div style={{ fontSize: 19 * u, color: C.g700, whiteSpace: compact ? "normal" : "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.msg}</div>
                </div>
                <div style={{ width: compact ? "100%" : 230 * u, paddingLeft: compact ? 72 * u : 0, display: "flex", justifyContent: compact ? "flex-start" : "flex-end" }}>
                  {done ? (
                    <div style={{ opacity: doneP, transform: `scale(${0.9 + doneP * 0.1})`, display: "flex", alignItems: "center", gap: 10 * u, padding: `${9 * u}px ${16 * u}px`, borderRadius: 99, background: C.ink, color: C.paper, fontSize: 17 * u, fontWeight: 500 }}>
                      <span style={{ width: 20 * u, height: 20 * u, borderRadius: 99, background: C.gold, color: C.ink, fontSize: 12 * u, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>
                      Answered in {r.secs}s
                    </div>
                  ) : (
                    <div style={{ fontFamily: MONO, fontSize: 15 * u, color: C.g500 }}>REPLYING…</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export const INBOX_DURATION = 270;
