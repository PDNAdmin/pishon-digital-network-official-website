"use client";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/* ==================================================================
   A live example client website (fictional "Bright Smile Dental"),
   rendered in real HTML at native size and scaled to fit its frame.
   The page sections can scroll it, highlight parts of it and change
   its content, so visitors use a website instead of looking at one.
================================================================== */

export type SiteKey = "hero" | "services" | "book" | "hours" | "reviews" | "notice" | "whitening";
export type SiteData = { whitening: number; satHours: string; notice: string | null; photo: string };

export const DEFAULT_SITE: SiteData = {
  whitening: 120000,
  satHours: "9am – 3pm",
  notice: null,
  photo: "/images/photos/hero-clinic.jpg",
};

const BRAND = "#0E5A55"; // the client's own colour (each client site gets its own)
const naira = (n: number) => "₦" + n.toLocaleString("en-NG");

type Device = "desktop" | "phone";
const SIZES: Record<Device, { w: number; vh: number }> = {
  desktop: { w: 1280, vh: 800 },
  phone: { w: 390, vh: 780 },
};

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    setW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function Tooth({ size = 28 }: { size?: number }) {
  return (
    <span style={{ width: size, height: size, background: BRAND, borderRadius: size * 0.32 }} className="inline-flex items-center justify-center text-white">
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 4.5 2 7.5.4 2.5 1 6 2.5 6s1.8-3 2.5-5c.4-1 .8-1.5 2-1.5s1.6.5 2 1.5c.7 2 1 5 2.5 5s2.1-3.5 2.5-6c.5-3 2-4.5 2-7.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3Z" />
      </svg>
    </span>
  );
}

const SERVICES = (d: SiteData) => [
  { k: "consult", n: "First consultation", p: "Free", t: "30 min" },
  { k: "scale", n: "Scaling & polishing", p: naira(35000), t: "45 min" },
  { k: "whitening", n: "Teeth whitening", p: naira(d.whitening), t: "1 hour" },
  { k: "filling", n: "Fillings", p: "from " + naira(25000), t: "45 min" },
  { k: "braces", n: "Braces consultation", p: naira(15000), t: "40 min" },
  { k: "kids", n: "Children's check-up", p: naira(10000), t: "30 min" },
];

const REVIEWS = [
  { q: "They explained everything before touching my teeth. No surprises on the bill.", n: "Funmi A." },
  { q: "Booked on Friday night, seen on Saturday morning. Painless.", n: "Chinedu O." },
  { q: "My kids actually look forward to going. That says it all.", n: "Hauwa B." },
];

/** Gold highlight. `inside` for full-width sections, so the whole frame and its label stay visible. */
function Ring({ show, label, round = 18, inside = false }: { show: boolean; label?: string; round?: number; inside?: boolean }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-20 transition-all duration-500 ${inside ? "inset-3" : "-inset-3"}`}
      style={{ borderRadius: inside ? 20 : round, boxShadow: show ? "0 0 0 3px #D4AF37, 0 0 0 10px rgba(212,175,55,0.18)" : "0 0 0 0 rgba(212,175,55,0)", opacity: show ? 1 : 0 }}
    >
      {label && show && (
        <span className={`absolute rounded-full bg-[#0F0F10] px-3 py-1 font-mono text-[13px] uppercase tracking-wider text-white ${inside ? "right-4 top-4" : "-top-4 left-4"}`}>{label}</span>
      )}
    </span>
  );
}

function Mark({ k, hl, children, className = "", label, round }: { k: SiteKey; hl?: SiteKey | null; children: ReactNode; className?: string; label?: string; round?: number }) {
  return (
    <div data-k={k} className={`relative ${className}`}>
      {children}
      <Ring show={hl === k} label={label} round={round} inside={round === 0} />
    </div>
  );
}

