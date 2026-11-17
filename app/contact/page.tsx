import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LeadForm, { type Need } from "@/components/contact/LeadForm";
import StickyCta from "@/components/contact/StickyCta";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQ, { type QA } from "@/components/ui/FAQ";
import { RevealText, FadeUp } from "@/components/motion/Reveal";
import { IconMessageMissed, IconPhoneFast, IconBrowserLeave } from "@/components/icons";
import { site } from "@/lib/site";
import { videos, quotes } from "@/lib/proof";

export const metadata: Metadata = {
  title: "Get your free plan",
  description:
    "Free 20-minute call. Fixed price before we start. We reply within 1 working day. Websites people trust and AI assistants that answer your customers day and night.",
};

/* ---------- Message match: the headline repeats the promise the ad made ---------- */
type Variant = "assistant" | "website" | "both";
const HERO: Record<Variant, { label: string; h: string; sub: string; need: Need }> = {
  assistant: {
    label: "AI assistants for your business",
    h: "Never miss another customer message. Even at midnight.",
    sub: "We set up an assistant that replies to your customers on WhatsApp, Instagram and your website in seconds. It answers questions, books appointments and only bothers you when it matters.",
    need: "assistant",
  },
  website: {
    label: "Websites for your business",
    h: "A website that makes people pick you, not the place down the road.",
    sub: "Your website is your first impression. We build ones that look as good as your business really is, work perfectly on phones, and turn visitors into bookings and calls.",
    need: "website",
  },
  both: {
    label: "Websites & AI assistants for your business",
    h: "Stop losing customers to slow replies and an old website.",
    sub: "We build websites people trust and assistants that answer your customers day and night. You get more bookings without spending your evenings on your phone.",
    need: "both",
  },
};

const GET: Record<"assistant" | "website", string[]> = {
  assistant: [
    "An assistant trained on your prices, services, opening hours and rules",
    "Replies on WhatsApp, Instagram, Facebook and your website",
    "Takes bookings straight into your calendar",
    "Hands over to you (or your team) when a question needs a human",
    "A weekly summary: who messaged, what they asked, what got booked",
    "We keep improving it as we see how your customers talk",
  ],
  website: [
    "A website designed around how your customers actually decide",
    "Fast and easy to use on phones, where most of your visitors are",
    "Clear prices, services and a book / call / message button on every page",
    "Show up properly on Google for your area and services",
    "Easy for you to update yourself: prices, photos, opening hours",
    "Hosting, security and updates taken care of",
  ],
};

const FAQS: QA[] = [
  { q: "Is the call actually free?", a: "Yes. 20 minutes, no card, no commitment. If we can't help, we'll tell you." },
  { q: "Will you try to hard-sell me?", a: "No. You'll get a plan and a price. What you do with it is up to you." },
  { q: "I'm not good with technology.", a: "That's fine. We do the setup. You'll only need to know a couple of things, and we'll show you." },
  { q: "Will the assistant say something wrong to my customers?", a: "It only answers using the information you approve. When it's not sure, it passes the conversation to you instead of guessing." },
  { q: "Do I need a new website to get an assistant?", a: "No. It can work on your existing site, WhatsApp and Instagram." },
  { q: "How much does it cost?", a: "It depends on what you need, which is why we give you a fixed price after the call." },
  { q: "How quickly can it be ready?", a: "Assistants: usually 1–2 weeks. Websites: usually 2–4 weeks." },
];

