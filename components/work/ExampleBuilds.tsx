"use client";
import Link from "next/link";
import { FadeUp } from "@/components/motion/Reveal";
import SiteMock, { BrowserFrame } from "@/components/websites/SiteMock";
import ScenePlayer from "@/components/assistant/ScenePlayer";
import { PhoneScene, phoneSceneDuration } from "@/remotion/scenes/PhoneScene";
import { BOOKS } from "@/remotion/scripts";

/* Live example builds: honestly labelled as examples, not client work. */
export default function ExampleBuilds() {
  return (
    <FadeUp stagger={0.1} className="grid gap-5 lg:grid-cols-2">
      <Link href="/websites#how-it-works" data-cursor="Try it" data-tilt className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-grey-200/60">
        <div className="p-5 sm:p-8">
          <BrowserFrame>
            <SiteMock device="desktop" autoTour />
          </BrowserFrame>
        </div>
        <div className="mt-auto flex items-end justify-between gap-6 border-t border-grey-200 p-6 sm:p-8">
          <div>
            <p className="t-label text-grey-500">Example website · not a client</p>
            <p className="t-h3 mt-3">A dental clinic in Lekki</p>
            <p className="mt-2 max-w-[42ch] text-grey-700 pretty">Prices up front, one tap to book, and an owner who can change it all from their phone.</p>
          </div>
          <Arrow />
        </div>
      </Link>

      <Link href="/ai-assistants#how-it-works" data-cursor="Watch" data-tilt className="on-ink group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-grey-900 text-paper">
        <div className="mx-auto w-full max-w-[520px] p-5 sm:p-8">
          <ScenePlayer component={PhoneScene} inputProps={{ ...BOOKS }} duration={phoneSceneDuration(BOOKS.steps)} width={1080} height={1080} loop ariaLabel="Example AI assistant: a customer asks about a 3-bedroom in Lekki at night and books a viewing." />
        </div>
        <div className="mt-auto flex items-end justify-between gap-6 border-t border-grey-700 p-6 sm:p-8">
          <div>
            <p className="t-label text-paper/60">Example AI assistant · not a client</p>
            <p className="t-h3 mt-3">A real estate agency at 11:43 PM</p>
            <p className="mt-2 max-w-[42ch] text-paper/70 pretty">Answers the question, sends a photo, and books the viewing while the office is closed.</p>
          </div>
          <Arrow dark />
        </div>
      </Link>
    </FadeUp>
  );
}

function Arrow({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${dark ? "bg-paper text-ink" : "bg-ink text-paper"}`} aria-hidden>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
    </span>
  );
}
