import { Audio, Sequence } from "remotion";
import { asset } from "../theme";
import { ACTS } from "./beats";

/**
 * Sound effects (ElevenLabs Sound Effects v2), placed so each sound's LOUDEST moment
 * lands on the frame where its action happens, not where the file starts.
 */
const FILES = {
  pop: { src: "/audio/sfx/pop.mp3", peak: 0 },
  tap: { src: "/audio/sfx/tap.mp3", peak: 14 }, // file has ~0.45s of silence before the tap
  chime: { src: "/audio/sfx/chime.mp3", peak: 1 },
  flip: { src: "/audio/sfx/flip.mp3", peak: 40 }, // swish builds, snap at ~1.35s
  alert: { src: "/audio/sfx/alert.mp3", peak: 4 },
  hit: { src: "/audio/sfx/hit.mp3", peak: 1 },
  whoosh: { src: "/audio/sfx/whoosh.mp3", peak: 22 },
} as const;

type Cue = { at: number; sfx: keyof typeof FILES; vol: number };
const a = ACTS;

/** Absolute frames (30 fps). Matches the choreography in acts.tsx. */
export const CUES: Cue[] = [
  // 1 · Hook
  { at: a.hook.from + 2, sfx: "pop", vol: 0.8 },
  { at: a.hook.from + 36, sfx: "whoosh", vol: 0.35 }, // objects scatter
  { at: a.hook.from + 142, sfx: "whoosh", vol: 0.55 }, // camera pushes through
  { at: a.hook.from + 150, sfx: "hit", vol: 0.45 }, // headline lands
  { at: a.hook.from + 166, sfx: "pop", vol: 0.5 }, // mascot splits the line
  // 2 · Trust loop
  { at: a.trust.from + 62, sfx: "tap", vol: 1 }, // customer taps send
  { at: a.trust.from + 110, sfx: "whoosh", vol: 0.45 }, // dive into the screen
  { at: a.trust.from + 120 + 32, sfx: "flip", vol: 0.6 }, // card flip
  { at: a.trust.from + 120 + 265, sfx: "tap", vol: 1 }, // picks Sat 11:00
  { at: a.trust.from + 120 + 330, sfx: "tap", vol: 1 }, // Confirm
  { at: a.trust.from + 120 + 332, sfx: "chime", vol: 0.7 },
  // 3 · Montage (hard hits on the swaps)
  { at: a.montage1.from, sfx: "hit", vol: 0.5 },
  { at: a.montage1.from + 45, sfx: "hit", vol: 0.5 },
  { at: a.montage1.from + 90, sfx: "hit", vol: 0.5 },
  // 4 · Proactive
  { at: a.proactive.from + 20, sfx: "pop", vol: 0.6 }, // notification arrives
  { at: a.proactive.from + 84, sfx: "whoosh", vol: 0.4 }, // dive into the screen
  { at: a.proactive.from + 90 + 75, sfx: "pop", vol: 0.5 }, // "Spotted" card
  { at: a.proactive.from + 90 + 300, sfx: "tap", vol: 1 }, // Send
  { at: a.proactive.from + 90 + 302, sfx: "chime", vol: 0.7 },
  { at: a.proactive.from + 90 + 312, sfx: "pop", vol: 0.45 }, // reward
  // 5 · Montage
  { at: a.montage2.from, sfx: "hit", vol: 0.5 },
  { at: a.montage2.from + 45, sfx: "hit", vol: 0.5 },
  { at: a.montage2.from + 90, sfx: "hit", vol: 0.5 },
  // 6 · Urgent case
  { at: a.solve.from + 6, sfx: "alert", vol: 0.7 },
  { at: a.solve.from + 180 + 75, sfx: "tap", vol: 1 }, // Take it
  { at: a.solve.from + 180 + 77, sfx: "chime", vol: 0.6 },
  { at: a.solve.from + 310 + 40, sfx: "pop", vol: 0.5 }, // resolved
  // 7 · Close
  { at: a.close.from + 6, sfx: "pop", vol: 0.4 },
  { at: a.close.from + 96, sfx: "hit", vol: 0.5 }, // channels lock in
  { at: a.close.from + 106, sfx: "pop", vol: 0.4 }, // ticks
  { at: a.close.from + 270, sfx: "hit", vol: 0.85 }, // end card
];

export function SfxTrack() {
  return (
    <>
      {CUES.map((c, i) => {
        const f = FILES[c.sfx];
        const start = c.at - f.peak;
        return (
          <Sequence key={i} from={Math.max(0, start)} durationInFrames={90} layout="none" name={`sfx · ${c.sfx}`}>
            <Audio src={asset(f.src)} volume={c.vol} trimBefore={start < 0 ? -start : undefined} />
          </Sequence>
        );
      })}
    </>
  );
}
