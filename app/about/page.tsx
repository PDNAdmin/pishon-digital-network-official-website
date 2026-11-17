import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Industries from "@/components/home/Industries";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import RiverLine from "@/components/motion/RiverLine";
import { FadeUp, RevealText } from "@/components/motion/Reveal";
import { LogoMark } from "@/components/Logo";
import PlainToggle from "@/components/about/PlainToggle";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  description:
    "Pishon Digital Network is a small team that builds websites and AI assistants for businesses that serve customers. You talk directly to the people doing the work.",
};

// TODO [CONFIRM WITH BOSS]: these promises (and any guarantee wording)
const PROMISES = [
  { t: "A fixed price, agreed before we start.", b: "No surprise invoices. If something changes, we talk about it first." },
  { t: "You see everything before it goes live.", b: "Every page, every answer your assistant gives. Nothing launches until you're happy." },
  { t: "We give you a date, and we keep it.", b: "You'll know when it's going live before we start." },
  { t: "If we don't know, we say so.", b: "We'd rather tell you something won't work than sell it to you." },
  { t: "We don't disappear after launch.", b: "We keep your website fast and secure, and keep improving your assistant as we learn how your customers talk." },
];

// TODO [REAL PHOTOS + NAMES]: replace with the real team. Never use generated "team" photos.
const TEAM = [
  { name: "Team member name", role: "Founder · Role" },
  { name: "Team member name", role: "Co-founder · Role" },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-[104px] lg:pt-[136px]">
          <div className="container-pdn">
            <p className="t-label mb-6 text-grey-500 lg:mb-8">About</p>
            <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
              <RevealText as="h1" immediate delay={0.1} className="t-hero balance col-span-12 lg:col-span-9">
                We help good businesses stop losing customers in the gaps.
              </RevealText>
              <FadeUp className="col-span-12 lg:col-span-3" delay={0.4}>
                <p className="t-body-lg pretty text-grey-700">
                  Pishon Digital Network is a small team that builds websites and AI assistants for businesses that serve
                  customers. You talk directly to the people doing the work.
                </p>
              </FadeUp>
            </div>
          </div>
          <RiverLine variant="a" height={200} className="mt-10 lg:mt-14" />
        </section>

        {/* 01 Why we exist */}
        <section className="section-pad pt-16 lg:pt-20">
          <div className="container-pdn grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-3">
              <div className="dotted-rule mb-6" />
              <p className="t-label text-grey-500">
                <span className="mr-3">01</span>Why we exist
              </p>
            </div>
            <div className="col-span-12 lg:col-span-8 lg:col-start-5">
              <RevealText as="h2" className="t-h1 balance">
                Most businesses don&apos;t have a marketing problem. They have a gap problem.
              </RevealText>
              <FadeUp stagger={0.08} className="t-body-lg mt-10 space-y-6 text-grey-700">
                <p className="pretty">
                  The message answered three hours late. The website that makes a great business look closed. The call nobody
                  picked up at 9pm. Good businesses lose customers in those gaps every day, and most never find out.
                </p>
                <p className="pretty">
                  We started PDN to close them. A website that earns trust in seconds, and an assistant that answers, books and
                  follows up while you get on with the actual work.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 02 The name */}
        {/* TODO [CONFIRM WITH BOSS]: is this what the name means to the founders? */}
        <section className="on-ink overflow-hidden bg-ink text-paper">
          <div className="container-pdn pt-28 lg:pt-40">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="col-span-12 lg:col-span-3">
                <div className="dotted-rule mb-6 opacity-40" />
                <p className="t-label text-paper/60">
                  <span className="mr-3">02</span>The name
                </p>
              </div>
              <div className="col-span-12 lg:col-span-8 lg:col-start-5">
                <div className="flex items-center gap-5">
                  <LogoMark className="h-14 w-14 text-gold" />
                  <span className="t-label text-paper/60">Pishon · Genesis 2:11–12</span>
                </div>
                <RevealText as="h2" className="t-h1 balance mt-10">
                  Pishon is the river in Genesis that winds around a land of gold.
                </RevealText>
                <FadeUp className="t-body-lg mt-10 max-w-[44ch] text-paper/70 pretty">
                  <p>
                    That&apos;s the job we want to do for your business: keep customers flowing to you, steadily, without you
                    having to chase every one. It&apos;s why a single gold line runs through this website.
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
          <RiverLine variant="b" dark height={240} className="mt-16 mb-10 lg:mt-24" />
        </section>

        {/* 03 How we talk */}
        <section className="section-pad">
          <div className="container-pdn">
            <SectionHeader
              index="03"
              label="How we talk"
              title="No jargon. If you can't understand us, that's our fault."
              aside="You shouldn't need a dictionary to buy a website. Flip the switch and see the difference."
            />
            <div className="mt-16 lg:mt-20">
              <PlainToggle />
            </div>
          </div>
        </section>

        {/* 04 What we promise */}
        <section className="section-pad pt-0 lg:pt-0">
          <div className="container-pdn">
            <SectionHeader index="04" label="What we promise" title="Five things you can hold us to." />
            <FadeUp as="ol" stagger={0.07} className="mt-16 grid gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-5">
              {PROMISES.map((p, i) => (
                <li
                  data-tilt
                  key={p.t}
                  className={`group flex flex-col justify-between gap-12 rounded-[var(--radius-card)] p-8 transition-colors duration-300 ${i === 0 ? "on-ink bg-ink text-paper lg:row-span-2" : "border border-grey-200 bg-white hover:border-ink"}`}
                >
                  <span className={`t-label ${i === 0 ? "text-paper/60" : "text-grey-500"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className={`balance ${i === 0 ? "t-h1" : "t-h3"}`}>{p.t}</p>
                    <p className={`mt-4 pretty ${i === 0 ? "t-body-lg text-paper/70" : "text-grey-700"}`}>{p.b}</p>
                  </div>
                </li>
              ))}
            </FadeUp>
          </div>
        </section>

        {/* 05 The team */}
        <section className="section-pad pt-0 lg:pt-0">
          <div className="container-pdn">
            <SectionHeader
              index="05"
              label="Who you'll talk to"
              title="The people on the call are the people building it."
              aside="No account managers passing messages along. When you have a question, you ask the person who can answer it."
            />
            <FadeUp stagger={0.1} className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:w-2/3">
              {TEAM.map((m, i) => (
                <figure key={i}>
                  <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-grey-200">
                    <LogoMark className="h-16 w-16 text-grey-500/40" />
                    <span className="t-label absolute right-4 top-4 rounded-full border border-grey-500 px-2 py-1 text-[10px] text-grey-500">Placeholder</span>
                    <span className="absolute bottom-4 left-4 text-sm text-grey-500">Real photo goes here</span>
                  </div>
                  <figcaption className="mt-5">
                    <p className="t-h3">{m.name}</p>
                    <p className="t-label mt-2 text-grey-500">{m.role}</p>
                  </figcaption>
                </figure>
              ))}
            </FadeUp>
          </div>
        </section>

        {/* 06 Who we work with */}
        <section className="pb-24 lg:pb-32">
          <div className="container-pdn">
            <div className="dotted-rule mb-6" />
            <p className="t-label mb-10 text-grey-500">
              <span className="mr-3">06</span>Who we work with
            </p>
            <RevealText as="h2" className="t-h1 balance max-w-[22ch]">
              Any business that serves customers, from the corner salon to the law firm.
            </RevealText>
          </div>
          <Industries />
        </section>

        {/* Final CTA */}
        <section className="on-ink bg-ink text-paper">
          <div className="container-pdn py-32 lg:py-44">
            <p className="t-label text-paper/60">Say hello</p>
            <RevealText as="h2" className="t-display balance mt-8 max-w-[16ch]">
              Let&apos;s talk about your business.
            </RevealText>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Button href="/contact">Book a free call</Button>
              <p className="text-sm text-paper/60">Free, 20 minutes, with the people who&apos;d build it.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer showCta={false} />
    </>
  );
}
