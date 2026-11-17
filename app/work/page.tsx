import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { FadeUp, RevealText } from "@/components/motion/Reveal";
import WorkGrid from "@/components/work/WorkGrid";
import Stories from "@/components/work/Stories";
import ExampleBuilds from "@/components/work/ExampleBuilds";

export const metadata: Metadata = {
  title: "Our work",
  alternates: { canonical: "/work" },
  description: "Websites and AI assistants we've built for businesses that serve customers, and what changed for them: more calls, more bookings, faster replies.",
};

const MEASURE = [
  { n: "01", t: "Calls and enquiries", b: "How many people contacted you from your website or messages, compared with before." },
  { n: "02", t: "Bookings made", b: "Appointments, viewings, reservations and orders that came through what we built." },
  { n: "03", t: "Reply time", b: "How long customers wait for an answer. With an assistant, it should be seconds." },
];

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-[104px] lg:pt-[136px]">
          <div className="container-pdn">
            <p className="t-label mb-6 text-grey-500 lg:mb-8">Our work</p>
            <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
              <RevealText as="h1" immediate delay={0.1} className="t-hero balance col-span-12 lg:col-span-8">
                Judged by one thing: did it bring in more customers?
              </RevealText>
              <FadeUp className="col-span-12 lg:col-span-4" delay={0.4}>
                <p className="t-body-lg pretty text-grey-700">
                  A good-looking website that nobody calls from is a failure. So we measure every project by what changed for the
                  business: more calls, more bookings, faster replies.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 01 Client projects */}
        <section className="section-pad">
          <div className="container-pdn">
            <div className="dotted-rule mb-6" />
            <p className="t-label mb-10 text-grey-500">
              <span className="mr-3">01</span>Client projects
            </p>
            <WorkGrid />
          </div>
        </section>

        {/* 02 Client stories */}
        <section className="on-ink section-pad bg-ink text-paper">
          <div className="container-pdn">
            <SectionHeader dark index="02" label="In their words" title="Hear it from the owners." aside="Short videos from the people we've built for: what was going wrong, and what changed." />
            <div className="mt-16 lg:mt-20">
              <Stories />
            </div>
          </div>
        </section>

        {/* 03 Example builds */}
        <section className="section-pad">
          <div className="container-pdn">
            <SectionHeader
              index="03"
              label="Try before you talk to us"
              title="See exactly how we build. Live, right here."
              aside="These are working examples we built to show what yours could do. Click into either one and use it like a customer would."
            />
            <div className="mt-16 lg:mt-20">
              <ExampleBuilds />
            </div>
          </div>
        </section>

        {/* 04 How we measure */}
        <section className="section-pad pt-0 lg:pt-0">
          <div className="container-pdn">
            <SectionHeader
              index="04"
              label="How we measure"
              title="We agree what success looks like before we start."
              aside="Then we check it together. No vanity numbers, no jargon: just whether more customers are reaching you."
            />
            {/* TODO [CONFIRM WITH BOSS]: do we promise a monthly results report? */}
            <FadeUp as="ol" stagger={0.08} className="mt-16 grid gap-4 md:grid-cols-3 lg:mt-20 lg:gap-5">
              {MEASURE.map((m) => (
                <li key={m.n} className="flex flex-col rounded-[var(--radius-card)] border border-grey-200 bg-white p-8">
                  <span className="t-label text-grey-500">{m.n}</span>
                  <p className="t-h2 mt-12">{m.t}</p>
                  <p className="mt-4 text-grey-700 pretty">{m.b}</p>
                </li>
              ))}
            </FadeUp>
          </div>
        </section>

        {/* Final CTA */}
        <section className="on-ink bg-ink text-paper">
          <div className="container-pdn py-32 lg:py-44">
            <p className="t-label text-paper/60">Your turn</p>
            <RevealText as="h2" className="t-display balance mt-8 max-w-[16ch]">
              Want your business to be our next result?
            </RevealText>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Button href="/contact">Book a free call</Button>
              <p className="text-sm text-paper/60">Free, 20 minutes. We&apos;ll tell you honestly what would bring you more customers.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer showCta={false} />
    </>
  );
}
