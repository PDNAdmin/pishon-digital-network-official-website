"use client";
import { useEffect, useState } from "react";

/** Mobile sticky bar: appears once the hero form has scrolled out of view. */
export default function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const target = document.getElementById("get-plan");
    const bottomForm = document.getElementById("lead-bottom");
    if (!target) return;
    let heroGone = false;
    let bottomVisible = false;
    const update = () => setShow(heroGone && !bottomVisible);
    const io1 = new IntersectionObserver(([e]) => {
      // only once the hero form has scrolled completely above the screen
      heroGone = !e.isIntersecting && e.boundingClientRect.bottom <= 0;
      update();
    });
    const io2 = new IntersectionObserver(([e]) => {
      bottomVisible = e.isIntersecting;
      update();
    });
    io1.observe(target);
    if (bottomForm) io2.observe(bottomForm);
    return () => {
      io1.disconnect();
      io2.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-grey-200 bg-paper/95 p-3 transition-transform duration-500 ease-[var(--ease-out-expo)] lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <a
        href="#lead-bottom"
        tabIndex={show ? 0 : -1}
        className="flex h-[52px] w-full items-center justify-center rounded-full bg-gold font-medium text-ink"
      >
        Get my free plan
      </a>
    </div>
  );
}
