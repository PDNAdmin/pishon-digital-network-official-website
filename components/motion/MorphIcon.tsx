"use client";
import { useEffect, useRef, type ComponentType, type SVGProps } from "react";
import { gsap, registerGsap, MorphSVGPlugin, prefersReducedMotion } from "./gsap";

const ARROW = "M4 12h16m-6-6 6 6-6 6";

/**
 * Off Brand-style icon → arrow morph (design-plan §8 Cards, §9 move 4).
 * The first shape of the icon morphs into the arrow; the rest fade away.
 * Controlled by the parent's hover state via `active`.
 */
export default function MorphIcon({
  Icon,
  active,
  className = "",
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  active: boolean;
  className?: string;
}) {
  const wrap = useRef<HTMLSpanElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    registerGsap();
    const svg = wrap.current?.querySelector("svg");
    if (!svg) return;
    if (prefersReducedMotion()) {
      // crossfade fallback
      const arrow = wrap.current!.querySelector<SVGSVGElement>("[data-arrow]")!;
      tl.current = gsap.timeline({ paused: true }).to(svg, { opacity: 0, duration: 0.15 }).to(arrow, { opacity: 1, duration: 0.15 }, 0);
      return;
    }
    const shapes = Array.from(svg.querySelectorAll<SVGGeometryElement>("path, circle, rect, line, polyline"));
    const paths = shapes.map((s) => (s.tagName.toLowerCase() === "path" ? (s as SVGPathElement) : (MorphSVGPlugin.convertToPath(s as unknown as SVGRectElement)[0] as SVGPathElement)));
    const [first, ...rest] = paths;
    tl.current = gsap
      .timeline({ paused: true, defaults: { duration: 0.4, ease: "power3.out" } })
      .to(first, { morphSVG: { shape: ARROW, shapeIndex: "auto" } }, 0)
      .to(rest, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%", duration: 0.25 }, 0)
      .to(svg, { x: 3 }, 0);
    return () => {
      tl.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!tl.current) return;
    if (active) tl.current.play();
    else tl.current.reverse();
  }, [active]);

  return (
    <span ref={wrap} className={`relative inline-flex ${className}`}>
      <Icon className="h-full w-full overflow-visible" />
      <svg
        data-arrow
        aria-hidden
        viewBox="0 0 24 24"
        className="absolute inset-0 h-full w-full opacity-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={ARROW} />
      </svg>
    </span>
  );
}
