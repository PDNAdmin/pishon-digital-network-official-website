import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Phone } from "../components/Phone";
import { ChatThread, endOf, type Step } from "../components/ChatThread";
import { C } from "../theme";

export type PhoneSceneProps = {
  business: string;
  time: string;
  steps: Step[];
  dark?: boolean;
  phoneWidth?: number;
};

/** A phone centred on a soft stage, playing a scripted conversation. */
export function PhoneScene({ business, time, steps, dark = true, phoneWidth = 470 }: PhoneSceneProps) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const exit = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ background: dark ? C.g900 : C.paper, alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: `translateY(${(1 - enter) * 24}px)`, opacity: exit }}>
        <Phone width={phoneWidth} title={business} time={time}>
          <ChatThread steps={steps} width={phoneWidth} />
        </Phone>
      </div>
    </AbsoluteFill>
  );
}

export const phoneSceneDuration = (steps: Step[]) => endOf(steps) + 40;
