# 03: Homepage Copy

> Site copy is in normal text. *Design/interaction notes are in italics under each section.*
> `[PROOF NEEDED]` = swap in real material. Never ship invented numbers or quotes.
> Colour reminder: black & white dominate. PDN colour (`#D4AF37`) only on the primary button, one highlighted word or underline per section, and small details.

---

## 0. Navigation

**PDN** · Websites · AI Assistants · Our work · About · **[Book a free call]**

*Logo left, links right, button in brand colour (the only coloured thing in the nav). Nav goes solid off-white with a hairline bottom border after 40px of scroll.*

---

## 1. Hero  *(revised 16 Nov 2026 after review)*

**Why it changed:** the old subhead didn't speak to anyone, the audience looked like small shops only, and the chat bubbles had no context.

### Label
Websites & AI assistants for businesses

### Headline
# You're busy with your clients. Who's answering the new ones?
*(gold river underline under "answering")*

### Subhead (speaks directly to the visitor)
When someone contacts your business, the first to reply usually wins them. We build websites that make people trust you, and AI assistants that answer your customers, book appointments and follow up for you, day and night.

### Buttons
**[Book a free call]** · See an example ↓

### Small line
Free 20-minute call. No tech talk. We'll tell you honestly what you need.

### Example card on the photo (context any visitor understands)
- Card title: **EXAMPLE · AN AI ASSISTANT AT WORK** · Live 24/7
- Label: *A customer · 11:41 PM*: "Hi, can I see a doctor tomorrow morning?"
- Label: *Your AI assistant · 3 seconds later*: "Yes. Dr. Okafor is free at 9:30 or 11:00 tomorrow. Shall I book 9:30 for you?"
- Footer: ✓ Appointment booked while the clinic was closed.

*Photo: clinic front desk (a professional business, not a salon).*

### Industries strip (directly under the hero)
**For businesses that serve customers:** Real estate · Clinics & healthcare · Law & professional services · Hotels & short-lets · Schools & training · Retail & e-commerce · Finance & insurance · Beauty & wellness · Restaurants & events · Car dealers & logistics

### Also revised on the homepage
- **Sound familiar? cards:** "We miss messages while we're with clients." / "People find us online, then leave." / "My team answers the same questions all day." / "Nobody replies after we close."
- **What we do:** "Two things we do. Both bring you more customers."
- **Chat demo:** business types are now Real estate · Clinic · Law firm · Hotel, with numbered steps ("1. Pick a type of business", "2. Tap what a customer might ask").
- **FAQ:** added "Do you only work with small businesses?" and "What exactly is an AI assistant?"

---

## 2. Sound familiar?

### Section label
01: Sound familiar?

### Headline
## Good businesses lose customers in the gaps.

### Cards (4)
1. **"I miss messages while I'm working."**
   By the time you reply, they've booked with someone else.

2. **"People find us online, then leave."**
   Your website is the first thing they see. If it looks old or slow, they assume the business is too.

3. **"I answer the same questions all day."**
   Prices, opening hours, "are you free Saturday?" Every day, over and over.

4. **"Nobody picks up after we close."**
   That's when most people get round to messaging, and it's when you finally get to rest.

### Line under cards
None of this is because you're bad at what you do. It's because you can't be in two places at once.

*Design: MadeByShape-style cards, but flat: off-white on white with a 1px hairline border and no drop shadows. Each card has a small line icon (see asset prompts: icon set). On hover, the icon morphs into an arrow (Off Brand-style SVG path morph) and the card border turns black. Cards are slightly offset in height (staggered grid), not a perfect row of four.*

---

## 3. What we do (two doors)

### Section label
02: What we do

### Headline
## Two things. Both get you more customers.

### Door A: Websites
**A website people trust, that actually brings in work.**
Looks as good as your business really is. Loads fast on phones. Tells people what you do, what it costs and how to book, in seconds. And you can change your prices without calling anyone.
→ **See websites**

### Door B: AI Assistants
**Someone who answers your customers, day and night.**
It replies on your website, WhatsApp and Instagram in seconds. It answers questions, books appointments and passes the tricky ones to you. Polite, on-brand, and it never takes a day off.
→ **See AI assistants**

### Line underneath
Most clients start with one and add the other later. Some do both at once. We'll tell you honestly which one you need first.

*Design: two large side-by-side panels. Door A is white, door B is black (inverted). The contrast does the work, with no colour needed. Each panel has a looping muted video or animated mock: A = a website building itself section by section, B = chat messages arriving and being answered. The arrow on each link is the brand colour.*

---

## 4. See it working (the Vizcom moment)

### Section label
03: See it working

### Headline
## It's 11:40pm. A customer messages you. Watch what happens.

### Intro
Tap a question to see how your assistant would reply. This is the kind of thing it handles while you sleep.

### Interactive chat demo
Preset buttons the visitor can tap (customer side):
- "Are you open on Sunday?"
- "How much is a haircut and colour?"
- "Can I book for Saturday morning?"
- "I need to speak to a real person."

Example scripted replies (assistant side):
- Sunday → "We're closed Sundays, but we've got slots Saturday from 9am. Want me to hold one for you?"
- Price → "A cut and colour starts from `[PRICE]` and takes about 2 hours. Would you like to see available times?"
- Book → "Saturday morning: I have 9:30 or 11:00. Which works? I'll just need your name and number." → shows a booking confirmation card: "Booked ✓ Sat 9:30. You'll get a reminder the day before."
- Real person → "Of course. I've passed your message to Amara and she'll reply first thing tomorrow. Is WhatsApp OK?"

