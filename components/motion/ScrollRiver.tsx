"use client";
import { useEffect, useRef } from "react";

/**
 * A thin gold river along the very top of the page. It fills with your scroll
 * position, and the water keeps moving while it does.
 */
export default function ScrollRiver() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar.current) bar.current.style.width = `${p * 100}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // one wave tile, repeated; the strip slides so the water flows
  const wave = "M0 4 C10 1 20 1 30 4 S50 7 60 4";
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[8px]">
      <div ref={bar} className="relative h-full overflow-hidden" style={{ width: 0 }}>
        <svg className="river-flow absolute left-0 top-0 h-[8px]" width="200%" height="8" preserveAspectRatio="none">
          <defs>
            <pattern id="pdn-wave" width="60" height="8" patternUnits="userSpaceOnUse">
              <path d={wave} fill="none" stroke="var(--color-gold)" strokeWidth="1.6" strokeLinecap="round" />
            </pattern>
          </defs>
          <rect width="100%" height="8" fill="url(#pdn-wave)" />
        </svg>
        <span className="absolute right-0 top-1/2 h-[7px] w-[7px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gold shadow-[0_0_0_4px_rgba(212,175,55,0.2)]" />
      </div>
    </div>
  );
}
