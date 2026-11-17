import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Industries from "@/components/home/Industries";
import WebsiteHero from "@/components/websites/WebsiteHero";
import FiveSeconds from "@/components/websites/FiveSeconds";
import DecideTabs from "@/components/websites/DecideTabs";
import EditDemo from "@/components/websites/EditDemo";
import SearchDemo from "@/components/websites/SearchDemo";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import FAQ, { type QA } from "@/components/ui/FAQ";
import { FadeUp, RevealText } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Websites",
  alternates: { canonical: "/websites" },
  description:
    "Websites that make people pick you: clear prices and services, one tap to book or call, fast on every phone, easy for you to update, and set up to be found on Google.",
};

const INCLUDED = [
  "A website designed around how your customers actually decide",
  "Fast and easy to use on phones, where most of your visitors are",
  "Clear prices, services and a book / call / WhatsApp button on every page",
  "Set up to show up on Google for your area and services",
  "Easy for you to update yourself: prices, photos, opening hours",
  "Hosting, security and updates taken care of",
];

const FAQS: QA[] = [
  {
    q: "I already have a website. Do I need a new one?",
    a: "Not always. On the free call we look at your current site honestly. Sometimes a few fixes are enough. If it's holding you back, we'll show you exactly why.",
  },
  {
    q: "Can I really update it myself?",
    a: "Yes. Prices, photos, opening hours and notices, from your phone or laptop. We show you how, and we're a message away if you get stuck.",
  },
  {
    // TODO [CONFIRM WITH BOSS]: booking + payment integrations offered
    q: "Can customers book or pay on the website?",
    a: "Yes. Bookings can go straight into your calendar, and we can add online payments. Tell us how you take bookings today and we'll fit around it.",
  },
  {
    // TODO [CONFIRM WITH BOSS]: ownership terms
    q: "Will I own my website?",
    a: "Yes. Your domain, your content and your website are yours.",
  },
  {
    q: "How long does it take?",
    a: "Usually 2–4 weeks. We give you the exact date before we start, and you see the site before it goes live.",
  },
  {
    // TODO [CONFIRM WITH BOSS]: pricing model
    q: "How much does it cost?",
    a: "It depends on how many pages and features you need. After a free call you get a fixed price, agreed before we start. No surprises.",
  },
  {
    q: "What about hosting and security?",
    a: "We take care of hosting, security updates and backups, so you never have to think about it.",
  },
];

export default function WebsitesPage() {
  return (
    <>
      <Nav />
      <main>
        <WebsiteHero />
        <div className="h-16 lg:h-24" />
        <Industries />
        <FiveSeconds />
        <DecideTabs />
        <EditDemo />
        <SearchDemo />

        {/* 05 Add an assistant */}
        <section className="pb-24 lg:pb-32">
          <div className="container-pdn">
            <FadeUp>
              <Link
                href="/ai-assistants"
                className="group on-ink grid overflow-hidden rounded-[var(--radius-frame)] bg-ink text-paper md:grid-cols-2"
              >
                <div className="flex flex-col justify-between gap-10 p-8 sm:p-12 lg:p-16">
                  <div>
                    <p className="t-label text-paper/60">05 · Works even better with</p>
                    <p className="t-h1 balance mt-8">Your website brings them in. An assistant answers them.</p>
                    <p className="t-body-lg mt-6 max-w-[40ch] text-paper/70 pretty">
                      Add an AI assistant to your website and WhatsApp, and every visitor gets an answer in seconds, even at 2am.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-3 font-medium">
                    See AI assistants
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
                <div data-parallax className="relative min-h-[280px] overflow-hidden">
                  <Image src="/images/photos/door-assistant.jpg" alt="A business owner asleep on his sofa after work while his phone keeps answering messages" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                </div>
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* 06 Getting started */}
        <section className="section-pad pt-0 lg:pt-0">
          <div className="container-pdn">
            <SectionHeader
              index="06"
              label="Getting started"
              title="Live in 2–4 weeks. You'll know the date before we start."
              aside="You don't need to know anything about websites. Tell us about your business and your customers; we handle the rest."
            />
            <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 lg:mt-20">
              <FadeUp as="ol" stagger={0.08} className="col-span-12 grid gap-10 md:grid-cols-3 lg:col-span-7 lg:grid-cols-1 lg:gap-0">
                {[
                  ["01", "We learn your business", "A short call about what you sell, who buys it and what they ask before buying. Send us your logo, prices and photos, or we'll help you get them."],
                  ["02", "We design and build it", "You see the website before it goes live, and we keep adjusting it until you're happy with every page."],
                  ["03", "It goes live", "We set it up on Google, show you how to update it, and keep it fast and secure from then on."],
                ].map(([n, t, b]) => (
                  <li key={n} className="border-t border-ink pt-6 lg:grid lg:grid-cols-[4rem_1fr] lg:gap-6 lg:py-8">
                    <span className="t-label text-grey-500">{n}</span>
                    <div>
                      <p className="t-h3 mt-4 lg:mt-0">{t}</p>
                      <p className="mt-3 max-w-[46ch] text-grey-700 pretty">{b}</p>
                    </div>
                  </li>
                ))}
              </FadeUp>
              <FadeUp className="col-span-12 lg:col-span-5">
                <div className="on-ink rounded-[var(--radius-frame)] bg-ink p-8 text-paper lg:p-10">
                  <p className="t-label text-paper/60">What&apos;s included</p>
                  <ul className="mt-8 space-y-5">
                    {INCLUDED.map((item) => (
                      <li key={item} className="flex gap-4">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-paper text-ink" aria-hidden>
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12.5l4.5 4.5L19 7.5" />
                          </svg>
                        </span>
                        <span className="pretty">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-sm text-paper/60">Fixed price, agreed before we start.</p>
                  <div className="mt-8">
                    <Button href="/contact?for=website">Get your free plan</Button>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 07 FAQ */}
        <section className="section-pad pt-0 lg:pt-0">
          <div className="container-pdn grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12">
              <SectionHeader index="07" label="Fair questions" title="What people ask before getting a website." />
            </div>
            <div className="col-span-12 lg:col-span-8 lg:col-start-5">
              <FAQ items={FAQS} />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="on-ink bg-ink text-paper">
          <div className="container-pdn py-32 lg:py-44">
            <p className="t-label text-paper/60">Ready when you are</p>
            <RevealText as="h2" className="t-display balance mt-8 max-w-[16ch]">
              Let&apos;s make your website bring in customers.
            </RevealText>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Button href="/contact?for=website">Book a free call</Button>
              <p className="text-sm text-paper/60">Free, 20 minutes. We&apos;ll look at what you have and tell you honestly what would help.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer showCta={false} />
    </>
  );
}