### Business-type switcher (above the phone)
Salon · Restaurant · Clinic · Shop
*(swaps the questions and replies to fit each type)*

### Side counter (live as they tap)
Customer replied to in **3 seconds** · Booking made at **11:42pm** · You were **asleep**

### Before / after website slider (below the chat)
**Headline:** Same business. Different first impression.
**Caption:** Drag to see a real website we rebuilt. `[PROOF NEEDED: client before/after screenshots + result, e.g. "Enquiries up from X to Y a month"]`

### CTA
**[Get an assistant like this]** → `/contact?for=assistant`

*Design: this is the centrepiece. A large black phone frame on an off-white background, with typing dots, realistic delays (600–1200ms) and message bubbles in black/grey. Only the booking confirmation tick uses brand colour. The business-type switcher is a minimal segmented control. Use GSAP for message timing. Respect prefers-reduced-motion (show messages instantly). The before/after uses a draggable vertical divider with a round handle.*

---

## 5. How it works

### Section label
04: How it works

### Headline
## You don't need to understand any of the tech. That's our job.

### Steps
**1. We talk (20 minutes, free)**
You tell us about your business and where customers are slipping through. We tell you honestly what would help, and what it costs.

**2. We build it (usually 2–4 weeks)**
We do the work. You check it and tell us what to change. We'll ask you for a few photos and answers. That's about it.

**3. You get more customers**
We launch it, show you how it works in plain English, and stay around afterwards. If something needs changing, you message us. We reply.

*Design: three columns with oversized numbers (01, 02, 03) in thin outline type, a hairline connecting them, and a simple illustration per step (see asset prompts). Steps reveal on scroll.*

---

## 6. Proof

### Section label
05: Real businesses, real results

### Headline
## Don't take our word for it.

### Result cards (3)
Each card: client photo/website screenshot, business type, one specific result, link to case study.
- `[PROOF NEEDED: Client 1, e.g. "Salon, London: 40% more bookings in the first 2 months"]`
- `[PROOF NEEDED: Client 2, e.g. "Restaurant: phone calls about opening hours down to almost zero"]`
- `[PROOF NEEDED: Client 3, e.g. "Clinic: 60+ after-hours enquiries answered in month one"]`

### Video testimonials
**Sub-headline:** Hear it from them.
`[PROOF NEEDED: 2–4 client videos, 30–60s each, filmed in their own business]`

Questions to ask clients on camera (so they say it in their own words):
1. What was frustrating you before?
2. What made you decide to go with PDN?
3. What's different now?
4. What would you tell another business owner thinking about it?

→ **See all our work**

*Design: video cards with natural-colour poster frames (see asset prompts). On hover, the poster zooms slightly and a play button in brand colour appears. Videos open in a lightbox with captions on by default. The result number is set big, the business name small.*

---

## 7. Worries (FAQ)

### Section label
06: Fair questions

### Headline
## The things people usually ask us.

**"I'm not techy at all. Is that a problem?"**
Not at all. Most of our clients aren't. You'll never have to touch code. We set everything up and show you the two or three things you'll actually use.

**"Will the assistant sound like a robot?"**
No. We write it to sound like your business: your prices, your rules, your way of talking. When a question is too tricky or personal, it hands over to you.

**"I already have a website. Do I need a new one?"**
Maybe not. Sometimes a few fixes make a big difference. We'll look at it on the call and tell you straight.

**"How much does it cost?"**
It depends on what you need, but we always give you a fixed price before we start. No surprise bills. `[OPTIONAL: "Websites from X, assistants from Y a month"]`

**"How long does it take?"**
Most websites take 2–4 weeks. Most assistants are answering customers within 1–2 weeks.

**"What if I don't like it?"**
You see it and give feedback before anything goes live. We keep going until you're happy with it. `[CONFIRM with boss: revisions policy / guarantee]`

**"What happens after launch?"**
We don't disappear. You can message us when something needs changing, and we check in to see how it's working.

*Design: accordion with hairline dividers, a plus icon that rotates to a cross, and the question in large type.*

---

## 8. Final CTA

### Headline
## Your next customer is probably messaging someone right now.
### Sub
Let's make sure it's you who answers.

**[Book a free call]**
Free, 20 minutes, no obligation. We reply within one working day.

*Design: full-bleed black section, huge white type, one brand-colour button. This is the moment of strongest contrast on the page.*

---

## Footer

**PDN, Pishon Digital Network**
Websites and AI assistants for businesses that serve real people.

Websites · AI Assistants · Our work · About · Contact
`[EMAIL]` · `[WHATSAPP]` · `[PHONE]` · `[INSTAGRAM]` · `[LINKEDIN]`

Small print: © 2026 Pishon Digital Network. Made by people who answer their messages.

---

## Microcopy

| Where | Copy |
|---|---|
| Primary button | Book a free call |
| Secondary button | See it working |
| Service links | See websites / See AI assistants |
| Case study link | See what we did |
| Video play (a11y label) | Play [Client name]'s story |
| 404 headline | This page took the day off. |
| 404 body | Our assistants never do, though. Let's get you somewhere useful. |
| 404 button | Back to home |
| Cookie banner | We use a few cookies to see what's working. [OK] [Settings] |
| Loading (if any) | One sec… |
