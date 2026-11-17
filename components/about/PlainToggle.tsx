"use client";
import { useEffect, useRef, useState } from "react";

/* Agency talk vs how we say it. Flips on its own once when it comes into view, then it's yours to play with. */
const ROWS = [
  { jargon: "We deliver bespoke digital solutions tailored to your unique needs.", plain: "We build you a website and an assistant. Here's the price." },
  { jargon: "Leverage AI-powered conversational automation to drive engagement.", plain: "Your customers get an answer in seconds, even at 2am." },
  { jargon: "Timelines are subject to scope and the discovery process.", plain: "Most websites take 2–4 weeks. You'll know the date before we start." },
  { jargon: "Our account team will circle back to you in due course.", plain: "You talk directly to the people building it." },
  { jargon: "Optimise your digital presence for maximum ROI.", plain: "More people find you, and more of them call." },
];

export default function PlainToggle() {
  const [plain, setPlain] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const flipped = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlain(true);
      return;
    }
    const el = box.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !flipped.current) {
          flipped.current = true;
          t = setTimeout(() => setPlain(true), 1400);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <div ref={box}>
      <div className="flex flex-wrap items-center gap-4">
        <span className={`t-label transition-colors ${plain ? "text-grey-500" : "text-ink"}`}>Agency talk</span>
        <button
          type="button"
          role="switch"
          aria-checked={plain}
          aria-label="Show how we say it"
          onClick={() => setPlain((p) => !p)}
          className={`relative h-9 w-16 rounded-full transition-colors duration-300 ${plain ? "bg-ink" : "bg-grey-200"}`}
        >
          <span className={`absolute top-1 h-7 w-7 rounded-full shadow transition-all duration-300 ease-[var(--ease-out-expo)] ${plain ? "left-8 bg-gold" : "left-1 bg-white"}`} />
        </button>
        <span className={`t-label transition-colors ${plain ? "text-ink" : "text-grey-500"}`}>How we say it</span>
      </div>

      <ol className="mt-10">
        {ROWS.map((r, i) => (
          <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-grey-200 py-7 lg:grid-cols-[4rem_1fr]">
            <span className="t-label pt-2 text-grey-500">{String(i + 1).padStart(2, "0")}</span>
            <span className="relative grid [&>*]:col-start-1 [&>*]:row-start-1">
              <span
                aria-hidden={plain}
                className={`t-h2 balance text-grey-500 line-through decoration-grey-500/40 decoration-2 transition-all duration-500 ${plain ? "translate-y-2 opacity-0 blur-sm" : "opacity-100"}`}
                style={{ transitionDelay: plain ? `${i * 60}ms` : "0ms" }}
              >
                {r.jargon}
              </span>
              <span
                aria-hidden={!plain}
                className={`t-h2 balance transition-all duration-500 ${plain ? "opacity-100" : "-translate-y-2 opacity-0 blur-sm"}`}
                style={{ transitionDelay: plain ? `${i * 60 + 120}ms` : "0ms" }}
              >
                {r.plain}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
