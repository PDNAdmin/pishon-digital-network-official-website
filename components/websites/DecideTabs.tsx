"use client";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import SiteMock, { BrowserFrame, PhoneFrame, type SiteKey } from "./SiteMock";

/* Pick what customers look for, and the live site scrolls to it and highlights it. */
const TABS: { key: string; title: string; body: string; device: "desktop" | "phone"; focus: SiteKey; hl: SiteKey | null }[] = [
  {
    key: "phone",
    title: "Looks right on every phone",
    body: "Most of your visitors are on a phone. Every page is designed for a thumb first, then for a big screen.",
    device: "phone",
    focus: "hero",
    hl: null,
  },
  {
    key: "prices",
    title: "Prices and services, up front",
    body: "People want to know what you do and roughly what it costs before they contact you. We make that clear, so the calls you get are from people ready to buy.",
    device: "desktop",
    focus: "services",
    hl: "services",
  },
  {
    key: "book",
    title: "One tap to book, call or WhatsApp",
    body: "The button they need is always on screen. No hunting for a phone number, no forms that go nowhere.",
    device: "phone",
    focus: "hero",
    hl: "book",
  },
  {
    key: "find",
    title: "Hours, address and a map",
    body: "So nobody has to message you to ask “are you open?” or “where are you?”.",
    device: "desktop",
    focus: "hours",
    hl: "hours",
  },
  {
    key: "trust",
    title: "Reviews that build trust",
    body: "What your customers say about you, front and centre. It does more selling than anything you could write yourself.",
    device: "desktop",
    focus: "reviews",
    hl: "reviews",
  },
];
const DURATION = 6500;

export default function DecideTabs() {
  const [i, setI] = useState(0);
  const [p, setP] = useState(0);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const tab = TABS[i];

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // auto-advance while on screen
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const x = (now - t0) / DURATION;
      if (x >= 1) {
        setP(0);
        setI((v) => (v + 1) % TABS.length);
        return;
      }
      setP(x);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [i, inView]);

  return (
    <section id="how-it-works" className="on-ink section-pad scroll-mt-16 bg-ink text-paper">
      <div className="container-pdn">
        <SectionHeader
          dark
          index="02"
          label="What's inside"
          title="Built around how your customers decide."
          aside="We don't start with colours and fonts. We start with what your customers need to see before they pick up the phone. Tap through and watch the site respond."
        />
        <div ref={box} className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 lg:mt-24">
          <div role="tablist" aria-label="What a PDN website does" className="col-span-12 flex flex-col lg:col-span-5">
            {TABS.map((t, idx) => {
              const active = idx === i;
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={active}
                  aria-controls="site-demo"
                  onClick={() => {
                    setP(0);
                    setI(idx);
                  }}
                  className={`relative border-t border-grey-700 py-6 text-left transition-colors last:border-b ${active ? "text-paper" : "text-paper/45 hover:text-paper/80"}`}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="t-label w-6 shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="t-h3">{t.title}</span>
                  </div>
                  <div className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]" style={{ gridTemplateRows: active ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="max-w-[44ch] pl-11 pt-3 text-paper/70 pretty">{t.body}</p>
                    </div>
                  </div>
                  {active && <span aria-hidden className="absolute left-0 top-[-1px] h-px bg-paper" style={{ width: `${p * 100}%` }} />}
                </button>
              );
            })}
          </div>

          <div id="site-demo" role="tabpanel" aria-label={`Example website: ${tab.title}`} className="col-span-12 lg:col-span-7">
            <div className="relative grid overflow-hidden rounded-[var(--radius-frame)] bg-grey-900 p-5 sm:p-8 [&>*]:col-start-1 [&>*]:row-start-1">
              {/* desktop browser (tablet and up only; too small to read on a phone) */}
              <div className={`hidden self-center transition-all duration-700 ease-[var(--ease-out-expo)] sm:block ${tab.device === "desktop" ? "opacity-100" : "pointer-events-none scale-95 opacity-0"}`}>
                <BrowserFrame dark>
                  <SiteMock device="desktop" focus={tab.device === "desktop" ? tab.focus : "hero"} highlight={tab.device === "desktop" ? tab.hl : null} />
                </BrowserFrame>
              </div>
              {/* phone: used for every tab on small screens */}
              <div className={`flex justify-center transition-all duration-700 ease-[var(--ease-out-expo)] ${tab.device === "phone" ? "opacity-100" : "opacity-100 sm:pointer-events-none sm:scale-95 sm:opacity-0"}`}>
                <div className="w-[70%] max-w-[300px] sm:w-[40%]">
                  <PhoneFrame>
                    <SiteMock device="phone" focus={tab.focus} highlight={tab.hl} />
                  </PhoneFrame>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-paper/50">Example website. Yours is built around your services, prices and customers.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
