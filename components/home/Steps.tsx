"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { gsap, registerGsap, prefersReducedMotion } from "@/components/motion/gsap";
import { FlexPath } from "@/components/motion/RiverLine";

const steps = [
  {
    n: "01",
    title: "We talk",
    meta: "20 minutes · free",
    body: "You tell us about your business and where customers are slipping through. We tell you honestly what would help, and what it costs.",
    img: "/images/illustrations/step-1-talk.png",
    alt: "Line drawing: two people talking over coffee",
  },
  {
    n: "02",
    title: "We build it",
    meta: "Usually 2–4 weeks",
    body: "We do the work. You check it and tell us what to change. We'll ask you for a few photos and answers. That's about it.",
    img: "/images/illustrations/step-2-build.png",
    alt: "Line drawing: hands placing the last piece into a website",
  },
  {
    n: "03",
    title: "You get more customers",
    meta: "And we stay around",
    body: "We launch it, show you how it works in plain English, and stay around afterwards. If something needs changing, you message us. We reply.",
    img: "/images/illustrations/step-3-customers.png",
    alt: "Line drawing: customers walking in through an open shop door",
  },
];

export default function Steps() {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current!;
    const nums = el.querySelectorAll<HTMLElement>("[data-num]");
    if (prefersReducedMotion()) {
      nums.forEach((n) => (n.style.color = "var(--color-ink)"));
      return;
    }
    // the sized path mounts after its first measurement; wait for it (desktop only)
    let raf = 0;
    let tries = 0;
    const lineCtx = gsap.context(() => {}, el);
    const attach = () => {
      const p = line.current;
      if (!p) {
        if (tries++ < 120) raf = requestAnimationFrame(attach);
        return;
      }
      lineCtx.add(() => {
        gsap.fromTo(
          p,
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 60%", scrub: 0.6 } },
        );
      });
    };
    attach();

    const ctx = gsap.context(() => {
      // numbers fill with ink as the line reaches each step
      nums.forEach((n, i) => {
        gsap.to(n, {
          color: "var(--color-ink)",
          duration: 0.5,
          scrollTrigger: { trigger: el, start: `top+=${i * 18}% 60%`, toggleActions: "play none none reverse" },
        });
      });
    }, el);
    return () => {
      cancelAnimationFrame(raf);
      lineCtx.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section className="section-pad">
      <div className="container-pdn">
        <SectionHeader index="04" label="How it works" title="You don't need to understand any of the tech. That's our job." />

        <div ref={root} className="relative mt-16 lg:mt-24">
          {/* river line threading the three steps (desktop) */}
          <FlexPath
            d="M40 60 C200 60 260 10 400 40 C480 58 470 100 430 96 C390 92 400 50 460 52 C620 58 700 100 820 70 C900 50 900 20 860 24 C820 28 830 70 890 70 C1000 70 1100 60 1180 60"
            baseW={1200}
            baseH={120}
            stroke="var(--color-ink)"
            pathRef={line}
            className="absolute left-0 top-[8px] hidden h-[110px] w-full lg:block"
          />

          <ol className="relative grid gap-16 lg:grid-cols-3 lg:gap-8">
            {steps.map((s) => (
              <li key={s.n} className="flex flex-col">
                <span
                  data-num
                  aria-hidden
                  className="t-display relative w-fit bg-paper pr-5 font-medium leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]"
                >
                  {s.n}
                </span>
                <div data-tilt className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border border-grey-200 bg-white">
                  <Image src={s.img} alt={s.alt} fill sizes="(min-width:1024px) 25vw, 80vw" className="object-contain p-6" />
                </div>
                <p className="t-label mt-8 text-grey-500">{s.meta}</p>
                <h3 className="t-h3 mt-3">{s.title}</h3>
                <p className="mt-3 max-w-[38ch] text-grey-700 pretty">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
