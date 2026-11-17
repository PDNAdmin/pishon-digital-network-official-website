import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Industries from "@/components/home/Industries";
import ChatDemo from "@/components/home/ChatDemo";
import AssistantHero from "@/components/assistant/AssistantHero";
import FeatureTabs from "@/components/assistant/FeatureTabs";
import Channels from "@/components/assistant/Channels";
import TrainedDemo from "@/components/assistant/TrainedDemo";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import FAQ, { type QA } from "@/components/ui/FAQ";
import { FadeUp, RevealText } from "@/components/motion/Reveal";
import { IconHandover, IconEdit, IconChartUp, IconShield } from "@/components/icons";

export const metadata: Metadata = {
  title: "AI Assistants",
  description:
    "An AI assistant that answers your customers on WhatsApp, Instagram and your website in seconds, books appointments, follows up and hands over to you when it matters. Day and night.",
};

const CONTROL = [
  { Icon: IconEdit, t: "You approve what it knows", b: "It answers from your prices, hours, services and rules. Nothing goes live until you've checked it." },
  { Icon: IconHandover, t: "You decide when it hands over", b: "Urgent, sensitive or high-value conversations come straight to you or the right person on your team." },
  { Icon: IconChartUp, t: "You see every conversation", b: "Read any chat, any time. Your morning summary shows what happened and who needs you." },
  { Icon: IconShield, t: "Your customers' details stay private", b: "Conversations are only used to run your assistant. You can switch it off or change it whenever you like." },
];

const TUESDAY = [
  {
    time: "8:15 AM",
    without: "You open WhatsApp to 23 unread messages. Three people have already booked with someone else.",
    with: "You open your summary: 9 enquiries answered, 3 viewings booked, 1 person to call back.",
  },
  {
    time: "1:30 PM",
    without: "You're in a meeting. Two new enquiries wait two hours for a reply.",
    with: "Both get answers in seconds, and one books a consultation for Thursday.",
  },
  {
    time: "6:45 PM",
    without: "Your front desk goes home. Messages keep coming in, unanswered.",
    with: "Messages keep getting answered, politely and in your tone.",
  },
  {
    time: "11:40 PM",
    without: "A customer asks about prices. By the time you reply tomorrow, a competitor already has.",
    with: "They get the price, a photo and a viewing booked for Saturday.",
  },
];

const INCLUDED = [
  "An assistant trained on your prices, services, opening hours and rules",
  "Replies on WhatsApp, Instagram, Facebook and your website",
  "Bookings straight into your calendar",
  "Handover to you or your team when a person is needed",
  "A morning summary of every conversation",
  "Ongoing improvements as we see how your customers talk",
];

const FAQS: QA[] = [
  {
    q: "Will my customers know they're talking to an AI?",
    a: "Yes. It introduces itself as your business's assistant, and anyone can ask for a person at any time. Customers mostly care that they get a fast, correct answer.",
  },
  {
    q: "What if it gets something wrong?",
    a: "It only answers from information you've approved. If it isn't sure, it says so and passes the conversation to you instead of guessing. In the first weeks, we review conversations with you and fine-tune it.",
  },
  {
    q: "Can it use my existing WhatsApp number?",
    a: "In most cases, yes. We connect it through WhatsApp's official business tools, and we'll walk you through any changes on the call.",
  },
  {
    // TODO [CONFIRM WITH BOSS]: languages offered
    q: "What languages can it reply in?",
    a: "English and Nigerian Pidgin out of the box. Ask us about other languages your customers use.",
  },
  {
    // TODO [CONFIRM WITH BOSS]: pricing model (setup + monthly?)
    q: "How much does it cost?",
    a: "It depends on how many channels and conversations you have. After a free call, we give you a fixed price. No surprises.",
  },
  {
    q: "How long does it take to set up?",
    a: "Most assistants are answering customers within 1–2 weeks. You'll spend about an hour with us; we do the rest.",
  },
];

