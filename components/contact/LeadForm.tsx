"use client";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

export type Need = "website" | "assistant" | "both" | "unsure";
type Channel = "whatsapp" | "phone" | "email";

const NEEDS: { v: Need; label: string }[] = [
  { v: "website", label: "A website" },
  { v: "assistant", label: "An AI assistant" },
  { v: "both", label: "Both" },
  { v: "unsure", label: "Not sure yet" },
];
const CHANNELS: { v: Channel; label: string; placeholder: string; type: string }[] = [
  { v: "whatsapp", label: "WhatsApp", placeholder: "Your WhatsApp number", type: "tel" },
  { v: "phone", label: "Phone", placeholder: "Your phone number", type: "tel" },
  { v: "email", label: "Email", placeholder: "you@business.com", type: "email" },
];

function track(event: string, data?: Record<string, unknown>) {
  // TODO: wire to Meta Pixel / GA4 / Google Ads (see copy/04-contact-sales-page.md "Build & tracking notes")
  if (typeof window !== "undefined") (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event, ...data });
}

function Pill({ selected, children, onClick }: { selected: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`h-11 w-full truncate rounded-full border px-3 text-[15px] font-medium transition-colors duration-200 ${
        selected ? "border-ink bg-ink text-paper" : "border-grey-200 bg-white text-ink hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}

export default function LeadForm({ defaultNeed = "both", formId = "lead" }: { defaultNeed?: Need; formId?: string }) {
  const uid = useId();
  const [need, setNeed] = useState<Need>(defaultNeed);
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const started = useRef(false);
  const ch = CHANNELS.find((c) => c.v === channel)!;

  useEffect(() => setNeed(defaultNeed), [defaultNeed]);

  const onStart = () => {
    if (!started.current) {
      started.current = true;
      track("form_start", { form: formId });
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const n = String(fd.get("name") || "").trim();
    const biz = String(fd.get("business") || "").trim();
    const contact = String(fd.get("contact") || "").trim();
    const errs: Record<string, string> = {};
    if (!n) errs.name = "We need this one to get back to you.";
    if (!biz) errs.business = "We need this one to get back to you.";
    if (!contact) errs.contact = "We need this one to get back to you.";
    else if (channel === "email" && !/^\S+@\S+\.\S+$/.test(contact)) errs.contact = "That email doesn't look quite right.";
    else if (channel !== "email" && contact.replace(/\D/g, "").length < 7) errs.contact = "Could you double-check that number?";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    setName(n);
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries([...params].filter(([k]) => k.startsWith("utm_")));
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, business: biz, need, channel, contact, notes: fd.get("notes") || "", variant: params.get("for") || "both", utm, page: window.location.pathname }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("done");
      track("form_submit", { form: formId, need });
      track("form_success", { form: formId, need });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-[var(--radius-card)] border border-grey-200 bg-white p-8 text-ink" role="status">
        <div className="relative mx-auto mb-6 aspect-square w-40">
          <Image src="/images/illustrations/form-success.png" alt="" fill sizes="160px" className="object-contain" />
        </div>
        <p className="t-h2">Got it, {name.split(" ")[0]}. Thanks!</p>
        <p className="mt-4 text-grey-700 pretty">
          We&apos;ll reach out on {ch.label} within one working day, usually much sooner.
        </p>
        {/* TODO: embed Cal.com / Calendly here for "Pick a call time" */}
      </div>
    );
  }

  const field = "h-14 w-full rounded-xl border bg-white px-4 text-[16px] text-ink placeholder:text-grey-500 outline-none transition-[border-color,box-shadow] focus:border-ink focus:shadow-[0_0_0_1px_var(--color-ink)]";
  const err = (k: string) => (errors[k] ? "border-ink" : "border-grey-200");

  return (
    <form
      id={formId}
      noValidate
      onSubmit={onSubmit}
      onFocus={onStart}
      className="rounded-[var(--radius-card)] border border-grey-200 bg-white p-6 text-ink sm:p-8"
    >
      <p className="t-h3">Get your free plan</p>
      <p className="mt-1 text-sm text-grey-500">Takes about a minute.</p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-2 block text-sm font-medium">Your name</label>
          <input id={`${uid}-name`} name="name" autoComplete="name" placeholder="e.g. Tolu Adebayo" className={`${field} ${err("name")}`} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-e` : undefined} />
          {errors.name && <p id={`${uid}-name-e`} className="mt-2 flex items-center gap-2 text-sm"><ErrIcon />{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-biz`} className="mb-2 block text-sm font-medium">Your business</label>
          <input id={`${uid}-biz`} name="business" autoComplete="organization" placeholder="e.g. Prime Homes Realty" className={`${field} ${err("business")}`} aria-invalid={!!errors.business} aria-describedby={errors.business ? `${uid}-biz-e` : undefined} />
          {errors.business && <p id={`${uid}-biz-e`} className="mt-2 flex items-center gap-2 text-sm"><ErrIcon />{errors.business}</p>}
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">What do you need?</legend>
          <div role="radiogroup" className="grid grid-cols-2 gap-2">
            {NEEDS.map((o) => (
              <Pill key={o.v} selected={need === o.v} onClick={() => setNeed(o.v)}>{o.label}</Pill>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">Best way to reach you</legend>
          <div role="radiogroup" className="mb-3 grid grid-cols-3 gap-2">
            {CHANNELS.map((o) => (
              <Pill key={o.v} selected={channel === o.v} onClick={() => setChannel(o.v)}>{o.label}</Pill>
            ))}
          </div>
          <label htmlFor={`${uid}-contact`} className="sr-only">{ch.placeholder}</label>
          <input id={`${uid}-contact`} name="contact" type={ch.type} inputMode={ch.type === "tel" ? "tel" : "email"} autoComplete={ch.type === "tel" ? "tel" : "email"} placeholder={ch.placeholder} className={`${field} ${err("contact")}`} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? `${uid}-contact-e` : undefined} />
          {errors.contact && <p id={`${uid}-contact-e`} className="mt-2 flex items-center gap-2 text-sm"><ErrIcon />{errors.contact}</p>}
        </fieldset>

        <div>
          <label htmlFor={`${uid}-notes`} className="mb-2 block text-sm font-medium">
            Anything we should know? <span className="font-normal text-grey-500">(optional)</span>
          </label>
          <textarea id={`${uid}-notes`} name="notes" rows={3} placeholder="e.g. We get lots of enquiries after hours and miss most of them" className={`${field} h-auto resize-none py-3 border-grey-200`} />
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" full disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Get my free plan"}
        </Button>
        {status === "error" ? (
          <p className="mt-3 text-sm" role="alert">
            Something went wrong on our end. Please try again, or message us on WhatsApp at{" "}
            <a className="underline" href={site.whatsappHref}>{site.whatsappDisplay}</a>.
          </p>
        ) : (
          <p className="mt-3 text-center text-sm text-grey-500">No spam. No pushy sales calls. We reply within 1 working day.</p>
        )}
      </div>
    </form>
  );
}

function ErrIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#B3261E]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 16.5v.5" strokeLinecap="round" />
    </svg>
  );
}
