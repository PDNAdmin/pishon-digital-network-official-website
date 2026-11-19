"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, type ComponentType, type SVGProps } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import MorphIcon from "@/components/motion/MorphIcon";
import { FadeUp } from "@/components/motion/Reveal";
import { IconMessageMissed, IconBrowserLeave, IconRepeatQuestions, IconMoonPhone } from "@/components/icons";

type Pain = {
  quote: string;
  body: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  img: string;
  alt: string;
  href: string;
};

const pains: Pain[] = [
  {
    quote: "“We miss new clients while we're busy serving paying ones.”",
    body: "You're in a meeting, on a viewing or with a customer. By the time you reply, they've gone with someone else.",
    Icon: IconMessageMissed,
    img: "/images/illustrations/pain-missed.png",
    alt: "Line drawing: hands braiding hair while a phone fills up with unread messages",
    href: "/contact?for=assistant",
  },
  {
    quote: "“People find our business online, then leave without contacting us.”",
    body: "Your website is their first impression of you. If it looks dated or doesn't work on their phone, they assume your service is the same.",
    Icon: IconBrowserLeave,
    img: "/images/illustrations/pain-leave.png",
    alt: "Line drawing: a thumb swiping away from a broken website on a phone",
    href: "/contact?for=website",
  },
  {
    quote: "“My team answers the same questions all day.”",
    body: "Prices, availability, “how do I book?” Hours of your team's time, every single week.",
    Icon: IconRepeatQuestions,
    img: "/images/illustrations/pain-repeat.png",
    alt: "Line drawing: a tired hand resting on a stack of identical question bubbles",
    href: "/contact?for=assistant",
  },
  {
    quote: "“Nobody replies to our customers after closing hours.”",
    body: "Evenings and weekends are when most people finally get round to contacting you. That's exactly when nobody's there.",
    Icon: IconMoonPhone,
    img: "/images/illustrations/pain-afterhours.png",
    alt: "Line drawing: a closed shop at night with a phone lit up on the counter",
    href: "/contact?for=assistant",
  },
];

function PainCard({ p, offset }: { p: Pain; offset: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={p.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      data-tilt
      className={`group flex flex-col rounded-[var(--radius-card)] border bg-white p-2 transition-colors duration-300 ${
        hover ? "border-ink" : "border-grey-200"
      } ${offset ? "lg:mt-16" : ""}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper">
        <Image
          src={p.img}
          alt={p.alt}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-4 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 pt-5">
        <div className="flex items-start justify-between gap-4">
          <p className="t-h3 balance">{p.quote}</p>
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
              hover ? "border-ink bg-ink text-paper" : "border-grey-200 text-ink"
            }`}
          >
            <MorphIcon Icon={p.Icon} active={hover} className="h-5 w-5" />
          </span>
        </div>
        <p className="mt-3 text-grey-700 pretty">{p.body}</p>
      </div>
    </Link>
  );
}

export default function SoundFamiliar() {
  return (
    <section className="section-pad pb-0 pt-8 lg:pb-0 lg:pt-12">
      <div className="container-pdn">
        <SectionHeader
          index="01"
          label="Sound familiar?"
          title="Good businesses lose customers in the gaps."
          aside="It's not that you're bad at what you do. You and your team just can't be everywhere at once. Does any of this describe your business?"
        />
        {/* make the voice clear: these are the visitor's problems, not ours */}
        <p className="t-label mt-16 text-grey-500 lg:mt-20">What business owners tell us, every week</p>
        <FadeUp stagger={0.08} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {pains.map((p, i) => (
            <PainCard key={p.quote} p={p} offset={i % 2 === 1} />
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
