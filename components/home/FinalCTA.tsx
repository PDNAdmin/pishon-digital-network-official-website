import Image from "next/image";
import Button from "@/components/ui/Button";
import { RevealText } from "@/components/motion/Reveal";

export default function FinalCTA() {
  return (
    <section className="on-ink relative overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0" aria-hidden>
        <Image src="/images/photos/final-cta-night.jpg" alt="" fill sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-linear-to-b from-ink via-ink/40 to-ink" />
      </div>
      <div className="container-pdn relative py-32 lg:py-48">
        <p className="t-label text-paper/60">Before you go</p>
        <RevealText as="h2" className="t-display balance mt-8 max-w-[15ch]">
          Your next customer is probably messaging someone right now.
        </RevealText>
        <p className="t-body-lg mt-8 max-w-[40ch] text-paper/75">Let&apos;s make sure it&apos;s you who answers.</p>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Button href="/contact">Book a free call</Button>
          <p className="text-sm text-paper/60">Free, 20 minutes, no obligation. We reply within one working day.</p>
        </div>
      </div>
    </section>
  );
}
