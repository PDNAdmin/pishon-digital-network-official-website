import { AbsoluteFill, Audio, Sequence } from "remotion";
import { C, ASSETS, asset } from "../theme";
import { ACTS, REEL_DURATION } from "../reel/beats";
import { SfxTrack } from "../reel/sfx";
import { ActClose, ActHook, ActMontage1, ActMontage2, ActProactive, ActSolve, ActTrust } from "../reel/acts";

/* ------------------------------------------------------------------
   PDN showreel: 78 seconds, 7 acts, cut to a 120 BPM grid.
   Quiet demos (real conversations, human taps to approve) alternate
   with fast kinetic bursts to reset attention every ~15 seconds.
   16:9 for the website / YouTube, 9:16 for Reels, Status and TikTok.
------------------------------------------------------------------- */
/** `music` is on for MP4 exports only; the website plays the showreel silently. */
export function Showreel({ vertical = false, music = false }: { vertical?: boolean; music?: boolean }) {
  const v = vertical;
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      {music && ASSETS.music && <Audio src={asset(ASSETS.music)} volume={0.6} />}
      {music && <SfxTrack />}
      <Sequence from={ACTS.hook.from} durationInFrames={ACTS.hook.dur} name="1 · Hook">
        <ActHook v={v} />
      </Sequence>
      <Sequence from={ACTS.trust.from} durationInFrames={ACTS.trust.dur} name="2 · Trust loop (real estate)">
        <ActTrust v={v} />
      </Sequence>
      <Sequence from={ACTS.montage1.from} durationInFrames={ACTS.montage1.dur} name="3 · Montage">
        <ActMontage1 v={v} />
      </Sequence>
      <Sequence from={ACTS.proactive.from} durationInFrames={ACTS.proactive.dur} name="4 · Proactive (follow-ups)">
        <ActProactive v={v} />
      </Sequence>
      <Sequence from={ACTS.montage2.from} durationInFrames={ACTS.montage2.dur} name="5 · Montage">
        <ActMontage2 v={v} />
      </Sequence>
      <Sequence from={ACTS.solve.from} durationInFrames={ACTS.solve.dur} name="6 · Problem solving (law firm)">
        <ActSolve v={v} />
      </Sequence>
      <Sequence from={ACTS.close.from} durationInFrames={ACTS.close.dur} name="7 · Close">
        <ActClose v={v} />
      </Sequence>
    </AbsoluteFill>
  );
}

export const SHOWREEL_DURATION = REEL_DURATION;
