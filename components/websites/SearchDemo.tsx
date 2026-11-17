"use client";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/motion/Reveal";

/* A search types itself when the section comes into view, then local results drop in. */
const QUERY = "dentist in lekki open saturday";
const RESULTS = [
  { you: true, name: "Bright Smile Dental", rating: "4.9", reviews: 212, line: "Open Saturday 9am – 3pm · Lekki Phase 1", actions: ["Website", "Call", "Directions"] },
  { you: false, name: "Another dental clinic", rating: "4.1", reviews: 19, line: "Hours not listed · No website", actions: ["Call", "Directions"] },
  { you: false, name: "A third clinic", rating: "3.8", reviews: 7, line: "Closes 1pm · Website doesn't open on phones", actions: ["Directions"] },
];
const SETUP = [
  ["Your Google Business Profile", "Complete and correct: hours, photos, services, the right map pin."],
  ["A page for each service and area", "So you show up for “whitening in Lekki”, not just your name."],
  ["Fast on every phone", "Search engines favour sites that load quickly. So do customers."],
  ["Reviews in the right places", "We make it easy for happy customers to leave one."],
];

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex gap-px" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${i < full ? "text-gold" : "text-grey-200"}`} fill="currentColor"><path d="m12 2 3 6.6 7 .7-5.3 4.8 1.6 7L12 17.5 5.7 21.1l1.6-7L2 9.3l7-.7L12 2Z" /></svg>
      ))}
    </span>
  );
}

export default function SearchDemo() {
  const [n, setN] = useState(0); // characters typed
  const [shown, setShown] = useState(0); // results shown
  const [run, setRun] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(QUERY.length);
      setShown(RESULTS.length + 1);
      return;
    }
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          setRun(1);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!run) return;
    setN(0);
    setShown(0);
    const ids: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= QUERY.length; i++) ids.push(setTimeout(() => setN(i), i * 55));
    const end = QUERY.length * 55 + 350;
    for (let r = 1; r <= RESULTS.length + 1; r++) ids.push(setTimeout(() => setShown(r), end + r * 260));
    return () => ids.forEach(clearTimeout);
  }, [run]);

  return (
    <section className="section-pad pt-0 lg:pt-0">
      <div className="container-pdn">
        <SectionHeader
          index="04"
          label="Getting found"
          title="Show up when people search for what you do."
          aside="Nobody can honestly promise you first place on Google. What we do is set your business up properly, so you're in the running every time someone nearby searches."
        />
        <div ref={box} className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-24">
          {/* search mock */}
          <div className="col-span-12 lg:col-span-7">
            <div className="rounded-[var(--radius-frame)] bg-grey-200/60 p-4 sm:p-8">
              <div className="rounded-[20px] bg-white p-4 shadow-[0_20px_50px_rgba(15,15,16,0.08)] sm:p-6">
                <div className="flex items-center gap-3 rounded-full border border-grey-200 px-5 py-3.5">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-grey-500" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                  <span className="truncate text-[17px]" aria-label={`Search: ${QUERY}`}>
                    {QUERY.slice(0, n)}
                    <span className="ml-px inline-block h-[1.1em] w-px translate-y-[3px] bg-ink [animation:caret_1s_steps(1)_infinite]" />
                  </span>
                </div>

                {/* map */}
                <div className={`relative mt-5 h-36 overflow-hidden rounded-2xl bg-[#E9E7E1] transition-all duration-500 sm:h-44 ${shown >= 1 ? "opacity-100" : "translate-y-2 opacity-0"}`} aria-hidden>
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice">
                    <path d="M-10 110 C80 90 140 130 230 100 S360 70 420 90" stroke="#fff" strokeWidth="10" fill="none" />
                    <path d="M110 -10 C120 50 100 100 130 170" stroke="#fff" strokeWidth="7" fill="none" />
                    <path d="M270 -10 C260 60 300 100 285 170" stroke="#fff" strokeWidth="6" fill="none" />
                  </svg>
                  {[
                    [38, 46, true],
                    [64, 30, false],
                    [22, 70, false],
                  ].map(([x, y, you], i) => (
                    <span key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${x}%`, top: `${y}%` }}>
                      <svg viewBox="0 0 24 32" className={you ? "h-9 w-7" : "h-6 w-5"}>
                        <path d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 32 12 32s12-11.2 12-20.1C24 5.3 18.6 0 12 0Z" fill={you ? "#0F0F10" : "#9a988f"} />
                        <circle cx="12" cy="12" r="4.5" fill={you ? "#D4AF37" : "#fff"} />
                      </svg>
                    </span>
                  ))}
                </div>

                {/* results */}
                <ol className="mt-3">
                  {RESULTS.map((r, i) => (
                    <li
                      key={r.name}
                      className={`relative mt-2 rounded-2xl p-4 transition-all duration-500 ${shown >= i + 2 ? "opacity-100" : "translate-y-3 opacity-0"} ${r.you ? "bg-paper ring-2 ring-gold" : ""}`}
                    >
                      {r.you && <span className="t-label absolute -top-2.5 right-4 rounded-full bg-ink px-2.5 py-1 text-paper">That could be you</span>}
                      <p className={`text-[17px] font-medium ${r.you ? "" : "text-grey-700"}`}>{r.name}</p>
                      <p className="mt-1 flex items-center gap-2 text-sm text-grey-700">
                        {r.rating} <Stars rating={Number(r.rating)} /> <span className="text-grey-500">({r.reviews})</span>
                      </p>
                      <p className={`mt-1 text-sm ${r.you ? "text-grey-700" : "text-grey-500"}`}>{r.line}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {r.actions.map((a) => (
                          <span key={a} className={`rounded-full px-3.5 py-1.5 text-sm ${r.you && a === "Website" ? "bg-ink text-paper" : "border border-grey-200"}`}>{a}</span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-sm text-grey-500">Example search. Results depend on your area, reviews and competition.</p>
              <button type="button" onClick={() => setRun((r) => r + 1)} className="t-label shrink-0 rounded-full border border-grey-200 px-4 py-2 transition-colors hover:border-ink">
                Search again
              </button>
            </div>
          </div>

          {/* what we set up */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="t-label text-grey-500">What we set up for you</p>
            <FadeUp as="ul" stagger={0.08} className="mt-6">
              {SETUP.map(([t, b]) => (
                <li key={t} className="border-t border-grey-200 py-6">
                  <p className="t-h3">{t}</p>
                  <p className="mt-2 text-grey-700 pretty">{b}</p>
                </li>
              ))}
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
