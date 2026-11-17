"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, registerGsap, SplitText, prefersReducedMotion } from "./gsap";

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** start immediately on mount instead of on scroll */
  immediate?: boolean;
  delay?: number;
  id?: string;
};

/** Headline line reveal: each line slides up from a mask (design-plan §9, move 1). */
export function RevealText({ as: Tag = "h2", className, children, immediate, delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "reveal-line-inner",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 105,
            duration: 0.9,
            stagger: 0.08,
            delay,
            ease: "power3.out",
            scrollTrigger: immediate ? undefined : { trigger: el, start: "top 85%", once: true },
          });
        },
      });
    }, el);
    return () => {
      split?.revert();
      ctx.revert();
    };
  }, [immediate, delay]);
  return (
    <Tag ref={ref} className={className} id={id} data-split="">
      {children}
    </Tag>
  );
}

/** Simple fade-up for blocks. */
export function FadeUp({
  children,
  className,
  delay = 0,
  stagger,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** if set, animates direct children with this stagger */
  stagger?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        y: 32,
        opacity: 0,
        duration: 0.9,
        delay,
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, stagger]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
