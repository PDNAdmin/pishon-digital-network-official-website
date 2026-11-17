"use client";
import { useId, useState } from "react";

export type QA = { q: string; a: string };

/** Accordion with hairlines; plus rotates to a cross. One open at a time. */
export default function FAQ({ items, dark = false }: { items: QA[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <ul className={`border-t ${dark ? "border-grey-700" : "border-grey-200"}`}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.q} className={`border-b ${dark ? "border-grey-700" : "border-grey-200"}`}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span className="t-h3">{it.q}</span>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,color] duration-300 ease-[var(--ease-out-expo)] ${
                    isOpen
                      ? `rotate-45 ${dark ? "border-paper bg-paper text-ink" : "border-ink bg-ink text-paper"}`
                      : dark
                        ? "border-grey-700"
                        : "border-grey-200"
                  }`}
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`${id}-${i}`}
              role="region"
              className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className={`max-w-[62ch] pb-8 t-body-lg pretty ${dark ? "text-paper/75" : "text-grey-700"}`}>{it.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
