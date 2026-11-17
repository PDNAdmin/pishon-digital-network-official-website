/**
 * Beat grid for the showreel. 120 BPM at 30 fps = one beat every 15 frames, one bar (4 beats) every 60.
 * Every cut, camera punch and text swap lands on this grid, so any 120 BPM track lines up.
 */
export const BPM = 120;
export const BEAT = 15; // frames
export const BAR = BEAT * 4;
export const b = (n: number) => Math.round(n * BEAT);

/** The 7 acts (start frame, length). 78 seconds total. */
export const ACTS = {
  hook: { from: 0, dur: b(16) }, //            0:00 – 0:08
  trust: { from: b(16), dur: b(36) }, //       0:08 – 0:26  real estate: answers + books, customer confirms
  montage1: { from: b(52), dur: b(8) }, //     0:26 – 0:30
  proactive: { from: b(60), dur: b(32) }, //   0:30 – 0:46  morning: follows up on people who went quiet
  montage2: { from: b(92), dur: b(8) }, //     0:46 – 0:50
  solve: { from: b(100), dur: b(32) }, //      0:50 – 1:06  law firm: urgent case handed to a lawyer
  close: { from: b(132), dur: b(24) }, //      1:06 – 1:18
};
export const REEL_DURATION = b(156); // 2340 frames

// Sound-effect cues (exact frames) live in reel/sfx.tsx.
