"use client";
import { useCallback, useRef, useState } from "react";
import type { PlayerRef } from "@remotion/player";
import Button from "@/components/ui/Button";
import { RevealText, FadeUp } from "@/components/motion/Reveal";
import ScenePlayer from "./ScenePlayer";
import { Showreel, SHOWREEL_DURATION } from "@/remotion/scenes/Showreel";

export default function AssistantHero() {
  const player = useRef<PlayerRef>(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const onFrame = useCallback((f: number) => setProgress(f / SHOWREEL_DURATION), []);

  const toggle = () => {
    const p = player.current;
    if (!p) return;
    if (p.isPlaying()) {
      p.pause();
      setPlaying(false);
    } else {
      p.play();
      setPlaying(true);
    }
  };

  return (
    <section className="pt-[104px] lg:pt-[136px]">
      <div className="container-pdn">
        <p className="t-label mb-6 text-grey-500 lg:mb-8">AI assistants</p>
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
          <RevealText as="h1" immediate delay={0.1} className="t-hero balance col-span-12 lg:col-span-8">
            Your business, answering customers in seconds. Day and night.
          </RevealText>
          <FadeUp className="col-span-12 lg:col-span-4" delay={0.4}>
            <p className="t-body-lg pretty text-grey-700">
              An AI assistant that replies to your customers on WhatsApp, Instagram and your website, books appointments and
              follows up, and tells you when something needs you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="/contact?for=assistant">Get your assistant</Button>
              <a href="#how-it-works" className="group inline-flex items-center gap-2 font-medium">
                See how it works
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Showreel: built in Remotion, playing live in the page */}
        <FadeUp delay={0.3} className="mt-14 lg:mt-20">
          <div className="relative overflow-hidden rounded-[var(--radius-frame)] bg-ink">
            <ScenePlayer
              playerRef={player}
              component={Showreel}
              inputProps={{ vertical: false }}
              duration={SHOWREEL_DURATION}
              width={1920}
              height={1080}
              loop
              onFrame={onFrame}
              stillFrame={690}
              ariaLabel="Showreel: a customer messages a real estate agency at night and the AI assistant answers and books a viewing; the next morning it follows up with customers who went quiet once the owner approves; an urgent message to a law firm is handed to the lawyer on call."
              className="hidden sm:block"
            />
            {/* phones get the vertical cut */}
            <ScenePlayer
              component={Showreel}
              inputProps={{ vertical: true }}
              duration={SHOWREEL_DURATION}
              width={1080}
              height={1920}
              loop
              stillFrame={690}
              ariaLabel="Showreel of the AI assistant answering and booking customers at night."
              className="sm:hidden"
            />
            {/* minimal controls (desktop) */}
            <div className="on-ink absolute inset-x-0 bottom-0 hidden p-4 sm:block lg:p-6">
              <div className="flex w-[min(100%,26rem)] items-center gap-4 rounded-full bg-ink/80 py-2 pl-2 pr-5 backdrop-blur-sm">
              <button
                type="button"
                onClick={toggle}
                data-magnetic
                aria-label={playing ? "Pause showreel" : "Play showreel"}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink transition-transform hover:scale-105"
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden><path d="M7 5h3v14H7zM14 5h3v14h-3z" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden><path d="M7 4.5v15l13-7.5z" /></svg>
                )}
              </button>
              <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-paper/20" aria-hidden>
                <div className="h-full bg-paper" style={{ width: `${progress * 100}%` }} />
              </div>
              <span className="t-label text-paper/70">Showreel · 1:18</span>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
