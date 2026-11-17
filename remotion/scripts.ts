import type { Step } from "./components/ChatThread";
import { ASSETS } from "./theme";

/* ------------------------------------------------------------------
   Tiny timeline builder: write the conversation, get frame timings.
   Customer messages land, the assistant "types" for a moment, replies.
------------------------------------------------------------------- */
type Item =
  | { them: string; time?: string }
  | { us: string; time?: string; think?: number }
  | { card: [string, string] }
  | { image: string | null; caption?: string }
  | { chips: string[]; pick: number }
  | { note: string }
  | { wait: number };

export function build(items: Item[], start = 15): Step[] {
  const out: Step[] = [];
  let f = start;
  for (const it of items) {
    if ("wait" in it) {
      f += it.wait;
    } else if ("them" in it) {
      out.push({ t: "them", at: f, text: it.them, time: it.time });
      f += 30;
    } else if ("us" in it) {
      const think = it.think ?? Math.min(50, 22 + Math.round(it.us.length / 5));
      out.push({ t: "typing", at: f, until: f + think });
      f += think;
      out.push({ t: "us", at: f, text: it.us, time: it.time });
      f += 34 + Math.round(it.us.length / 4);
    } else if ("card" in it) {
      out.push({ t: "card", at: f, title: it.card[0], detail: it.card[1] });
      f += 40;
    } else if ("image" in it) {
      if (!it.image) continue; // asset not delivered yet: skip the photo message
      out.push({ t: "image", at: f, src: it.image, caption: it.caption });
      f += 40;
    } else if ("chips" in it) {
      const pickAt = f + 45;
      out.push({ t: "chips", at: f, options: it.chips, pick: it.pick, pickAt });
      f = pickAt + 12;
      out.push({ t: "them", at: f, text: it.chips[it.pick] });
      f += 30;
    } else if ("note" in it) {
      out.push({ t: "note", at: f, text: it.note });
      f += 45;
    }
  }
  return out;
}

export type PhoneScript = {
  business: string;
  time: string;
  steps: Step[];
};

/* 1. Answers questions (clinic) */
export const ANSWERS: PhoneScript = {
  business: "Bright Smile Dental",
  time: "11:41 PM",
  steps: build([
    { them: "Hi, how much is teeth whitening?", time: "11:41 PM" },
    { us: "Hi! Teeth whitening is ₦120,000 and takes about an hour. Your first consultation is free.", time: "11:41 PM" },
    { them: "Do you take HMO?" },
    { us: "Yes, we accept most major HMOs. Bring your card and we'll confirm your cover at the desk." },
    { them: "Are you open on Saturday?" },
    { us: "We are, from 9am to 3pm. Would you like me to book you in?" },
    { wait: 30 },
  ]),
};

/* 2. Books appointments (real estate, customer taps a slot) */
export const BOOKS: PhoneScript = {
  business: "Prime Homes Realty",
  time: "11:43 PM",
  steps: build([
    { them: "Is the 3-bedroom in Lekki still available?", time: "11:43 PM" },
    { us: ASSETS.chatMedia.propertyLiving ? "Yes, it is. It's a serviced 3-bedroom with 24-hour power, ₦4.5m a year. Here's the living room:" : "Yes, it is. It's a serviced 3-bedroom with 24-hour power, ₦4.5m a year." },
    { image: ASSETS.chatMedia.propertyLiving, caption: "3-bed · Lekki Phase 1" },
    { them: "Nice. Can I see it this weekend?" },
    { us: "Of course. Pick a time that suits you:" },
    { chips: ["Sat 11:00 AM", "Sat 2:00 PM", "Sun 1:00 PM"], pick: 0 },
    { us: "Done! You're booked for Saturday at 11am. I've sent the address to your WhatsApp." },
    { card: ["Viewing booked", "Sat · 11:00 AM · Lekki Phase 1"] },
    { wait: 40 },
  ]),
};

/* 3. Follows up (hotel, next morning) */
export const FOLLOWS: PhoneScript = {
  business: "The Palms Suites",
  time: "9:00 AM",
  steps: build([
    { them: "Do you have a room for Friday?", time: "Yesterday · 10:12 PM" },
    { us: "Yes, a deluxe room is free on Friday, ₦85,000 a night with breakfast. Shall I hold it?", time: "Yesterday · 10:12 PM" },
    { note: "Next morning · 9:00 AM" },
    { us: "Good morning! Just checking in about Friday. The deluxe room is still free, but we only have two left. Would you like me to reserve it?", time: "9:00 AM" },
    { chips: ["Yes, reserve it", "Not now"], pick: 0 },
    { us: "Lovely. It's reserved for Friday night. I've emailed your confirmation." },
    { card: ["Reservation confirmed", "Fri · Deluxe room · 1 night"] },
    { wait: 40 },
  ]),
};

/* 4. Hands over to you (law firm, urgent) */
export const HANDOVER: PhoneScript = {
  business: "Adeyemi & Co. Legal",
  time: "11:52 PM",
  steps: build([
    { them: "Good evening. I've just been served court papers for my shop. I don't know what to do.", time: "11:52 PM" },
    { us: "I'm sorry you're dealing with this. This sounds urgent, so I'm passing it straight to one of our lawyers." },
    { note: "Flagged urgent · sent to Barr. Adeyemi" },
    { us: "Barrister Adeyemi will call you before 9am tomorrow. Please keep the papers safe and don't sign anything until you've spoken." },
    { them: "Thank you so much." },
    { wait: 45 },
  ]),
};

export const TAB_SCRIPTS = { ANSWERS, BOOKS, FOLLOWS, HANDOVER };
