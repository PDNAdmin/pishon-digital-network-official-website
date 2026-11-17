import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import ChatDemo from "./ChatDemo";
import BeforeAfter from "./BeforeAfter";
import { RevealText, FadeUp } from "@/components/motion/Reveal";

export default function SeeItWorking() {
  return (
    <section id="see-it-working" className="on-ink section-pad scroll-mt-0 bg-ink text-paper">
      <div className="container-pdn">
        <SectionHeader
          dark
          index="03"
          label="See it working"
          title="It's 11:40pm. A customer messages your business. Watch what happens."
          aside="This is an example of an AI assistant we'd set up for you. Pick a type of business, then tap a customer's question to see how it replies while you and your team are asleep."
        />

        <div className="mt-16 lg:mt-24">
          <ChatDemo />
        </div>

        <div className="mt-24 flex justify-start lg:mt-32">
          <Button href="/contact?for=assistant">Get an assistant like this</Button>
        </div>

        {/* Before / after */}
        <div className="mt-32 grid grid-cols-12 gap-x-6 gap-y-10 lg:mt-48">
          <div className="col-span-12 lg:col-span-4">
            <p className="t-label text-paper/60">And the website</p>
            <RevealText as="h3" className="t-h2 balance mt-6">
              Same business. Different first impression.
            </RevealText>
            <FadeUp>
              <p className="mt-6 max-w-[38ch] text-paper/75 pretty">
                Drag the handle. On the left, the kind of site that sends people elsewhere. On the right, one that makes
                them book.
              </p>
              <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.06em] text-paper/40">
                {/* TODO [PROOF NEEDED]: swap for a real client before/after + result */}
                Example design · real client results coming soon
              </p>
            </FadeUp>
          </div>
          <FadeUp className="col-span-12 lg:col-span-8">
            <BeforeAfter alt="a Lagos restaurant website" />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
