"use client";
import { useEffect } from "react";
import { gsap, registerGsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Site-wide micro-interactions, wired once with delegated listeners so every page gets them:
 *
 *  [data-magnetic]        pulls toward the cursor; [data-magnetic-inner] moves further (parallax)
 *  [data-ripple]          a ripple spreads from where you press
 *  [data-tilt]            3D tilt toward the cursor with a soft light sheen
 *  .dotted-rule           draws itself in when it scrolls into view
 *  header .t-label, [data-scramble]   mono labels decode from random characters
 *  marquees               speed up with your scroll, and reverse when you scroll up
 *  [data-parallax]        its image drifts as you scroll
 *
 * Hover effects need a fine pointer. Everything respects reduced motion.
 */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·+";

function scramble(el: HTMLElement) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: { n: Text; text: string }[] = [];
  while (walker.nextNode()) {
    const n = walker.currentNode as Text;
    if (n.nodeValue && n.nodeValue.trim()) nodes.push({ n, text: n.nodeValue });
  }
  if (!nodes.length) return;
  const t0 = performance.now();
  const dur = 650;
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    for (const { n, text } of nodes) {
      const done = Math.floor(text.length * p);
      let out = text.slice(0, done);
      for (let i = done; i < text.length; i++) out += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      n.nodeValue = out;
    }
    if (p < 1) requestAnimationFrame(tick);
    else for (const { n, text } of nodes) n.nodeValue = text;
  };
  requestAnimationFrame(tick);
}

export default function MicroFX() {
  useEffect(() => {
    registerGsap();
    const reduce = prefersReducedMotion();
    const fine = window.matchMedia("(pointer: fine)").matches;
    const root = document.documentElement;
    if (!reduce) root.classList.add("fx-ready");

    /* ---------- reveal-driven: rules draw, labels decode ---------- */
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("is-in");
          if (!reduce && el.matches("header .t-label, [data-scramble]")) scramble(el);
          io.unobserve(el);
        }
      },
      { threshold: 0.6 },
    );

    /* ---------- scroll-driven image drift ---------- */
    const parallaxed = new WeakSet<Element>();
    const setupParallax = () => {
      let added = 0;
      if (reduce) return added;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((box) => {
        if (parallaxed.has(box)) return;
        const img = box.querySelector("img");
        if (!img) return;
        parallaxed.add(box);
        added++;
        gsap.fromTo(
          img,
          { yPercent: -6, scale: 1.14 },
          { yPercent: 6, scale: 1.14, ease: "none", scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      return added;
    };

    /** Finds new elements; returns how many, so we only re-measure when a new page arrives. */
    const scan = () => {
      const fresh = document.querySelectorAll<HTMLElement>(".dotted-rule:not([data-fx]), header .t-label:not([data-fx]), [data-scramble]:not([data-fx])");
      fresh.forEach((el) => {
        el.dataset.fx = "1";
        io.observe(el);
      });
      return fresh.length + setupParallax();
    };
    scan();
    // new pages (client-side navigation) bring new elements
    let pending = 0;
    const mo = new MutationObserver(() => {
      if (pending) return;
      pending = window.setTimeout(() => {
        pending = 0;
        if (scan() > 0) ScrollTrigger.refresh();
      }, 400);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    /* ---------- ripple ---------- */
    const onDown = (e: PointerEvent) => {
      if (reduce) return;
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-ripple]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const s = document.createElement("span");
      const size = Math.max(r.width, r.height) * 2.2;
      s.className = "fx-ripple";
      s.style.width = s.style.height = `${size}px`;
      s.style.left = `${e.clientX - r.left - size / 2}px`;
      s.style.top = `${e.clientY - r.top - size / 2}px`;
      el.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    };
    document.addEventListener("pointerdown", onDown);

    /* ---------- magnetic + tilt (fine pointers) ---------- */
    let mag: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;
    const release = (el: HTMLElement) => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
      const inner = el.querySelector("[data-magnetic-inner]");
      if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
    };
    const untilt = (el: HTMLElement) => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
      el.style.setProperty("--glare", "0");
    };
    const onMove = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const m = t.closest<HTMLElement>("[data-magnetic]");
      if (mag && m !== mag) release(mag);
      mag = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        gsap.to(m, { x: dx * 14, y: dy * 12, duration: 0.5, ease: "power3.out" });
        const inner = m.querySelector("[data-magnetic-inner]");
        if (inner) gsap.to(inner, { x: dx * 10, y: dy * 8, duration: 0.5, ease: "power3.out" });
      }
      const tl = t.closest<HTMLElement>("[data-tilt]");
      if (tilt && tl !== tilt) untilt(tilt);
      tilt = tl;
      if (tl) {
        const r = tl.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        gsap.to(tl, { rotateY: (px - 0.5) * 9, rotateX: (0.5 - py) * 7, transformPerspective: 1000, duration: 0.6, ease: "power3.out" });
        tl.style.setProperty("--mx", `${px * 100}%`);
        tl.style.setProperty("--my", `${py * 100}%`);
        tl.style.setProperty("--glare", "1");
      }
    };
    const onLeave = () => {
      if (mag) release(mag);
      if (tilt) untilt(tilt);
      mag = tilt = null;
    };
    if (fine && !reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }

    /* ---------- marquees follow your scroll ---------- */
    let raf = 0;
    let lastY = window.scrollY;
    let rate = 1;
    let dir = 1;
    const loop = () => {
      const y = window.scrollY;
      const v = y - lastY;
      lastY = y;
      if (Math.abs(v) > 0.5) dir = v > 0 ? 1 : -1;
      const target = dir * (1 + Math.min(Math.abs(v) * 0.12, 5));
      rate += (target - rate) * 0.08;
      document.querySelectorAll<HTMLElement>("[class*='animate-[marquee']").forEach((el) => {
        if (el.matches(":hover")) return;
        el.getAnimations().forEach((a) => (a.playbackRate = rate));
      });
      raf = requestAnimationFrame(loop);
    };
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(pending);
      cancelAnimationFrame(raf);
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      root.classList.remove("fx-ready");
    };
  }, []);
  return null;
}
