import SectionHeader from "@/components/ui/SectionHeader";
import FAQ, { type QA } from "@/components/ui/FAQ";

const items: QA[] = [
  {
    q: "Do you only work with small businesses?",
    a: "No. We work with solo professionals, growing brands and companies with several branches, from clinics and law firms to real estate agencies, hotels and stores. If your business serves customers, we can help.",
  },
  {
    q: "What exactly is an AI assistant?",
    a: "Think of it as a member of staff who lives in your WhatsApp, Instagram and website chat. It's trained on your business, so it can answer customers' questions, book appointments and take details any time of day. Anything it can't handle, it passes to you or your team.",
  },
  {
    q: "I'm not techy at all. Is that a problem?",
    a: "Not at all. Most of our clients aren't. You'll never have to touch code. We set everything up and show you the two or three things you'll actually use.",
  },
  {
    q: "Will the assistant sound like a robot?",
    a: "No. We write it to sound like your business: your prices, your rules, your way of talking. When a question is too tricky or personal, it hands over to you.",
  },
  {
    q: "I already have a website. Do I need a new one?",
    a: "Maybe not. Sometimes a few fixes make a big difference. We'll look at it on the call and tell you straight.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on what you need, but we always give you a fixed price before we start. No surprise bills.",
  },
  {
    q: "How long does it take?",
    a: "Most websites take 2–4 weeks. Most assistants are answering customers within 1–2 weeks.",
  },
  {
    q: "What if I don't like it?",
    // TODO [CONFIRM WITH BOSS]: revisions policy / guarantee
    a: "You see it and give feedback before anything goes live. We keep going until you're happy with it.",
  },
  {
    q: "What happens after launch?",
    a: "We don't disappear. You can message us when something needs changing, and we check in to see how it's working.",
  },
];

export default function Questions() {
  return (
    <section className="section-pad pt-0 lg:pt-0">
      <div className="container-pdn grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-12">
          <SectionHeader index="06" label="Fair questions" title="The things people usually ask us." />
        </div>
        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          <FAQ items={items} />
        </div>
      </div>
    </section>
  );
}