function MapBlock({ h }: { h: number }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#E9E7E1]" style={{ height: h }}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path d="M-10 170 C80 150 140 190 230 160 S360 120 420 140" stroke="#fff" strokeWidth="14" fill="none" />
        <path d="M120 -10 C130 60 110 120 140 250" stroke="#fff" strokeWidth="10" fill="none" />
        <path d="M260 -10 C250 80 300 140 280 250" stroke="#fff" strokeWidth="8" fill="none" />
        <path d="M-10 70 C100 80 200 50 420 60" stroke="#fff" strokeWidth="6" fill="none" />
        <rect x="300" y="170" width="120" height="80" fill="#cfe0dd" />
      </svg>
      <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="rounded-full px-3 py-1 text-[12px] font-semibold text-white" style={{ background: BRAND }}>Bright Smile Dental</span>
        <span className="h-3 w-0.5" style={{ background: BRAND }} />
        <span className="h-3 w-3 rounded-full border-2 border-white" style={{ background: BRAND }} />
      </span>
    </div>
  );
}

function Stars({ size = 14 }: { size?: number }) {
  return (
    <span className="inline-flex gap-0.5" style={{ color: "#D4AF37" }} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="m12 2 3 6.6 7 .7-5.3 4.8 1.6 7L12 17.5 5.7 21.1l1.6-7L2 9.3l7-.7L12 2Z" /></svg>
      ))}
    </span>
  );
}

