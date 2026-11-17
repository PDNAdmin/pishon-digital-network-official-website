"use client";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import BeforeAfter from "@/components/home/BeforeAfter";

/* A stopwatch runs for 5 seconds when the section comes into view. The three questions
   every visitor asks appear in that time, with how the old and new site answer them. */
const QUESTIONS = [
  { at: 1.0, q: "Is this place real, and open?", before: false, after: true },
  { at: 2.4, q: "Do they do what I need? What does it cost?", before: false, after: true },
  { at: 3.8, q: "How do I book or reach them, right now?", before: false, after: true },
];

function Mark({ ok, show }: { ok: boolean; show: boolean }) {
  return (
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-500 ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"} ${ok ? "bg-gold text-ink" : "border border-grey-500 text-grey-500"}`}
      aria-label={ok ? "Yes" : "No"}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        {ok ? <path d="m5 12.5 4.5 4.5L19 7.5" /> : <path d="M7 7l10 10M17 7 7 17" />}
      </svg>
    </span>
  );
}

export default function FiveSeconds() {
  const [t, setT] = useState(0);
  const [run, setRun] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(5);
      return;
    }
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          setRun((r) => r + 1);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const s = Math.min(5, (now - t0) / 1000);
      setT(s);
      if (s < 5) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]);

  const done = t >= 5;

  return (
    <section className="section-pad">
      <div className="container-pdn">
        <SectionHeader
          index="01"
          label="The 5-second test"
          title="Customers decide in seconds. Most websites lose them."
          aside="Before anyone calls you, they check your website. If it's slow, old or confusing, a great business looks closed. They go to the next one."
        />
        <div ref={box} className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-24">
          <div className="col-span-12 lg:col-span-5">
            {/* stopwatch */}
            <div className="flex items-end gap-4">
              <span className="t-display tabular-nums leading-none">{t.toFixed(1)}</span>
              <span className="t-label mb-3 text-grey-500">seconds</span>
            </div>
            <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-grey-200" aria-hidden>
              <div className="h-full bg-ink" style={{ width: `${(t / 5) * 100}%` }} />
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-[1fr_4.5rem_4.5rem] items-center gap-x-2 border-b border-ink pb-3">
                <span className="t-label text-grey-500">What they want to know</span>
                <span className="t-label text-center text-grey-500">Old site</span>
                <span className="t-label text-center text-ink">New site</span>
              </div>
              <ol>
                {QUESTIONS.map((x) => {
                  const show = t >= x.at;
                  return (
                    <li key={x.q} className="grid grid-cols-[1fr_4.5rem_4.5rem] items-center gap-x-2 border-b border-grey-200 py-5">
                      <span className={`t-body-lg pretty transition-opacity duration-500 ${show ? "opacity-100" : "opacity-25"}`}>{x.q}</span>
                      <span className="flex justify-center"><Mark ok={x.before} show={show} /></span>
                      <span className="flex justify-center"><Mark ok={x.after} show={show} /></span>
                    </li>
                  );
                })}
              </ol>
              <div className={`mt-6 flex flex-wrap items-center justify-between gap-4 transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}>
                <p className="text-grey-700">
                  <b className="font-medium text-ink">Old site: 0 of 3.</b> New site: 3 of 3, in under five seconds.
                </p>
                <button type="button" onClick={() => setRun((r) => r + 1)} className="t-label rounded-full border border-grey-200 px-4 py-2 transition-colors hover:border-ink">
                  Run it again
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <BeforeAfter />
            <p className="mt-4 text-sm text-grey-500">Drag to compare. An example restaurant website, before and after a rebuild.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
