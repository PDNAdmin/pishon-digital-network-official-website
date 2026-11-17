"use client";
import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  component: ComponentType<any>;
  inputProps?: Record<string, unknown>;
  duration: number;
  width: number;
  height: number;
  fps?: number;
  loop?: boolean;
  /** play only while on screen (default true) */
  autoPlayInView?: boolean;
  onEnded?: () => void;
  onFrame?: (frame: number) => void;
  className?: string;
  style?: CSSProperties;
  /** frame to show as a still when the visitor prefers reduced motion */
  stillFrame?: number;
  playerRef?: React.RefObject<PlayerRef | null>;
  ariaLabel: string;
};

/**
 * Wraps the Remotion <Player>: plays live in the page (crisp at any size, no video files),
 * pauses when scrolled away, and shows a still frame for reduced-motion visitors.
 */
export default function ScenePlayer({
  component,
  inputProps,
  duration,
  width,
  height,
  fps = 30,
  loop = false,
  autoPlayInView = true,
  onEnded,
  onFrame,
  className = "",
  style,
  stillFrame,
  playerRef: externalRef,
  ariaLabel,
}: Props) {
  const innerRef = useRef<PlayerRef>(null);
  const ref = externalRef ?? innerRef;
  const box = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // events
  useEffect(() => {
    const p = ref.current;
    if (!p) return;
    const ended = () => onEnded?.();
    const frame = (e: { detail: { frame: number } }) => onFrame?.(e.detail.frame);
    p.addEventListener("ended", ended);
    p.addEventListener("frameupdate", frame);
    return () => {
      p.removeEventListener("ended", ended);
      p.removeEventListener("frameupdate", frame);
    };
  }, [ref, onEnded, onFrame]);

  // play only in view
  useEffect(() => {
    const el = box.current;
    const p = ref.current;
    if (!el || !p) return;
    if (reduce) {
      p.pause();
      p.seekTo(stillFrame ?? Math.floor(duration * 0.75));
      return;
    }
    if (!autoPlayInView) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) p.play();
        else p.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, reduce, autoPlayInView, duration, stillFrame]);

  return (
    <div ref={box} className={className} style={style} role="img" aria-label={ariaLabel}>
      <Player
        ref={ref}
        component={component}
        inputProps={inputProps ?? {}}
        durationInFrames={duration}
        compositionWidth={width}
        compositionHeight={height}
        fps={fps}
        loop={loop}
        // silent scenes: start muted with no audio tags so browsers allow autoplay without a click
        autoPlay={autoPlayInView && !reduce}
        initiallyMuted
        numberOfSharedAudioTags={0}
        // PDN has 2 people: covered by Remotion's free licence (companies of up to 3)
        acknowledgeRemotionLicense
        controls={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        style={{ width: "100%", height: "auto", aspectRatio: `${width} / ${height}` }}
      />
    </div>
  );
}