export default function AIAssistantsPage() {
  return (
    <>
      <Nav />
      <main>
        <AssistantHero />
        <Industries />
        <div className="h-24 lg:h-32" />
        <FeatureTabs />
        <Channels />
        <TrainedDemo />

        {/* 04 You stay in control */}
        <section className="section-pad pt-0 lg:pt-0">
          <div className="container-pdn">
            <SectionHeader
              index="04"
              label="You stay in control"
              title="It works for you. Not the other way round."
              aside="An assistant should take work off your plate, not add worry. You set the rules, and you can see everything it does."
            />
            <FadeUp stagger={0.08} className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-5">
              {CONTROL.map(({ Icon, t, b }) => (
                <div key={t} data-tilt className="flex flex-col rounded-[var(--radius-card)] border border-grey-200 bg-white p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-grey-200">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="t-h3 mt-10 balance">{t}</p>
                  <p className="mt-3 text-grey-700 pretty">{b}</p>
                </div>
              ))}
            </FadeUp>
          </div>
        </section>

        {/* 05 Try it yourself */}
        <section className="on-ink section-pad bg-ink text-paper">
          <div className="container-pdn">
            <SectionHeader
              dark
              index="05"
              label="Try it yourself"
              title="Be the customer. Ask it something."
              aside="Pick a type of business and tap a question. This is the kind of reply your customers would get, any time of day."
            />
            <div className="mt-16 lg:mt-24">
              <ChatDemo />
            </div>
          </div>
        </section>

        {/* 06 A Tuesday, two ways */}
        <section className="section-pad">
          <div className="container-pdn">
            <SectionHeader index="06" label="Same day, two ways" title="A normal Tuesday, with and without an assistant." />
            <div className="mt-16 lg:mt-20">
              <div className="hidden grid-cols-12 gap-x-6 border-b border-ink pb-4 md:grid">
                <p className="t-label col-span-2 text-grey-500">Time</p>
                <p className="t-label col-span-5 text-grey-500">Without an assistant</p>
                <p className="t-label col-span-5 text-ink">With your PDN assistant</p>
              </div>
              <FadeUp as="ol" stagger={0.06}>
                {TUESDAY.map((r) => (
                  <li key={r.time} className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-grey-200 py-8">
                    <p className="t-h3 col-span-12 md:col-span-2">{r.time}</p>
                    <div className="col-span-12 md:col-span-5">
                      <p className="t-label mb-2 text-grey-500 md:hidden">Without</p>
                      <p className="t-body-lg text-grey-500 pretty">{r.without}</p>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <p className="t-label mb-2 text-ink md:hidden">With your assistant</p>
                      <p className="t-body-lg pretty">{r.with}</p>
                    </div>
                  </li>
                ))}
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 07 Setup + included */}
        <section className="section-pad pt-0 lg:pt-0">
          <div className="container-pdn">
            <SectionHeader
              index="07"
              label="Getting started"
              title="Live in 1–2 weeks. About an hour of your time."
              aside="You don't need to understand any of the technology. We set it up, test it with you, and keep improving it."
            />
            <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 lg:mt-20">
              <FadeUp as="ol" stagger={0.08} className="col-span-12 grid gap-10 md:grid-cols-3 lg:col-span-7 lg:grid-cols-1 lg:gap-0">
                {[
                  ["01", "We learn your business", "A short call, plus your price list, common questions and calendar. That's your hour."],
                  ["02", "We build and test it", "We train it on your information and test it with real questions. You check the answers before anything goes live."],
                  ["03", "It goes live", "On WhatsApp, your website and social pages. We watch the first weeks closely and fine-tune it with you."],
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
                  <div className="mt-10">
                    <Button href="/contact?for=assistant">Get your free plan</Button>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 08 FAQ */}
        <section className="section-pad pt-0 lg:pt-0">
          <div className="container-pdn grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12">
              <SectionHeader index="08" label="Fair questions" title="What people ask about AI assistants." />
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
              Want an assistant like this for your business?
            </RevealText>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Button href="/contact?for=assistant">Book a free call</Button>
              <p className="text-sm text-paper/60">Free, 20 minutes. We&apos;ll show you exactly what yours would do.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer showCta={false} />
    </>
  );
}
