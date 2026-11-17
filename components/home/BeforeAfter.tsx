"use client";
import Image from "next/image";
import { useRef, useState } from "react";

/** Draggable before/after (design-plan §8). Keyboard: ←/→ on the handle. */
export default function BeforeAfter({
  before = "/images/ui/before.jpg",
  after = "/images/ui/after.jpg",
  alt = "a restaurant website",
}: {
  before?: string;
  after?: string;
  alt?: string;
}) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      data-cursor="Drag"
      className="relative aspect-[780/598] w-full touch-pan-y select-none overflow-hidden rounded-[var(--radius-frame)] border border-grey-700 bg-grey-900"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image src={after} alt={`After: the rebuilt version of ${alt}`} fill sizes="(min-width:1024px) 70vw, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`Before: the old version of ${alt}`} fill sizes="(min-width:1024px) 70vw, 100vw" className="object-cover" />
      </div>

      <span className="t-label absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-ink">Before</span>
      <span className="t-label absolute right-4 top-4 rounded-full bg-ink px-3 py-1.5 text-paper">After</span>

      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-paper" />
        <button
          type="button"
          role="slider"
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
          }}
          className="absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-paper shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
        >
          <span aria-hidden className="text-lg">⟷</span>
        </button>
      </div>
    </div>
  );
}