function Tick({ dark }: { dark?: boolean }) {
  return (
    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${dark ? "bg-paper text-ink" : "bg-ink text-paper"}`} aria-hidden>
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ for?: string }> }) {
  const sp = await searchParams;
  const variant: Variant = sp.for === "assistant" || sp.for === "website" ? sp.for : "both";
  const hero = HERO[variant];
  const lists: ("assistant" | "website")[] = variant === "both" ? ["website", "assistant"] : [variant];
  const proofVideo = variant === "website" ? videos[1] : videos[0];

  return (
    <>
      <Nav minimal dark />
      <main>
        {/* 1. HERO (ink) + form above the fold */}
        <section className="on-ink relative bg-ink pb-16 pt-[96px] text-paper sm:pb-20 lg:pt-[128px] xl:pb-28">
          <div className="container-pdn grid grid-cols-12 gap-x-6 gap-y-10 lg:gap-y-14">
            <div className="col-span-12 flex flex-col xl:col-span-6 xl:pt-6">
              <p className="t-label text-paper/60">{hero.label}</p>
              <RevealText as="h1" immediate delay={0.1} className="t-h1 balance mt-5 max-w-[17ch] lg:mt-6">
                {hero.h}
              </RevealText>
              <p className="t-body-lg mt-6 max-w-[46ch] text-paper/75 pretty lg:mt-8">{hero.sub}</p>
              <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[15px] lg:mt-10">
                {["Free 20-minute call", "Fixed price before we start", "Reply within 1 working day"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 whitespace-nowrap">
                    <Tick dark />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              {/* TODO [PROOF NEEDED]: "Trusted by X businesses" + 4–6 greyscale client logos */}
            </div>
            <div className="col-span-12 md:col-span-10 lg:col-span-8 xl:col-span-5 xl:col-start-8" id="get-plan">
              <LeadForm defaultNeed={hero.need} formId="lead-hero" />
            </div>
          </div>
        </section>

        {/* 2. COST OF DOING NOTHING */}
        <section className="section-pad">
          <div className="container-pdn">
            <SectionHeader
              label="The cost of doing nothing"
              title="Every slow reply is a customer you paid to get, then lost."
              aside="You already spend money and time getting people to notice your business. Then they message, and wait. Or they open your website and it doesn't work on their phone. So they go to someone else, and you never even hear about it."
            />
            <FadeUp stagger={0.08} className="mt-16 grid gap-4 md:grid-cols-3 lg:mt-20 lg:gap-5">
              {[
                { Icon: IconMessageMissed, t: "They message when you're busy.", b: "You're in a meeting, on a call or with a client. Their message sits there, unanswered." },
                { Icon: IconPhoneFast, t: "They don't wait.", b: "Most people contact two or three businesses and go with whoever replies first." },
                { Icon: IconBrowserLeave, t: "They judge in seconds.", b: "An old, slow or broken website makes a great business look closed." },
              ].map(({ Icon, t, b }) => (
                <div key={t} className="rounded-[var(--radius-card)] border border-grey-200 bg-white p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-grey-200">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="t-h3 mt-10">{t}</p>
                  <p className="mt-3 text-grey-700 pretty">{b}</p>
                </div>
              ))}
            </FadeUp>
          </div>
        </section>

        {/* 3. WHAT YOU GET */}
        <section className="section-pad pt-0 lg:pt-0">
          <div className="container-pdn">
            <SectionHeader label="What you get" title="Here's what we'll set up for you." aside="Fixed price, agreed before we start." />
            <div className={`mt-16 grid gap-5 lg:mt-20 ${lists.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-[minmax(0,48rem)]"}`}>
              {lists.map((k) => (
                <FadeUp key={k} className={`rounded-[var(--radius-frame)] p-8 lg:p-12 ${k === "assistant" ? "on-ink bg-ink text-paper" : "border border-grey-200 bg-white"}`}>
                  <p className={`t-label ${k === "assistant" ? "text-paper/60" : "text-grey-500"}`}>{k === "assistant" ? "AI Assistant" : "Website"}</p>
                  <ul className="mt-8 space-y-5">
                    {GET[k].map((item) => (
                      <li key={item} className="flex gap-4 text-[17px]">
                        <Tick dark={k === "assistant"} />
                        <span className="pretty">{item}</span>
                      </li>
                    ))}
                  </ul>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS (compact) */}
        <section className="section-pad pt-0 lg:pt-0">
          <div className="container-pdn">
            <SectionHeader label="How it works" title="Three steps. You only have to do the first one." />
            <FadeUp as="ol" stagger={0.08} className="mt-16 grid gap-10 md:grid-cols-3 lg:mt-20">
              {[
                ["01", "Fill in the form", "1 minute. Tell us a little about your business."],
                ["02", "Free 20-minute call", "We look at where you're losing customers and give you a plan with a fixed price. No obligation."],
                ["03", "We build it, you check it, it goes live", "Usually 1–4 weeks depending on what you need."],
              ].map(([n, t, b]) => (
                <li key={n} className="border-t border-ink pt-6">
                  <span className="t-label text-grey-500">{n}</span>
                  <p className="t-h3 mt-4">{t}</p>
                  <p className="mt-3 text-grey-700 pretty">{b}</p>
                </li>
              ))}
            </FadeUp>
          </div>
        </section>

        {/* 5. PROOF (ink) */}
        <section className="on-ink section-pad bg-ink text-paper">
          <div className="container-pdn">
            <SectionHeader dark label="Proof" title="Businesses like yours, a few weeks later." />
            <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-12">
              <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-grey-900 lg:col-span-8">
                <Image src={proofVideo.poster} alt="" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
                <span className="absolute left-5 top-5 t-label rounded-full border border-paper/60 px-2 py-1 text-[10px] text-paper/80">Placeholder · client video coming soon</span>
              </div>
              <figure className="flex flex-col justify-between rounded-[var(--radius-card)] border border-grey-700 p-8 lg:col-span-4">
                <span className="t-label w-fit rounded-full border border-paper/60 px-2 py-1 text-[10px] text-paper/80">Placeholder</span>
                <blockquote className="t-h3 balance mt-8">“{quotes[0].quote}”</blockquote>
                <figcaption className="mt-8 text-sm text-paper/70">
                  <span className="block font-medium text-paper">{quotes[0].name}</span>
                  {quotes[0].business}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 6. WHAT HAPPENS NEXT + 7. RISK REVERSAL */}
        <section className="section-pad">
          <div className="container-pdn grid grid-cols-12 gap-x-6 gap-y-16">
            <div className="col-span-12 lg:col-span-7 xl:col-span-6">
              <p className="t-label text-grey-500">What happens next</p>
              <RevealText as="h2" className="t-h2 balance mt-6">No mystery. Here&apos;s exactly what happens after you hit the button.</RevealText>
              <FadeUp as="ol" stagger={0.06} className="relative mt-12 space-y-8 border-l border-ink pl-8">
                {[
                  "You'll get a message from a real person at PDN within one working day, on whichever channel you picked.",
                  "We'll find a 20-minute slot that suits you.",
                  "On the call, we'll look at your current setup and show you where customers are slipping through.",
                  "You get a written plan and a fixed price. Take your time. There's no pressure to decide on the call.",
                ].map((t, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[41px] top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-ink bg-paper font-mono text-[10px]">
                      {i + 1}
                    </span>
                    <p className="t-body-lg pretty">{t}</p>
                  </li>
                ))}
              </FadeUp>
            </div>
            <div className="col-span-12 flex flex-col justify-end lg:col-span-5 lg:col-start-8 xl:col-span-5">
              <div className="rounded-[var(--radius-frame)] border border-grey-200 bg-white p-8 lg:p-12">
                <p className="t-label text-grey-500">Our promise</p>
                <p className="t-h2 balance mt-6">You don&apos;t pay for something you haven&apos;t seen.</p>
                <p className="mt-6 text-grey-700 pretty">
                  {/* TODO [CONFIRM WITH BOSS]: exact guarantee (deposit, revision rounds, refund terms, free trial) */}
                  You see your website or assistant before it goes live, and we keep adjusting it until you&apos;re happy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="section-pad pt-0 lg:pt-0">
          <div className="container-pdn grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12">
              <SectionHeader label="Fair questions" title="Before you fill in the form." />
            </div>
            <div className="col-span-12 lg:col-span-8 lg:col-start-5">
              <FAQ items={FAQS} />
            </div>
          </div>
        </section>

        {/* 9. FORM AGAIN + DIRECT CONTACT */}
        <section className="on-ink section-pad bg-ink text-paper">
          <div className="container-pdn grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 xl:col-span-6">
              <RevealText as="h2" className="t-h1 balance max-w-[16ch]">Your next customer is messaging someone right now. Let&apos;s make it you.</RevealText>
              <div className="mt-12 border-t border-grey-700 pt-8">
                <p className="t-label text-paper/60">Or just talk to us</p>
                <ul className="mt-6 space-y-3 text-[17px]">
                  <li>WhatsApp: <a className="underline decoration-1 underline-offset-4 hover:text-gold" href={site.whatsappHref}>{site.whatsappDisplay}</a></li>
                  <li>Call: <a className="underline decoration-1 underline-offset-4 hover:text-gold" href={site.phoneHref}>{site.phoneDisplay}</a></li>
                  <li>Email: <a className="underline decoration-1 underline-offset-4 hover:text-gold" href={`mailto:${site.email}`}>{site.email}</a></li>
                </ul>
                <p className="mt-6 text-sm text-paper/60">
                  Office hours: {site.hours}. Outside those, our own assistant will answer. (Yes, we use what we sell.)
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-10 lg:col-span-8 xl:col-span-5 xl:col-start-8">
              <LeadForm defaultNeed={hero.need} formId="lead-bottom" />
            </div>
          </div>
        </section>
      </main>
      <Footer showCta={false} />
      <StickyCta />
    </>
  );
}
