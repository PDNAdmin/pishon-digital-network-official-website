"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/Logo";
import { IconCalendarCheck } from "@/components/icons";
import { prefersReducedMotion } from "@/components/motion/gsap";

/* ------------------------------------------------------------------
   The Vizcom moment (design-plan §8 "The chat demo").
   Built in real HTML so it's accessible, swappable and honest.
------------------------------------------------------------------- */

type Card = { title: string; detail: string };
type Script = { q: string; a: string; card?: Card; handover?: boolean };
type Business = { key: string; label: string; name: string; scripts: Script[] };

const BUSINESSES: Business[] = [
  {
    key: "realestate",
    label: "Real estate",
    name: "Prime Homes Realty",
    scripts: [
      { q: "Is the 3-bedroom in Lekki still available?", a: "Yes, it's still available. It's a serviced 3-bedroom with 24-hour power, ₦4.5m a year. Would you like to see it?" },
      { q: "Can I view it this Saturday?", a: "Saturday works. I have 11:00am or 2:00pm. I've booked 11:00am for you and sent the address to your WhatsApp.", card: { title: "Viewing booked", detail: "Sat · 11:00 AM · Lekki Phase 1" } },
      { q: "Do you have anything cheaper in Yaba?", a: "We have two 2-bedroom flats in Yaba from ₦2.2m a year. Shall I send you photos of both?" },
      { q: "I'd like to speak to an agent.", a: "Of course. I've passed your details to Chidi, our Lekki agent. He'll call you before 10am tomorrow.", handover: true },
    ],
  },
  {
    key: "clinic",
    label: "Clinic",
    name: "Bright Smile Dental",
    scripts: [
      { q: "Do you do teeth whitening?", a: "We do. A whitening session takes about an hour. Would you like a free consultation first?" },
      { q: "Can I see a dentist tomorrow?", a: "Dr. Okafor has 10:00am or 2:30pm tomorrow. I've reserved 10:00am for you.", card: { title: "Appointment booked", detail: "Tomorrow · 10:00 AM · Dr. Okafor" } },
      { q: "Do you accept HMO?", a: "Yes, we accept most major HMOs. Bring your card on the day and we'll confirm your cover at the desk." },
      { q: "I have bad tooth pain right now.", a: "I'm sorry, that sounds painful. I've alerted our on-call team and someone will call you within 15 minutes.", handover: true },
    ],
  },
  {
    key: "law",
    label: "Law firm",
    name: "Adeyemi & Co. Legal",
    scripts: [
      { q: "Do you handle property disputes?", a: "Yes, property and land disputes are one of our main areas. Would you like a first consultation with one of our lawyers?" },
      { q: "Can I book a consultation this week?", a: "Barrister Adeyemi is free on Thursday at 3:00pm. I've booked it and emailed you a list of documents to bring.", card: { title: "Consultation booked", detail: "Thu · 3:00 PM · Barr. Adeyemi" } },
      { q: "How much is a consultation?", a: "A first 30-minute consultation is ₦25,000. If you go ahead with us, it comes off your fees." },
      { q: "It's urgent. I've just been served.", a: "I understand. I've flagged this as urgent for our litigation team. A lawyer will call you first thing tomorrow, before 9am.", handover: true },
    ],
  },
  {
    key: "hotel",
    label: "Hotel",
    name: "The Palms Suites",
    scripts: [
      { q: "Do you have a room this Friday?", a: "Yes, we have a deluxe room free on Friday, ₦85,000 a night with breakfast. Shall I reserve it for you?" },
      { q: "Please reserve it for 2 nights.", a: "Done. Your deluxe room is reserved from Friday to Sunday. I've sent the confirmation to your email.", card: { title: "Reservation confirmed", detail: "Fri – Sun · Deluxe room · 2 nights" } },
      { q: "Do you do airport pickup?", a: "Yes, airport pickup is ₦20,000 each way. Would you like me to add it to your booking?" },
      { q: "Can we host a small conference?", a: "We'd love to. I've sent your request to Ngozi, our events manager. She'll email you options and prices tomorrow.", handover: true },
    ],
  },
];

