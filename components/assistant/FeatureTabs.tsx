"use client";
import { useCallback, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScenePlayer from "./ScenePlayer";
import { PhoneScene, phoneSceneDuration } from "@/remotion/scenes/PhoneScene";
import { SummaryScene, SUMMARY_DURATION } from "@/remotion/scenes/SummaryScene";
import { ANSWERS, BOOKS, FOLLOWS, HANDOVER } from "@/remotion/scripts";

/* The Vizcom "toolkit" moment: pick what you want to see, watch it happen on a phone. */
const TABS = [
  {
    key: "answers",
    title: "Answers questions",
    body: "Prices, opening hours, “do you take HMO?” Your assistant answers in seconds, using only the information you've given it.",
    example: "A clinic, 11:41 PM",
    component: PhoneScene,
    props: { ...ANSWERS },
    duration: phoneSceneDuration(ANSWERS.steps),
  },
  {
    key: "books",
    title: "Books appointments",
    body: "It offers real times from your calendar, the customer taps one, and it's booked. No back and forth, no missed viewing.",
    example: "A real estate agency, 11:43 PM",
    component: PhoneScene,
    props: { ...BOOKS },
    duration: phoneSceneDuration(BOOKS.steps),
  },
  {
    key: "follows",
    title: "Follows up",
    body: "People get busy and forget. Your assistant checks back in the next morning, politely, so interested customers don't go cold.",
    example: "A hotel, the next morning",
    component: PhoneScene,
    props: { ...FOLLOWS },
    duration: phoneSceneDuration(FOLLOWS.steps),
  },
  {
    key: "handover",
    title: "Hands over to you",
    body: "Anything urgent, sensitive or outside its knowledge goes straight to you or your team, with the full conversation attached.",
    example: "A law firm, 11:52 PM",
    component: PhoneScene,
    props: { ...HANDOVER },
    duration: phoneSceneDuration(HANDOVER.steps),
  },
  {
    key: "summary",
    title: "Sends you a morning summary",
    body: "Every morning you see who messaged, what got booked and the few people who need you personally.",
    example: "Your phone, 7:00 AM",
    component: SummaryScene,
    props: { dark: true },
    duration: SUMMARY_DURATION,
  },
] as const;

export default function FeatureTabs() {
  const [i, setI] = useState(0);
  const [progress, setProgress] = useState(0);
  const tab = TABS[i];

  const next = useCallback(() => {
    setProgress(0);
    setI((x) => (x + 1) % TABS.length);
  }, []);
  const onFrame = useCallback((f: number) => setProgress(f / tab.duration), [tab.duration]);

  return (
    <section id="how-it-works" className="on-ink section-pad scroll-mt-16 bg-ink text-paper">
      <div className="container-pdn">
        <SectionHeader
          dark
          index="01"
          label="Watch a night at work"
          title="Everything your best receptionist does. At 2am too."
          aside="Pick something your customers ask for and watch the assistant handle it. These are the real kinds of conversations it has every night."
        />

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 lg:mt-24">
          {/* tabs */}
          <div role="tablist" aria-label="What the assistant does" className="col-span-12 flex flex-col lg:col-span-5">
            {TABS.map((t, idx) => {
              const active = idx === i;
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={active}
                  aria-controls="assistant-demo"
                  onClick={() => {
                    setProgress(0);
                    setI(idx);
                  }}
                  className={`group relative border-t border-grey-700 py-6 text-left transition-colors last:border-b ${active ? "text-paper" : "text-paper/45 hover:text-paper/80"}`}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="t-label w-6 shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="t-h3">{t.title}</span>
                  </div>
                  <div className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]" style={{ gridTemplateRows: active ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="max-w-[44ch] pl-11 pt-3 text-paper/70 pretty">{t.body}</p>
                      <p className="t-label pl-11 pt-3 text-paper/40">Example · {t.example}</p>
                    </div>
                  </div>
                  {/* progress along the top hairline (Vizcom-style) */}
                  {active && (
                    <span aria-hidden className="absolute left-0 top-[-1px] h-px bg-paper" style={{ width: `${Math.min(1, progress) * 100}%` }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* demo */}
          <div id="assistant-demo" role="tabpanel" className="col-span-12 lg:col-span-7">
            <div className="overflow-hidden rounded-[var(--radius-frame)] bg-grey-900">
              <ScenePlayer
                key={tab.key}
                component={tab.component}
                inputProps={tab.props}
                duration={tab.duration}
                width={1080}
                height={1080}
                onEnded={next}
                onFrame={onFrame}
                className="hidden sm:block"
                ariaLabel={`Example: ${tab.title.toLowerCase()}. ${tab.body}`}
              />
              <ScenePlayer
                key={tab.key + "-m"}
                component={tab.component}
                inputProps={{ ...tab.props, phoneWidth: 960 }}
                duration={tab.duration}
                width={1040}
                height={2040}
                onEnded={next}
                onFrame={onFrame}
                className="sm:hidden"
                ariaLabel={`Example: ${tab.title.toLowerCase()}. ${tab.body}`}
              />
            </div>
            <p className="mt-4 text-center text-sm text-paper/50">Example conversations. Your assistant uses your real prices, times and rules.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
