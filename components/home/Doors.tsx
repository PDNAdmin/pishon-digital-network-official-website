"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import MorphIcon from "@/components/motion/MorphIcon";
import { FadeUp } from "@/components/motion/Reveal";
import { IconWebsite, IconAssistant } from "@/components/icons";

const doors = [
  {
    key: "website",
    label: "Websites",
    title: "A website people trust, that actually brings in work.",
    body: "A website that makes people trust you before they've even spoken to you. It tells them what you do, what it costs and how to get started, works fast on every phone, and you can update it yourself.",
    cta: "See websites",
    href: "/websites",
    img: "/images/photos/door-website.jpg",
    alt: "A man relaxing on his sofa at home, scrolling a business website on his phone",
    Icon: IconWebsite,
    dark: false,
  },
  {
    key: "assistant",
    label: "AI Assistants",
    title: "Someone who answers your customers, day and night.",
    body: "It replies to your customers on your website, WhatsApp and Instagram within seconds. It answers their questions, books appointments and viewings, follows up, and passes anything important to you or your team.",
    cta: "See AI assistants",
    href: "/ai-assistants",
    img: "/images/photos/door-assistant.jpg",
    alt: "A business owner asleep on his sofa after work while his phone keeps answering messages",
    Icon: IconAssistant,
    dark: true,
  },
];

function Door({ d }: { d: (typeof doors)[number] }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={d.href}
      data-cursor="View"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className={`group flex flex-col overflow-hidden rounded-[var(--radius-frame)] border ${
        d.dark ? "on-ink border-ink bg-ink text-paper" : "border-grey-200 bg-white text-ink"
      }`}
    >
      <div className="flex flex-1 flex-col p-8 lg:p-12">
        <p className={`t-label ${d.dark ? "text-paper/60" : "text-grey-500"}`}>{d.label}</p>
        <h3 className="t-h2 balance mt-6 max-w-[16ch]">{d.title}</h3>
        <p className={`mt-6 max-w-[46ch] pretty ${d.dark ? "text-paper/75" : "text-grey-700"}`}>{d.body}</p>
        <span className="mt-8 inline-flex items-center gap-3 font-medium">
          {d.cta}
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink">
            <MorphIcon Icon={d.Icon} active={hover} className="h-[18px] w-[18px]" />
          </span>
        </span>
      </div>
      <div className="relative mx-2 mb-2 aspect-[4/3] overflow-hidden rounded-[32px] sm:aspect-[16/10]">
        <Image
          src={d.img}
          alt={d.alt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
      </div>
    </Link>
  );
}

export default function Doors() {
  return (
    <section className="section-pad pt-0 lg:pt-0">
      <div className="container-pdn">
        <SectionHeader
          index="02"
          label="What we do"
          title="Two things we do. Both bring you more customers."
          aside="Some businesses need a better website first. Some need help answering customers. Many need both. On a free call, we'll tell you honestly which will make the biggest difference for you."
        />
        <FadeUp stagger={0.12} className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-2">
          {doors.map((d) => (
            <Door key={d.key} d={d} />
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
