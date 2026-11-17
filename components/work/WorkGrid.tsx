"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PlaceholderTag } from "@/components/home/Proof";
import { CASES, SERVICE_LABEL, type CaseStudy, type Service } from "@/lib/work";

const FILTERS: { key: "all" | Service; label: string }[] = [
  { key: "all", label: "All work" },
  { key: "website", label: "Websites" },
  { key: "assistant", label: "AI assistants" },
];

function CaseCard({ c, wide, delay }: { c: CaseStudy; wide: boolean; delay: number }) {
  return (
    <Link href={`/work/${c.slug}`} data-cursor="View" className="group block animate-[bubble_.6s_var(--ease-out-expo)_both]" style={{ animationDelay: `${delay}ms` }}>
      <div data-tilt className={`relative overflow-hidden rounded-[var(--radius-card)] bg-grey-200 ${wide ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"}`}>
        <Image
          src={c.cover}
          alt={c.coverAlt}
          fill
          sizes={wide ? "(min-width:768px) 90vw, 100vw" : "(min-width:768px) 45vw, 100vw"}
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {c.services.map((s) => (
            <span key={s} className="t-label rounded-full bg-paper/95 px-3 py-1.5 text-ink">{SERVICE_LABEL[s]}</span>
          ))}
        </div>
        {c.placeholder && (
          <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-1 py-1 text-paper">
            <PlaceholderTag />
          </span>
        )}
        {/* arrow chip slides in on hover */}
        <span className="absolute bottom-4 right-4 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-gold text-ink opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100" aria-hidden>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
        </span>
      </div>
      <div className="mt-5 grid gap-x-6 gap-y-2 md:grid-cols-[1fr_auto]">
        <p className="t-h3 balance transition-colors group-hover:text-gold-deep">{c.headline}</p>
        <p className="t-label text-grey-500 md:pt-2 md:text-right">
          {c.client} · {c.place}
        </p>
      </div>
    </Link>
  );
}

export default function WorkGrid() {
  const [f, setF] = useState<"all" | Service>("all");
  const list = f === "all" ? CASES : CASES.filter((c) => c.services.includes(f));
  return (
    <div>
      <div role="tablist" aria-label="Filter our work" className="flex flex-wrap gap-2">
        {FILTERS.map((x) => {
          const n = x.key === "all" ? CASES.length : CASES.filter((c) => c.services.includes(x.key as Service)).length;
          const on = f === x.key;
          return (
            <button
              key={x.key}
              role="tab"
              aria-selected={on}
              onClick={() => setF(x.key)}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 transition-colors ${on ? "border-ink bg-ink text-paper" : "border-grey-200 hover:border-ink"}`}
            >
              {x.label}
              <span className={`t-label ${on ? "text-paper/60" : "text-grey-500"}`}>{n}</span>
            </button>
          );
        })}
      </div>
      <div key={f} className="mt-12 grid gap-x-5 gap-y-16 md:grid-cols-2">
        {list.map((c, i) => {
          const wide = i % 3 === 0;
          return (
            <div key={c.slug} className={wide ? "md:col-span-2" : ""}>
              <CaseCard c={c} wide={wide} delay={i * 70} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