type Msg = { id: number; from: "them" | "us"; text: string; time: string; card?: Card; handover?: boolean };

const fmt = (m: number) => `11:${String(m).padStart(2, "0")} PM`;

export default function ChatDemo() {
  const [biz, setBiz] = useState(BUSINESSES[0]);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [used, setUsed] = useState<number[]>([]);
  const [stats, setStats] = useState<{ replied: string; booked: string }>({ replied: "—", booked: "—" });
  const minute = useRef(40);
  const idRef = useRef(0);
  const scroller = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const autoplayed = useRef(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const ask = useCallback(
    (i: number, b: Business = biz) => {
      if (typing) return;
      const s = b.scripts[i];
      const reduce = prefersReducedMotion();
      const t = fmt(minute.current);
      setUsed((u) => [...u, i]);
      setMsgs((m) => [...m, { id: ++idRef.current, from: "them", text: s.q, time: t }]);
      setTyping(true);
      const delay = reduce ? 0 : 900 + Math.min(1200, s.a.length * 9);
      timers.current.push(
        window.setTimeout(() => {
          setTyping(false);
          const secs = Math.max(2, Math.round(delay / 1000) + 1);
          setMsgs((m) => [...m, { id: ++idRef.current, from: "us", text: s.a, time: t, card: s.card, handover: s.handover }]);
          setStats((st) => ({ replied: `${secs}s`, booked: s.card ? t : st.booked }));
          minute.current = Math.min(59, minute.current + 1);
        }, delay),
      );
    },
    [biz, typing],
  );

  const switchBiz = (b: Business) => {
    clearTimers();
    setBiz(b);
    setMsgs([]);
    setUsed([]);
    setTyping(false);
    setStats({ replied: "—", booked: "—" });
    minute.current = 40;
  };

  // auto-play one exchange when the demo first scrolls into view
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !autoplayed.current) {
          autoplayed.current = true;
          timers.current.push(window.setTimeout(() => ask(1), 500));
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ask]);

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    const s = scroller.current;
    if (s) s.scrollTo({ top: s.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [msgs, typing]);

  return (
    <div ref={root} className="grid grid-cols-12 gap-x-6 gap-y-12">
      {/* Controls */}
      <div className="col-span-12 flex flex-col lg:col-span-5">
        <p className="t-label text-paper/60">1. Pick a type of business</p>
        <div role="tablist" aria-label="Business type" className="mt-4 inline-flex w-fit flex-wrap gap-1 rounded-full border border-grey-700 p-1">
          {BUSINESSES.map((b) => (
            <button
              key={b.key}
              role="tab"
              aria-selected={b.key === biz.key}
              onClick={() => switchBiz(b)}
              className={`h-10 rounded-full px-4 text-[15px] font-medium transition-colors duration-200 ${
                b.key === biz.key ? "bg-paper text-ink" : "text-paper/70 hover:text-paper"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        <p className="t-label mt-12 text-paper/60">2. Tap what a customer might ask</p>
        <ul className="mt-4 flex flex-col gap-3">
          {biz.scripts.map((s, i) => {
            const done = used.includes(i);
            return (
              <li key={s.q}>
                <button
                  onClick={() => ask(i)}
                  disabled={typing || done}
                  className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-grey-700 px-5 py-4 text-left text-[16px] transition-colors duration-200 hover:border-paper disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-grey-700"
                >
                  <span>“{s.q}”</span>
                  <span aria-hidden className="text-paper/50 transition-transform duration-300 group-hover:translate-x-1">
                    {done ? "✓" : "→"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-grey-700 pt-6 font-mono text-[12px] uppercase tracking-[0.06em] max-lg:mt-12">
          <div>
            <dt className="text-paper/50">Replied in</dt>
            <dd className="mt-1 text-[18px] text-paper" aria-live="polite">{stats.replied}</dd>
          </div>
          <div>
            <dt className="text-paper/50">Booked at</dt>
            <dd className="mt-1 text-[18px] text-paper" aria-live="polite">{stats.booked}</dd>
          </div>
          <div>
            <dt className="text-paper/50">You were</dt>
            <dd className="mt-1 text-[18px] text-paper">Asleep</dd>
          </div>
        </dl>
      </div>

      {/* Phone */}
      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        <div className="relative mx-auto flex justify-center rounded-[var(--radius-frame)] bg-grey-900 px-4 py-10 sm:py-14">
          <div className="relative w-full max-w-[340px] rounded-[48px] bg-black p-[10px] shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
            <div className="relative overflow-hidden rounded-[38px] bg-paper text-ink">
              {/* status bar */}
              <div className="flex items-center justify-between px-6 pb-2 pt-3 font-mono text-[11px]">
                <span>{fmt(minute.current)}</span>
                <span className="h-5 w-20 rounded-full bg-black" aria-hidden />
                <span aria-hidden className="flex items-end gap-[2px]"><i className="block h-[5px] w-[3px] rounded-[1px] bg-ink" /><i className="block h-[7px] w-[3px] rounded-[1px] bg-ink" /><i className="block h-[9px] w-[3px] rounded-[1px] bg-ink" /></span>
              </div>
              {/* chat header */}
              <div className="flex items-center gap-3 border-b border-grey-200 px-4 pb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink">
                  <LogoMark className="h-5 w-5 text-paper" title="" />
                </span>
                <div className="leading-tight">
                  <p className="text-[14px] font-medium">{biz.name}</p>
                  <p className="text-[12px] text-grey-500">AI assistant · replies in seconds</p>
                </div>
              </div>
              {/* messages */}
              <div
                ref={scroller}
                className="h-[420px] space-y-2 overflow-y-auto px-3 py-4 [scrollbar-width:none]"
                role="log"
                aria-live="polite"
                aria-label={`Example conversation with ${biz.name}`}
              >
                {msgs.length === 0 && !typing && (
                  <p className="mt-40 text-center text-[13px] text-grey-500">Tap a question on the left to start.</p>
                )}
                {msgs.map((m) => (
                  <div key={m.id} className={`flex ${m.from === "us" ? "justify-end" : "justify-start"} animate-[bubble_.35s_var(--ease-out-expo)]`}>
                    <div className="max-w-[82%]">
                      <div
                        className={`rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug ${
                          m.from === "us" ? "rounded-br-md bg-ink text-paper" : "rounded-bl-md bg-grey-200 text-ink"
                        }`}
                      >
                        {m.text}
                      </div>
                      {m.card && (
                        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-grey-200 bg-white px-3.5 py-3">
                          <IconCalendarCheck className="h-5 w-5 text-ink" />
                          <div className="flex-1 leading-tight">
                            <p className="text-[13px] font-medium">{m.card.title}</p>
                            <p className="text-[12px] text-grey-500">{m.card.detail}</p>
                          </div>
                          {/* the only gold in this section */}
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[13px] font-bold text-ink" aria-label="confirmed">
                            ✓
                          </span>
                        </div>
                      )}
                      {m.handover && (
                        <p className="mt-1.5 text-right font-mono text-[10px] uppercase tracking-[0.06em] text-grey-500">Passed to the owner</p>
                      )}
                      <p className={`mt-1 font-mono text-[10px] text-grey-500 ${m.from === "us" ? "text-right" : ""}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-end" aria-label="Assistant is typing">
                    <div className="flex gap-1 rounded-2xl rounded-br-md bg-ink px-4 py-3.5">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="typing-dot h-1.5 w-1.5 rounded-full bg-paper" style={{ animationDelay: `${d * 140}ms` }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* composer */}
              <div className="flex items-center gap-2 border-t border-grey-200 px-3 py-3" aria-hidden>
                <div className="h-9 flex-1 rounded-full bg-grey-200/70 px-4 py-2 text-[13px] text-grey-500">Message</div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-paper/50">An example conversation. Your assistant would use your real prices, times and rules.</p>
      </div>
    </div>
  );
}
