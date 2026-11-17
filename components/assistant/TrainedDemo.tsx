"use client";
import { useEffect, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { LogoMark } from "@/components/Logo";

/* ------------------------------------------------------------------
   "Trained on your business": the visitor changes the business's
   settings and watches the assistant's answer rewrite itself.
------------------------------------------------------------------- */

type S = { sundays: boolean; fee: boolean; formal: boolean; pidgin: boolean };

const QUESTION = "Hi, can I come and view the flat on Sunday?";

function answer({ sundays, fee, formal, pidgin }: S) {
  if (!pidgin && !formal) {
    return [
      sundays ? "Yes, we're open on Sundays! I can book you in at 12pm or 3pm." : "We're closed on Sundays, but I can book you in on Saturday at 11am or 2pm.",
      fee ? "A viewing costs ₦10,000, and it comes off your agency fee if you take the flat." : "Viewings are free.",
      "Which time works for you?",
    ].join(" ");
  }
  if (!pidgin && formal) {
    return [
      sundays
        ? "Good day. Yes, we are open on Sundays, and viewings can be arranged at 12:00pm or 3:00pm."
        : "Good day. Unfortunately we are closed on Sundays, but viewings can be arranged on Saturday at 11:00am or 2:00pm.",
      fee ? "Please note there is a viewing fee of ₦10,000, which is deducted from the agency fee if you proceed." : "There is no charge for viewings.",
      "Kindly let me know which time suits you.",
    ].join(" ");
  }
  if (pidgin && !formal) {
    return [
      sundays ? "Yes o, we dey open on Sunday! I fit book you for 12pm or 3pm." : "We no dey open on Sunday, but I fit book you for Saturday, 11am or 2pm.",
      fee ? "Viewing na ₦10,000, but if you collect the house, we go remove am from your agency fee." : "Viewing na free.",
      "Which time go work for you?",
    ].join(" ");
  }
  return [
    sundays
      ? "Good day. Yes, we dey open on Sunday, and we fit arrange viewing for 12pm or 3pm."
      : "Good day. Sorry, we no dey open on Sunday, but we fit arrange am for Saturday, 11am or 2pm.",
    fee ? "Abeg note say viewing fee na ₦10,000, and we go remove am from agency fee if you go ahead." : "Viewing no cost anything.",
    "Abeg let me know which time suit you.",
  ].join(" ");
}

function Toggle({ label, hint, value, options, onChange }: { label: string; hint: string; value: boolean; options: [string, string]; onChange: (v: boolean) => void }) {
  return (
    <div className="flex flex-col gap-3 border-b border-grey-200 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-grey-500">{hint}</p>
      </div>
      <div role="radiogroup" aria-label={label} className="inline-flex w-fit shrink-0 rounded-full border border-grey-200 bg-paper p-1">
        {options.map((o, i) => {
          const selected = (i === 0) === value;
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(i === 0)}
              className={`h-9 rounded-full px-4 text-[14px] font-medium transition-colors duration-200 ${selected ? "bg-ink text-paper" : "text-grey-700 hover:text-ink"}`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function TrainedDemo() {
  const [s, setS] = useState<S>({ sundays: true, fee: false, formal: false, pidgin: false });
  const [typing, setTyping] = useState(false);
  const text = answer(s);
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (text === shown) return;
    setTyping(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => {
      setTyping(false);
      setShown(text);
    }, reduce ? 0 : 700);
    return () => window.clearTimeout(t);
  }, [text, shown]);

  const set = (k: keyof S) => (v: boolean) => setS((x) => ({ ...x, [k]: v }));

  return (
    <section className="section-pad pt-0 lg:pt-0">
      <div className="container-pdn">
        <SectionHeader
          index="03"
          label="Trained on your business"
          title="It only says what you'd say. Try it."
          aside="Your assistant learns your prices, hours, rules and way of talking, not random answers from the internet. Change the settings below and watch the reply change."
        />

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-8 lg:mt-20">
          {/* settings */}
          <div className="col-span-12 rounded-[var(--radius-frame)] border border-grey-200 bg-white p-6 sm:p-8 lg:col-span-6 lg:p-10">
            <div className="mb-2 flex items-center justify-between">
              <p className="t-label text-grey-500">Your assistant&apos;s settings</p>
              <p className="t-label text-grey-500">Prime Homes Realty</p>
            </div>
            <Toggle label="Open on Sundays?" hint="Your opening days" value={s.sundays} options={["Yes", "No"]} onChange={set("sundays")} />
            <Toggle label="Viewing fee" hint="Your prices" value={!s.fee} options={["Free", "₦10,000"]} onChange={(v) => set("fee")(!v)} />
            <Toggle label="Tone of voice" hint="How you talk to customers" value={!s.formal} options={["Friendly", "Formal"]} onChange={(v) => set("formal")(!v)} />
            <Toggle label="Language" hint="Reply in your customers' language" value={!s.pidgin} options={["English", "Pidgin"]} onChange={(v) => set("pidgin")(!v)} />
          </div>

          {/* live chat */}
          <div className="col-span-12 lg:col-span-6">
            <div className="flex h-full flex-col rounded-[var(--radius-frame)] bg-ink p-6 text-paper sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 border-b border-grey-700 pb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper">
                  <LogoMark className="h-5 w-5 text-ink" title="" />
                </span>
                <div className="leading-tight">
                  <p className="font-medium">Prime Homes Realty</p>
                  <p className="text-sm text-paper/60">AI assistant · replies in seconds</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-end gap-3 pt-8" aria-live="polite">
                <div>
                  <p className="mb-1.5 text-[12px] text-paper/50">A customer</p>
                  <p className="w-fit max-w-[85%] rounded-2xl rounded-tl-md bg-grey-700 px-4 py-3 text-[15px] leading-snug">{QUESTION}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="mb-1.5 text-[12px] text-paper/50">Your AI assistant</p>
                  {typing ? (
                    <div className="flex gap-1 rounded-2xl rounded-tr-md bg-paper px-4 py-4" aria-label="Assistant is typing">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="typing-dot h-1.5 w-1.5 rounded-full bg-ink" style={{ animationDelay: `${d * 140}ms` }} />
                      ))}
                    </div>
                  ) : (
                    <p key={shown} className="max-w-[92%] animate-[bubble_.35s_var(--ease-out-expo)] rounded-2xl rounded-tr-md bg-paper px-4 py-3 text-[15px] leading-snug text-ink">
                      {shown}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