/* ---------------- the client site ---------------- */
function SiteContent({ phone, d, hl }: { phone: boolean; d: SiteData; hl?: SiteKey | null }) {
  const services = SERVICES(d);
  const hours = [
    ["Mon – Fri", "8am – 6pm"],
    ["Saturday", d.satHours],
    ["Sunday", "Closed"],
  ];
  return (
    <div className="bg-white text-[#141414]" style={{ fontFamily: "var(--font-satoshi), system-ui, sans-serif" }}>
      {d.notice && (
        <Mark k="notice" hl={hl} round={0}>
          <div className={`flex items-center gap-3 bg-[#FFF6DB] text-[#5A4A12] ${phone ? "px-5 py-3 text-[14px]" : "justify-center px-10 py-3 text-[16px]"}`}>
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
            {d.notice}
          </div>
        </Mark>
      )}

      {/* hero */}
      <Mark k="hero" hl={hl} round={0}>
        <section className={phone ? "px-5 pb-8 pt-6" : "grid grid-cols-[1.05fr_1fr] items-center gap-14 px-16 pb-16 pt-12"}>
          <div>
            <p className="flex items-center gap-2 text-[14px] font-medium" style={{ color: BRAND }}>
              <Stars /> 4.9 · 212 Google reviews
            </p>
            <h1 className={`mt-4 font-medium tracking-[-0.03em] ${phone ? "text-[38px] leading-[1.02]" : "text-[64px] leading-[0.98]"}`}>
              Gentle dental care in Lekki.{d.satHours === "Closed" ? " Monday to Friday." : " Open on Saturdays."}
            </h1>
            <p className={`mt-5 text-[#555] ${phone ? "text-[16px] leading-[1.5]" : "max-w-[30rem] text-[19px] leading-[1.5]"}`}>
              Check-ups, whitening and braces from a team that explains everything first. Your first consultation is free.
            </p>
            {!phone && (
              <Mark k="book" hl={hl} className="mt-8 inline-flex gap-3" round={99} label="One tap to book">
                <span className="rounded-full px-7 py-4 text-[17px] font-semibold text-white" style={{ background: BRAND }}>Book a visit</span>
                <span className="rounded-full border border-[#ccc] px-7 py-4 text-[17px] font-medium">WhatsApp us</span>
              </Mark>
            )}
          </div>
          <div className={`relative overflow-hidden rounded-[22px] bg-[#eee] ${phone ? "mt-6 h-[260px]" : "h-[520px]"}`}>
            <Image src={d.photo} alt="" fill sizes="(min-width:1024px) 40vw, 80vw" className="object-cover transition-opacity duration-500" />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-[14px] font-medium">HMO patients welcome</span>
          </div>
        </section>
      </Mark>

      {/* services + prices */}
      <Mark k="services" hl={hl} round={0} label="Prices, up front">
        <section className={phone ? "bg-[#F6F5F1] px-5 py-10" : "bg-[#F6F5F1] px-16 py-16"}>
          <div className={phone ? "" : "flex items-end justify-between"}>
            <h2 className={`font-medium tracking-[-0.02em] ${phone ? "text-[28px]" : "text-[40px]"}`}>Services and prices</h2>
            <p className={`text-[#666] ${phone ? "mt-2 text-[14px]" : "text-[16px]"}`}>No hidden costs. We accept most major HMOs.</p>
          </div>
          <div className={`mt-8 grid gap-3 ${phone ? "grid-cols-1" : "grid-cols-3"}`}>
            {services.map((s) => (
              <div key={s.k} className="relative rounded-2xl bg-white p-5">
                <p className="text-[17px] font-medium">{s.n}</p>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-[22px] font-semibold tracking-[-0.01em] transition-colors duration-500" style={{ color: hl === "whitening" && s.k === "whitening" ? "#A8871F" : undefined }}>{s.p}</span>
                  <span className="text-[14px] text-[#888]">{s.t}</span>
                </div>
                {s.k === "whitening" && <Ring show={hl === "whitening"} round={18} />}
              </div>
            ))}
          </div>
        </section>
      </Mark>

      {/* visit us */}
      <Mark k="hours" hl={hl} round={0} label="Hours + map">
        <section className={phone ? "px-5 py-10" : "grid grid-cols-[1fr_1.3fr] gap-12 px-16 py-16"}>
          <div>
            <h2 className={`font-medium tracking-[-0.02em] ${phone ? "text-[28px]" : "text-[40px]"}`}>Visit us</h2>
            <p className="mt-3 text-[16px] text-[#555]">12 Admiralty Way, Lekki Phase 1, Lagos</p>
            <dl className="mt-6 divide-y divide-[#eee] border-y border-[#eee]">
              {hours.map(([a, b]) => (
                <div key={a} className="flex justify-between py-3 text-[16px]">
                  <dt className="text-[#666]">{a}</dt>
                  <dd className="font-medium transition-colors duration-500">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={phone ? "mt-6" : ""}>
            <MapBlock h={phone ? 200 : 300} />
          </div>
        </section>
      </Mark>

      {/* reviews */}
      <Mark k="reviews" hl={hl} round={0} label="Real reviews">
        <section className={phone ? "bg-[#F6F5F1] px-5 py-10" : "bg-[#F6F5F1] px-16 py-16"}>
          <h2 className={`font-medium tracking-[-0.02em] ${phone ? "text-[28px]" : "text-[40px]"}`}>What patients say</h2>
          <div className={`mt-8 grid gap-3 ${phone ? "" : "grid-cols-3"}`}>
            {REVIEWS.map((r) => (
              <figure key={r.n} className="rounded-2xl bg-white p-6">
                <Stars />
                <blockquote className="mt-3 text-[17px] leading-[1.45]">“{r.q}”</blockquote>
                <figcaption className="mt-4 text-[14px] text-[#777]">{r.n} · Google review</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </Mark>

      <footer className={`flex items-center justify-between bg-[#141414] text-white ${phone ? "px-5 pb-24 pt-8 text-[13px]" : "px-16 py-8 text-[14px]"}`}>
        <span className="flex items-center gap-2"><Tooth size={22} /> Bright Smile Dental</span>
        <span className="opacity-60">Lekki Phase 1, Lagos</span>
      </footer>
    </div>
  );
}

export default function SiteMock({
  device,
  data = DEFAULT_SITE,
  highlight = null,
  focus = null,
  autoTour = false,
  className = "",
}: {
  device: Device;
  data?: SiteData;
  highlight?: SiteKey | null;
  focus?: SiteKey | null;
  /** scroll through the site on its own (hero) */
  autoTour?: boolean;
  className?: string;
}) {
  const phone = device === "phone";
  const { w: W, vh: VH } = SIZES[device];
  const [box, width] = useWidth<HTMLDivElement>();
  const content = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [tourKey, setTourKey] = useState<SiteKey>("hero");
  const scale = width ? width / W : 0;
  const navH = phone ? 60 : 76;

  // auto tour through the sections
  useEffect(() => {
    if (!autoTour) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const order: SiteKey[] = ["hero", "services", "hours", "reviews"];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % order.length;
      setTourKey(order[i]);
    }, 3200);
    return () => clearInterval(id);
  }, [autoTour]);

  const target = autoTour ? tourKey : focus;

  // scroll the site so the target section sits under the nav
  useLayoutEffect(() => {
    const el = content.current;
    if (!el) return;
    const t = target === "book" ? (phone ? null : "hero") : target === "whitening" ? "services" : target;
    if (!t) return setOffset(0);
    const node = el.querySelector<HTMLElement>(`[data-k="${t}"]`);
    if (!node) return;
    const max = Math.max(0, el.scrollHeight - (VH - navH));
    setOffset(Math.min(max, Math.max(0, node.offsetTop - (t === "hero" ? 0 : 8))));
  }, [target, phone, VH, navH, data.notice, width]);

  return (
    <div ref={box} className={`relative w-full overflow-hidden ${className}`} style={{ height: scale ? VH * scale : undefined, aspectRatio: scale ? undefined : `${W} / ${VH}` }}>
      {scale > 0 && (
        <div className="absolute left-0 top-0 origin-top-left overflow-hidden bg-white" style={{ width: W, height: VH, transform: `scale(${scale})` }}>
          {/* site nav (fixed) */}
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b border-[#eee] bg-white/95 backdrop-blur" style={{ height: navH, padding: phone ? "0 20px" : "0 64px", fontFamily: "var(--font-satoshi), system-ui, sans-serif" }}>
            <span className={`flex items-center gap-3 font-semibold ${phone ? "text-[17px]" : "text-[19px]"}`}>
              <Tooth size={phone ? 30 : 34} /> Bright Smile Dental
            </span>
            {phone ? (
              <span className="flex flex-col gap-1.5" aria-hidden>
                <i className="block h-0.5 w-6 bg-[#141414]" />
                <i className="block h-0.5 w-6 bg-[#141414]" />
              </span>
            ) : (
              <span className="flex items-center gap-8 text-[16px] text-[#444]">
                <span>Services</span>
                <span>Prices</span>
                <span>Visit us</span>
                <span>Reviews</span>
                <span className="rounded-full px-5 py-2.5 font-semibold text-white" style={{ background: BRAND }}>Book a visit</span>
              </span>
            )}
          </div>
          {/* scrolling page */}
          <div className="absolute inset-x-0 bottom-0" style={{ top: navH, overflow: "hidden" }}>
            <div ref={content} className="transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ transform: `translateY(${-offset}px)` }}>
              <SiteContent phone={phone} d={data} hl={highlight} />
            </div>
          </div>
          {/* phone: sticky action bar */}
          {phone && (
            <div className="absolute inset-x-0 bottom-0 z-30 border-t border-[#eee] bg-white px-4 pb-6 pt-3" style={{ fontFamily: "var(--font-satoshi), system-ui, sans-serif" }}>
              <div className="relative grid grid-cols-[1fr_1fr_1.4fr] gap-2 text-[15px] font-semibold">
                <span className="rounded-full border border-[#ccc] py-3 text-center">Call</span>
                <span className="rounded-full border border-[#ccc] py-3 text-center">WhatsApp</span>
                <span className="rounded-full py-3 text-center text-white" style={{ background: BRAND }}>Book a visit</span>
                <Ring show={highlight === "book"} label="One tap to book" round={99} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- frames ---------------- */
export function BrowserFrame({ children, url = "brightsmile-dental.example", dark = false }: { children: ReactNode; url?: string; dark?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-[18px] border shadow-[0_30px_80px_rgba(15,15,16,0.16)] ${dark ? "border-grey-700 bg-grey-900" : "border-grey-200 bg-white"}`}>
      <div className={`flex items-center gap-3 border-b px-4 py-3 ${dark ? "border-grey-700" : "border-grey-200"}`}>
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <i key={i} className={`block h-2.5 w-2.5 rounded-full ${dark ? "bg-grey-700" : "bg-grey-200"}`} />
          ))}
        </span>
        <span className={`mx-auto flex max-w-[60%] flex-1 items-center justify-center gap-2 truncate rounded-full px-4 py-1.5 font-mono text-[11px] ${dark ? "bg-ink text-paper/60" : "bg-paper text-grey-500"}`}>
          <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          {url}
        </span>
        <span className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[38px] bg-ink p-[9px] shadow-[0_30px_80px_rgba(15,15,16,0.28)] ${className}`}>
      <div className="relative overflow-hidden rounded-[30px] bg-white">
        <span aria-hidden className="absolute left-1/2 top-2 z-40 h-[18px] w-[80px] -translate-x-1/2 rounded-full bg-ink" />
        {children}
      </div>
    </div>
  );
}
