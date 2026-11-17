"use client";
import SectionHeader from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/motion/Reveal";
import ScenePlayer from "./ScenePlayer";
import { InboxScene, INBOX_DURATION } from "@/remotion/scenes/InboxScene";
import { IconWhatsappLike, IconWebsite, IconPhoneFast } from "@/components/icons";

const CHANNELS = [
  { Icon: IconWhatsappLike, name: "WhatsApp", note: "Where most of your customers already are" },
  { Icon: IconWebsite, name: "Your website", note: "A chat window on every page" },
  { Icon: IconPhoneFast, name: "Instagram & Facebook", note: "DMs and comments answered" },
];

export default function Channels() {
  return (
    <section className="section-pad">
      <div className="container-pdn">
        <SectionHeader
          index="02"
          label="Works where your customers are"
          title="WhatsApp, Instagram, your website. One assistant answers them all."
          aside="Your customers don't have to download anything or learn anything new. They message you the way they already do, and every conversation lands in one place for you and your team."
        />
        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 lg:mt-20">
          <FadeUp className="col-span-12 lg:col-span-8">
            <div className="overflow-hidden rounded-[var(--radius-frame)] border border-grey-200 bg-paper">
              <ScenePlayer
                component={InboxScene}
                duration={INBOX_DURATION}
                width={1600}
                height={1000}
                loop
                className="hidden sm:block"
                ariaLabel="Example inbox: messages arrive from WhatsApp, Instagram, the website, email and Facebook, and each one is answered within seconds."
              />
              <ScenePlayer
                component={InboxScene}
                inputProps={{ compact: true }}
                duration={INBOX_DURATION}
                width={760}
                height={1000}
                loop
                className="sm:hidden"
                ariaLabel="Example inbox: messages from every channel, each answered within seconds."
              />
            </div>
          </FadeUp>
          <FadeUp as="ul" stagger={0.08} className="col-span-12 flex flex-col justify-center gap-4 lg:col-span-4">
            {CHANNELS.map(({ Icon, name, note }) => (
              <li key={name} className="flex items-start gap-4 rounded-[var(--radius-card)] border border-grey-200 bg-white p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-grey-200">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="mt-1 text-sm text-grey-700">{note}</p>
                </div>
              </li>
            ))}
            <li className="px-2 text-sm text-grey-500">Also email and SMS, if you need them.</li>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
