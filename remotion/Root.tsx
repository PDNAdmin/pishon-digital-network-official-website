import { Composition, continueRender, delayRender, staticFile } from "remotion";

// Studio / CLI renders: load Satoshi (the website loads it through next/font instead).
if (typeof window !== "undefined" && typeof FontFace !== "undefined") {
  // the scenes reference the site's next/font variables; define them here too
  document.documentElement.style.setProperty("--font-satoshi", "'Satoshi'");
  document.documentElement.style.setProperty("--font-jetbrains", "'JetBrains Mono'");
  const handle = delayRender("Loading Satoshi");
  Promise.all([
    new FontFace("Satoshi", `url(${staticFile("fonts/Satoshi-Variable.woff2")}) format("woff2")`, { weight: "300 900" }).load(),
    new FontFace("JetBrains Mono", `url(${staticFile("fonts/JetBrainsMono-Latin.woff2")}) format("woff2")`, { weight: "400 500" }).load(),
  ])
    .then((fonts) => {
      fonts.forEach((f) => document.fonts.add(f));
      continueRender(handle);
    })
    .catch(() => continueRender(handle));
}
import { FPS } from "./theme";
import { PhoneScene, phoneSceneDuration } from "./scenes/PhoneScene";
import { SummaryScene, SUMMARY_DURATION } from "./scenes/SummaryScene";
import { InboxScene, INBOX_DURATION } from "./scenes/InboxScene";
import { Showreel, SHOWREEL_DURATION } from "./scenes/Showreel";
import { ANSWERS, BOOKS, FOLLOWS, HANDOVER } from "./scripts";

/** Remotion Studio / CLI entry. `npm run remotion:studio` to preview, `npm run showreel:render` to export MP4s. */
export function RemotionRoot() {
  return (
    <>
      <Composition id="Showreel" component={Showreel} durationInFrames={SHOWREEL_DURATION} fps={FPS} width={1920} height={1080} defaultProps={{ vertical: false, music: true }} />
      <Composition id="ShowreelVertical" component={Showreel} durationInFrames={SHOWREEL_DURATION} fps={FPS} width={1080} height={1920} defaultProps={{ vertical: true, music: true }} />
      <Composition id="Answers" component={PhoneScene} durationInFrames={phoneSceneDuration(ANSWERS.steps)} fps={FPS} width={1080} height={1080} defaultProps={{ ...ANSWERS }} />
      <Composition id="Books" component={PhoneScene} durationInFrames={phoneSceneDuration(BOOKS.steps)} fps={FPS} width={1080} height={1080} defaultProps={{ ...BOOKS }} />
      <Composition id="Follows" component={PhoneScene} durationInFrames={phoneSceneDuration(FOLLOWS.steps)} fps={FPS} width={1080} height={1080} defaultProps={{ ...FOLLOWS }} />
      <Composition id="Handover" component={PhoneScene} durationInFrames={phoneSceneDuration(HANDOVER.steps)} fps={FPS} width={1080} height={1080} defaultProps={{ ...HANDOVER }} />
      <Composition id="Summary" component={SummaryScene} durationInFrames={SUMMARY_DURATION} fps={FPS} width={1080} height={1080} defaultProps={{ dark: true }} />
      <Composition id="Inbox" component={InboxScene} durationInFrames={INBOX_DURATION} fps={FPS} width={1600} height={1000} />
    </>
  );
}
