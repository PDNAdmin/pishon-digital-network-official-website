"use client";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { FlexPath } from "@/components/motion/RiverLine";
import { LogoMark } from "@/components/Logo";
import { gsap, registerGsap, prefersReducedMotion } from "@/components/motion/gsap";

const HEADLINE = ["You're", "busy", "with", "your", "clients.", "Who's", "answering", "the", "new", "ones?"];
const KEY = "answering";

const UNDERLINE = "M4 30 C80 40 180 42 270 34 C320 30 350 18 340 8 C330 -2 308 14 320 30 C334 50 372 44 396 40";

/**
 * The example card: makes it obvious to ANY visitor what they're looking at.
 * "A customer" asks → "Your AI assistant" answers in seconds → booking confirmed.
 */
function ExampleChat() {
  return (
    <figure
      data-example
      className="w-full max-w-[360px] rounded-[20px] border border-grey-200 bg-white p-4 text-ink shadow-[0_24px_60px_rgba(15,15,16,0.16)] sm:p-5"
      aria-label="Example: a customer messages a clinic at night and the AI assistant books an appointment"
    >
      <figcaption className="t-label flex items-center justify-between gap-3 border-b border-grey-200 pb-3 text-[10px] text-grey-500">
        <span>Example · an AI assistant at work</span>
        <span className="flex items-center gap-1.5 text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2e7d4f]" aria-hidden />
          Live 24/7
        </span>
      </figcaption>

      <div className="mt-4" data-bubble>
        <p className="mb-1.5 text-[12px] text-grey-500">A customer · 11:41 PM</p>
        <p className="w-fit max-w-[90%] rounded-2xl rounded-tl-md bg-grey-200 px-3.5 py-2.5 text-[14px] leading-snug">
          Hi, can I see a doctor tomorrow morning?
        </p>
      </div>

      <div className="mt-3 flex flex-col items-end" data-bubble>
        <p className="mb-1.5 flex items-center gap-1.5 text-[12px] text-grey-500">
          <LogoMark className="h-3.5 w-3.5 text-ink" title="" />
          Your AI assistant · 3 seconds later
        </p>
        <p className="max-w-[92%] rounded-2xl rounded-tr-md bg-ink px-3.5 py-2.5 text-[14px] leading-snug text-paper">
          Yes. Dr. Okafor is free at 9:30 or 11:00 tomorrow. Shall I book 9:30 for you?
        </p>
      </div>

      <p className="mt-4 flex items-center gap-2 border-t border-grey-200 pt-3 text-[13px]" data-bubble>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-[11px] font-bold text-ink" aria-hidden>
          ✓
        </span>
        Appointment booked while the clinic was closed.
      </p>
    </figure>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const titleWrap = useRef<HTMLDivElement>(null);
  const underline = useRef<SVGPathElement>(null);
  const [ul, setUl] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  // position the gold river underline under the key word (re-measured after fonts, SplitText and resize)
  useEffect(() => {
    const place = () => {
      const wrap = titleWrap.current;
      const key = wrap?.querySelector<HTMLElement>("[data-key]");
      if (!wrap || !key) return;
      const w = wrap.getBoundingClientRect();
      const k = key.getBoundingClientRect();
      setUl({ left: k.left - w.left, top: k.bottom - w.top - k.height * 0.3, width: k.width * 1.1, height: k.height * 0.36 });
    };
    place();
    const ro = new ResizeObserver(place);
    if (titleWrap.current) ro.observe(titleWrap.current);
    document.fonts?.ready.then(place);
    const t = window.setTimeout(place, 1200);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  // draw the underline once, after it first gets a size
  const drawn = useRef(false);
  useEffect(() => {
    const p = underline.current;
    if (!ul || !p || drawn.current || prefersReducedMotion()) return;
    drawn.current = true;
    registerGsap();
    gsap.fromTo(p, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, delay: 1.1, ease: "power2.inOut" });
  });

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-word]", { yPercent: 110, duration: 0.9, stagger: 0.045, delay: 0.15, ease: "power3.out" });
      gsap.from("[data-hero-fade]", { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, delay: 0.5 });
      gsap.from("[data-hero-photo]", { clipPath: "inset(12% 0% 0% 0% round 40px)", duration: 1.4, ease: "power3.inOut", delay: 0.2 });
      gsap.from("[data-hero-photo] img", { scale: 1.12, duration: 1.8, ease: "power3.out", delay: 0.2 });
      gsap.from("[data-example]", { y: 24, opacity: 0, duration: 0.8, delay: 1.2 });
      gsap.from("[data-bubble]", { y: 12, opacity: 0, duration: 0.5, stagger: 0.7, delay: 1.6 });
      gsap.to("[data-hero-photo] img", {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative pt-[104px] lg:pt-[136px]">
      <div className="container-pdn grid grid-cols-12 gap-x-6 gap-y-12">
        {/* Left: who it's for, the promise, the action */}
        <div className="col-span-12 flex flex-col justify-center lg:col-span-7 lg:pr-6">
          <p className="t-label mb-6 text-grey-500 lg:mb-8" data-hero-fade>
            Websites &amp; AI assistants for businesses
          </p>
          <div ref={titleWrap} className="relative">
            {/* word-by-word masked reveal (keeps the key word measurable for the underline) */}
            <h1 className="t-hero balance" aria-label={HEADLINE.join(" ")}>
              {HEADLINE.map((w, i) => (
                <Fragment key={i}>
                  <span aria-hidden className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top" data-key={w === KEY ? "" : undefined}>
                    <span data-word className="inline-block will-change-transform">{w}</span>
                  </span>
                  {i < HEADLINE.length - 1 && " "}
                </Fragment>
              ))}
            </h1>
            {ul && (
              <FlexPath
                d={UNDERLINE}
                baseW={400}
                baseH={60}
                stroke="var(--color-gold)"
                strokeWidth={4}
                pathRef={underline}
                className="absolute"
                style={{ left: ul.left, top: ul.top, width: ul.width, height: ul.height }}
              />
            )}
          </div>

          <p className="t-body-lg pretty mt-8 max-w-[34rem] text-grey-700 lg:mt-10" data-hero-fade>
            When someone contacts your business, the first to reply usually wins them. We build websites that make people
            trust you, and AI assistants that answer your customers, book appointments and follow up for you, day and night.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 lg:mt-10" data-hero-fade>
            <Button href="/contact">Book a free call</Button>
            <a href="#see-it-working" className="group inline-flex items-center gap-2 font-medium">
              See an example
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">↓</span>
            </a>
          </div>
          <p className="mt-4 text-sm text-grey-500" data-hero-fade>
            Free 20-minute call. No tech talk. We&apos;ll tell you honestly what you need.
          </p>
        </div>

        {/* Right: a real business + a clearly labelled example of the assistant */}
        <div className="col-span-12 lg:col-span-5">
          <div className="relative">
            <div
              data-hero-photo
              className="relative aspect-[4/3.6] overflow-hidden rounded-[var(--radius-frame)] bg-grey-200 lg:aspect-[4/5]"
              style={{ clipPath: "inset(0% 0% 0% 0% round 40px)" }}
            >
              <Image
                src="/images/photos/hero-clinic.jpg"
                alt="A clinic receptionist helping a patient at the front desk"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
            {/* desktop: card overlaps the photo's left edge; mobile: card sits below, overlapping upward */}
            <div className="relative -mt-24 px-4 sm:px-8 lg:absolute lg:bottom-8 lg:-left-10 lg:mt-0 lg:px-0 xl:-left-20">
              <ExampleChat />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
