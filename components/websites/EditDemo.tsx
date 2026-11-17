"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import SiteMock, { DEFAULT_SITE, PhoneFrame, type SiteData, type SiteKey } from "./SiteMock";

/* "Update it yourself": change a price, the hours, a notice or the photo, and the live site updates. */
const HOURS = ["9am – 3pm", "10am – 2pm", "Closed"];
const PHOTOS = [
  { src: "/images/photos/hero-clinic.jpg", label: "Team photo" },
  { src: "/images/chat/clinic-room.jpg", label: "Treatment room" },
];
const NOTICE = "Closed Monday 1 October for the public holiday. Online booking stays open.";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-grey-200 py-6">
      <p className="t-label mb-4 text-grey-500">{label}</p>
      {children}
    </div>
  );
}

export default function EditDemo() {
  const [d, setD] = useState<SiteData>(DEFAULT_SITE);
  const [focus, setFocus] = useState<SiteKey>("hero");
  const [hl, setHl] = useState<SiteKey | null>(null);
  const [saved, setSaved] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const change = (patch: Partial<SiteData>, f: SiteKey, h: SiteKey | null) => {
    setD((x) => ({ ...x, ...patch }));
    setFocus(f);
    setHl(h);
    setSaved((n) => n + 1);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setHl(null), 2600);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  const price = (delta: number) => change({ whitening: Math.max(50000, Math.min(250000, d.whitening + delta)) }, "whitening", "whitening");

  return (
    <section className="section-pad">
      <div className="container-pdn">
        <SectionHeader
          index="03"
          label="Yours to update"
          title="Change a price in ten seconds. No developer needed."
          aside="New prices, holiday hours, a fresh photo: you do it yourself from your phone. Try it. Change something on the left and watch the site."
        />
        <div className="mt-16 grid grid-cols-12 items-start gap-x-6 gap-y-12 lg:mt-24">
          {/* the owner's dashboard */}
          <div className="col-span-12 rounded-[var(--radius-card)] border border-grey-200 bg-white p-6 sm:p-8 lg:col-span-6 lg:col-start-1">
            <div className="flex items-center justify-between pb-6">
              <div>
                <p className="t-h3">Your website</p>
                <p className="text-sm text-grey-500">Bright Smile Dental · editing</p>
              </div>
              <span key={saved} className={`t-label flex items-center gap-2 rounded-full px-3 py-1.5 ${saved ? "animate-[pop_.5s_var(--ease-out-expo)] bg-ink text-paper" : "bg-paper text-grey-500"}`} aria-live="polite">
                <span className={`h-2 w-2 rounded-full ${saved ? "bg-gold" : "bg-grey-500"}`} />
                {saved ? "Published · just now" : "Up to date"}
              </span>
            </div>

            <Field label="Teeth whitening price">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => price(-5000)} aria-label="Lower the price by 5,000 naira" className="flex h-12 w-12 items-center justify-center rounded-full border border-grey-200 text-xl transition-colors hover:border-ink">−</button>
                <span className="t-h2 min-w-[8ch] text-center tabular-nums">₦{d.whitening.toLocaleString("en-NG")}</span>
                <button type="button" onClick={() => price(5000)} aria-label="Raise the price by 5,000 naira" className="flex h-12 w-12 items-center justify-center rounded-full border border-grey-200 text-xl transition-colors hover:border-ink">+</button>
              </div>
            </Field>

            <Field label="Saturday opening hours">
              <div role="radiogroup" aria-label="Saturday opening hours" className="flex flex-wrap gap-2">
                {HOURS.map((h) => (
                  <button
                    key={h}
                    type="button"
                    role="radio"
                    aria-checked={d.satHours === h}
                    onClick={() => change({ satHours: h }, "hours", "hours")}
                    className={`rounded-full border px-5 py-2.5 transition-colors ${d.satHours === h ? "border-ink bg-ink text-paper" : "border-grey-200 hover:border-ink"}`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Holiday notice">
              <button
                type="button"
                role="switch"
                aria-checked={!!d.notice}
                onClick={() => change({ notice: d.notice ? null : NOTICE }, d.notice ? "hero" : "notice", d.notice ? null : "notice")}
                className="flex w-full items-center justify-between gap-6 text-left"
              >
                <span className="pretty text-grey-700">“{NOTICE}”</span>
                <span className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${d.notice ? "bg-ink" : "bg-grey-200"}`}>
                  <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${d.notice ? "left-7" : "left-1"}`} />
                </span>
              </button>
            </Field>

            <Field label="Main photo">
              <div className="flex gap-3">
                {PHOTOS.map((p) => (
                  <button
                    key={p.src}
                    type="button"
                    aria-pressed={d.photo === p.src}
                    onClick={() => change({ photo: p.src }, "hero", null)}
                    className={`group relative h-24 w-32 overflow-hidden rounded-2xl border-2 transition-colors ${d.photo === p.src ? "border-ink" : "border-transparent"}`}
                  >
                    <Image src={p.src} alt={p.label} fill sizes="128px" className="object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-ink/70 px-2 py-1 text-left text-xs text-paper">{p.label}</span>
                  </button>
                ))}
              </div>
            </Field>
          </div>

          {/* the live site */}
          <div className="col-span-12 flex flex-col items-center lg:sticky lg:top-28 lg:col-span-5 lg:col-start-8">
            <div className="w-[72%] max-w-[320px] lg:w-[78%]">
              <PhoneFrame>
                <SiteMock device="phone" data={d} focus={focus} highlight={hl} />
              </PhoneFrame>
            </div>
            <p className="mt-5 text-center text-sm text-grey-500">Changes show up on your site straight away.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
