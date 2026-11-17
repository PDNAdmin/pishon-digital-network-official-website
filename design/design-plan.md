# PDN: Design Plan
*The single source of truth for how the site looks, moves and feels. Copy lives in `/copy`, asset prompts in `/assets/asset-prompts.md`.*

**In one sentence:** a clean, confident, UK-agency-style site with a black-and-white interface (photos in natural colour), with Vizcom's way of *showing* the product, Off Brand's custom little moments, MadeByShape's card craft, and one golden river line running through it all.

---

## 1. What we take from the brand guide (and what we don't)

| Take | Ignore |
|---|---|
| **Pishon Gold `#D4AF37`** (accent, ~10%) | The gold/black radial gradient |
| **Onyx Black `#0F0F10`** (our "ink") | Quirkfy & Bricolage Grotesque fonts |
| **The logo** (mark + wordmark, all approved versions) | Brand-guide photography and layout style |
| **The idea behind the mark:** the River Pishon that "winds through" and "encircles" (we turn this into our signature line motif, see §5) | |

Logo rules we keep (from the guide): no tilting, no non-brand colours, no transparency, nothing on top of the logo.
**Action for you:** export the logo as **SVG** from the guide's Figma/download link into `/brand/`:
`pdn-mark-gold.svg`, `pdn-mark-black.svg`, `pdn-mark-white.svg`, `pdn-logo-horizontal-black.svg`, `pdn-logo-horizontal-white.svg`.

---

## 2. Design principles (check every screen against these)

1. **Show, don't tell.** If a section can be a demo, it's a demo, not a paragraph (Vizcom).
2. **The interface is black and white. Gold is a signal.** (This is the UI colour scheme: backgrounds, text, buttons. Photos are in natural colour.) If gold appears, it means "this matters / click here".
3. **Type is the hero.** Big, tight, confident headlines. Imagery supports; it never decorates.
4. **One custom moment per section.** A morph, a reveal, a draw-in, a drag. Never two competing.
5. **Made by hand, not by a template.** Asymmetric layouts, real photos, illustration with a human line. If it looks like a theme, redo it.
6. **Calm motion.** Everything eases. Nothing bounces, spins or flashes.

---

## 3. "Steal like an artist": exactly what we borrow

### From Vizcom (vizcom.com)
- **Split hero**: big headline on the left, short supporting line + button on the right, bottom-aligned (exactly like your screenshot). We use this layout for the hero and for most section intros.
- **The product as the visual.** Their site *shows* the app doing its job. Ours shows the AI assistant answering and the website transforming (the 11:40pm chat demo + before/after slider).
- **Step-by-step interactive demos**: "click this → this happens." Our version: a business-type switcher + tap-a-question chat.
- **Large rounded media frames** holding video/UI on a dark background, with very thin borders.
- **Dotted texture line**: the subtle dotted rule at the top of their sections (visible in your screenshot). We use a dotted hairline as our section divider.
- **Font feel**: their body/heading font is **Matter**. We use **Satoshi** (free, very close) — see §6.

### From Off Brand (itsoffbrand.com)
- **Icon → arrow morph** on card hover. Our signature micro-interaction on every clickable card.
- **Custom cursor** on desktop: a small black dot that grows into a circle with a word ("View", "Play", "Drag") over interactive things.
- **Personality in the details**: playful hover states, a footer that does something, a 404 with a joke.
- **Big, bold section transitions**: sections that switch from white to black as you scroll into them.

### From MadeByShape (madebyshape.co.uk)
- **Card craft**: generous rounded cards (24px radius), tidy inner padding, media filling the top, label + title below. Used for services, work and testimonials.
- **Video everywhere it helps**: showreel-style looping clips inside cards and the hero, muted, no controls until hover.
- **Pill buttons and pill tags** ("Website", "AI Assistant", "Salon").
- **Bento-style grids** for the work/proof section: mixed card sizes, not a uniform grid.
- **What we *don't* take**: the "Pinterest" pastel softness you mentioned. We stay sharper and more contrasting: black, white, one gold.

### From SpinX (spinxdigital.com), copy & structure only
- The journey down to **video testimonials**. No visual borrowing.

---

## 4. Colour system

| Token | Hex | Role | Share of screen |
|---|---|---|---|
| `--ink` | `#0F0F10` | Text, dark sections, phone frames | ~35% |
| `--paper` | `#F6F5F1` | Main background (warm off-white, not pure white) | ~45% |
| `--white` | `#FFFFFF` | Cards, form, inputs | ~8% |
| `--grey-700` | `#3A3A3C` | Secondary text on paper; card borders on ink | — |
| `--grey-500` | `#77767A` | Captions, meta text | — |
| `--grey-200` | `#E3E1DB` | Hairlines, dividers, chat bubbles (customer) | — |
| `--grey-900` | `#1A1A1C` | Raised surfaces on dark sections (cards on ink) | — |
| `--gold` | `#D4AF37` | Primary button, the river line, active states, ticks, one highlight per section | **≤10%** |
| `--gold-deep` | `#A8871F` | Gold text on light backgrounds (if ever needed), button hover | tiny |

### Gold rules (important: contrast)
- Gold on white/paper is only **~2:1 contrast**, so **never use gold for text on light backgrounds**. On paper, gold is used for **shapes only** (the river line, a dot, an underline, a filled button with **black text**).
- **Black text on gold = ~9.6:1**, so primary buttons are **gold fill + ink text**.
- Gold **text** is allowed on **ink** backgrounds (~8.9:1): a highlighted word in a dark section.
- Max **one gold element per viewport** besides the nav button. If you see three gold things at once, remove two.
- **No gradients. Ever.** (Including the one in the brand guide.)

### Section rhythm
Paper → Paper → **Ink** → Paper → **Ink** → Paper → **Ink (final CTA)**. Switching to black is our main "chapter change" and costs nothing in colour budget.

---

## 5. The signature: "The River Line"

The logo is a river that winds through and encircles the land. So the site has **one continuous thin line** that winds through the page, the same way.

- **What it is:** a single 1.5px stroke SVG path in `--gold` (on ink sections) / `--ink` with a gold head (on paper sections). It ends in a small loop, echoing the loop in the mark.
- **Where:**
  1. **Hero:** the line draws in under the headline word "answering" and curls into a loop.
  2. **Between sections:** it winds down the page on scroll (GSAP ScrollTrigger + DrawSVG/stroke-dashoffset), connecting "Sound familiar" → "What we do" → "How it works" (it literally connects steps 1, 2, 3).
  3. **Illustrations:** every illustration is drawn in one continuous line (see §10), so the illustrations feel like the river line drawing pictures.
  4. **Loader / page transition:** the mark's loop draws itself (≤600ms), then the page fades in.
  5. **Footer:** the line ends by encircling the logo mark.
- **Restraint:** it's thin, it's quiet, it's never more than one line on screen. It should feel like a thread, not a decoration.
- **Reduced motion:** the line appears fully drawn, no animation.

This is the thing people will remember, and nobody else has it, because it comes from *our* logo story.

---

## 6. Typography

**Not** the brand-guide fonts.

| Role | Font | Weights | Notes |
|---|---|---|---|
| Headlines + body | **Satoshi** (Fontshare, free commercial) | 400, 500, 700 (variable) | Closest free match to Vizcom's Matter. Geometric, friendly, sharp. |
| Labels, numbers, UI meta | **JetBrains Mono** (Google Fonts) | 400, 500 | Section labels "01: Sound familiar?", counters, tags. Uppercase, +6% tracking, small. |
| Upgrade option | **Matter** (Displaay, paid) | — | Drop-in replacement for Satoshi if budget allows. |

### Type scale (fluid, `clamp()`)

| Token | Mobile → Desktop | Weight | Leading | Tracking |
|---|---|---|---|---|
| `display` | 48 → 128px | 500 | 0.95 | −3% |
| `h1` | 40 → 88px | 500 | 1.0 | −2.5% |
| `h2` | 32 → 56px | 500 | 1.05 | −2% |
| `h3` | 22 → 28px | 500 | 1.2 | −1% |
| `body-lg` | 18 → 21px | 400 | 1.5 | 0 |
| `body` | 16 → 17px | 400 | 1.6 | 0 |
| `label` (mono) | 12 → 13px | 500 | 1.2 | +6%, uppercase |

Rules: headlines are **left-aligned** (never centred, except the 404). Max line length for body: 60 characters. Headlines usually break into 2–3 lines by hand (control the breaks with `<br class="md:block hidden">` or `text-wrap: balance`).

---

## 7. Layout & grid

- **12-column grid**, max content width **1440px**, outer gutters **24px mobile / 40px tablet / 64px desktop**, column gap 24px.
- **Section padding**: 96px mobile / 160px desktop top and bottom. White space is the luxury.
- **Asymmetry by default**: headline spans cols 1–7, supporting text cols 9–12, bottom-aligned (Vizcom split).
- **Section header pattern** (used everywhere):
  ```
  ┌──────────────────────────────────────────────────────────────┐
  │ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·  │ ← dotted hairline
  │ 02: WHAT WE DO                                   (mono label)│
  │                                                              │
  │ Two things. Both get                     Most clients start  │
  │ you more customers.                      with one... [Link →]│
  └──────────────────────────────────────────────────────────────┘
  ```
- **Radius scale**: 8px (inputs, tags) / 16px (small cards) / 24px (cards, media) / 40px (big media frames) / 999px (pills, buttons).
- **Borders over shadows**: 1px `--grey-200` on paper, 1px `--grey-700` on ink. Shadows only on floating UI (phone mock): soft, 0 30px 60px rgba(15,15,16,0.12).

---

## 8. Components

### Navigation
- Transparent on load over the hero; becomes `--paper` with a hairline bottom border after 40px scroll. Hides on scroll down, reappears on scroll up.
- Left: horizontal logo (black). Right: links (Satoshi 15px, 500) + **pill button** "Book a free call" (gold fill, ink text).
- Link hover: text slides up and is replaced by the same word (vertical roll, 300ms), an Off Brand-style detail.
- Mobile: logo + round menu button. Menu opens full-screen **ink** panel, links in `h1` size stagger in, the river line draws across the bottom.

### Buttons
| Type | Look | Hover |
|---|---|---|
| Primary | Pill, `--gold` fill, `--ink` text, 16px/500, 52px tall, arrow icon in a small ink circle on the right | Arrow circle grows and the arrow morphs/slides; background goes `--gold-deep` |
| Secondary | Pill, 1px ink border, transparent | Fills ink, text turns paper (fill wipes from left) |
| Text link | Underlined with 1px line | Line retracts right, redraws from left |
On ink sections, the secondary button inverts (paper border, paper text).

### Cards (MadeByShape craft + Off Brand morph)
```
┌───────────────────────────┐  radius 24, 1px hairline, white
│                           │
│    media (16:10)          │  colour photo/illustration/video loop
│                           │  (radius 16 inside, 8px inset)
├───────────────────────────┤
│ SALON · WEBSITE  (pill tags, mono)
│ Title of the card     (◯→)│  icon in a 44px circle, morphs to arrow
│ One line of support        │
└───────────────────────────┘
```
Hover: border → ink, media scales 1.03 inside its frame, icon morphs to arrow and nudges right 4px. Whole card is the link.

### Pain cards ("Sound familiar?")
Same card without media: big quote in `h3`, small line icon top-left, staggered heights (cards 2 and 4 offset 48px down on desktop).

### Two doors (What we do)
Two big panels, 50/50, radius 40. Door A **paper/white**, Door B **ink**. Each: mono label, `h2` title, 2-line body, looping video/animated mock filling the bottom half, link with arrow. Hover: the panel's media expands up 8%.

### The chat demo (centrepiece; Vizcom moment)
- **Ink section.** Left: section header + business-type switcher (segmented pills: Salon · Restaurant · Clinic · Shop) + preset question buttons (outline pills). Right: a large phone (matte black frame on `--grey-900` stage, 40px radius frame).
- Bubbles: customer = `--grey-200` bg, ink text, left. Assistant = white bg, ink text, right, with a tiny PDN mark avatar. Typing dots before each reply (600–1200ms).
- Booking confirmation card: white, with a **gold tick**, the only gold in the section.
- Live counter under the phone in mono: `REPLIED IN 3S · BOOKED 11:42PM · YOU WERE ASLEEP`.
- **Built in code**, not images (real text, accessible, swappable per business type).

### Before/after slider
Big 40px-radius frame, two real website screenshots, a vertical divider with a round 56px ink handle showing ⟷. Custom cursor says "Drag". Labels "BEFORE" / "AFTER" in mono pills.

### Steps (How it works)
Three columns, oversized outlined numbers (`display` size, 1px ink stroke, no fill) that **fill with ink** as the river line reaches each one on scroll. Illustration above each step.

### Proof: bento grid
```
┌──────────────┬───────┬───────┐
│  VIDEO       │ RESULT│ QUOTE │
│  (big, 2×2)  │  +40% │       │
│              ├───────┴───────┤
│              │  VIDEO (wide) │
└──────────────┴───────────────┘
```
Video cards: natural-colour poster, gold play button (64px circle, ink triangle), cursor says "Play". Opens a lightbox with captions on. Result cards: giant number (`display`), small context line. Quote cards: `h3` quote, name + business + small round photo.

### FAQ accordion
Hairline dividers, question in `h3`, plus icon in a 40px circle that rotates 45° to a cross, answer slides open (height auto via GSAP). One open at a time.

### Logo marquee (client logos)
Greyscale logos, infinite slow marquee (40s loop), pauses on hover, fades at both edges. `[PROOF NEEDED: client logos]`

### Forms (sales page)
White card, radius 24, 32px padding. Inputs: 56px tall, radius 12, 1px `--grey-200`, focus = 2px ink outline. Radio choices as **pill toggles**. Submit = full-width primary button. Errors in ink with a small icon (never red walls of text; red `#B3261E` used for the error icon only).

### Footer (ink)
Huge "Let's make sure you answer." in `display` paper text → button. Below: 4 columns of links, contact details, socials. The river line enters from the left and **encircles the logo mark**. Tiny line at the bottom: "Made by people who answer their messages."

### Custom cursor (desktop only, `pointer: fine`)
8px ink dot (paper dot on ink sections). Over links: grows to 48px ring. Over media: 88px gold-free ink circle with a word ("View", "Play", "Drag") in paper mono. Hidden on touch devices.

---

## 9. Motion system

**Libraries:** GSAP (+ ScrollTrigger, SplitText, DrawSVG or stroke-dashoffset, MorphSVG/Flubber for icon morphs) and **Lenis** for smooth scrolling.

| Token | Value | Use |
|---|---|---|
| `ease-out` | `power3.out` / `cubic-bezier(.22,1,.36,1)` | Almost everything |
| `ease-in-out` | `power2.inOut` | Section colour switches, page transitions |
| `fast` | 200ms | Hovers, buttons |
| `base` | 400ms | Card morphs, accordion |
| `slow` | 800ms | Headline reveals, line drawing segments |
| `stagger` | 60–80ms | Lines of text, card groups |

**Signature moves**
1. **Headline line reveal:** each line slides up from a mask (y 100% → 0) with 80ms stagger. Used on every `h1/h2` once.
2. **River line draw** on scroll (scrubbed, see §5).
3. **Section colour switch:** paper → ink transitions as the section reaches 50% of the viewport (background animates, text inverts).
4. **Icon → arrow morph** on cards.
5. **Media parallax:** images move at 0.9× scroll speed inside their frames (subtle).
6. **Chat demo timing:** typing dots → bubble pops in (scale 0.96 → 1, 250ms).
7. **Page transition:** ink panel wipes up, the mark's loop draws, panel wipes away (≤900ms total).

**Never:** bounce/elastic easing, rotating 3D, parallax on text, auto-playing sound, anything that loops in the visitor's face while they read.
**Reduced motion (`prefers-reduced-motion`):** no smooth scroll, no parallax, no line scrub (line shown drawn), reveals become simple 200ms fades.

---

## 10. How the custom assets complement the design

Three asset families only. Together they look like one hand made them.

| Family | Look | Where | Why it fits |
|---|---|---|---|
| **A. Photography** | **DECISION (round 2): the approved photo set is black and white. Keep ALL photography black and white so the set stays consistent; never mix colour and B&W photos.** Documentary photos of real Nigerian small-business owners mid-work, phones in the scene. Graded slightly muted and warm (editorial, never oversaturated), so they sit calmly inside the black-and-white interface. | Hero, two doors, video posters, final CTA, ads | Real people = trust. Colour shows real skin, texture and warmth. The muted grade keeps gold the strongest accent in the UI. |
| **B. River-line illustrations** | **Single continuous ink line** (1.5–2px look) on paper, drawn as if never lifting the pen, ending in the logo-style loop. **One small gold detail** per illustration (a tick, a dot, a bubble). | Pain cards, 3 steps, 404, form success, empty states | It's literally the river line drawing pictures. It ties illustrations to the logo story and the site's signature line. |
| **C. Objects & UI** | Clean product mockups: matte black phone, chat bubbles, booking card, browser frames. Flat, front-on. | Chat demo stills, ads, doors, social | Shows the product (Vizcom). Same black/white/gold palette. |

**Icons**: 24px line icons, 1.5px stroke, round caps. The same stroke weight as the river line, so icons, illustrations and the line all match.

**Illustration delivery format (for Codex):** SVG preferred (so the line can be animated with draw-on-scroll). If raster, export PNG at 2× on transparent background with ink line `#0F0F10` and gold `#D4AF37` only.

All prompts with the updated style locks are in `/assets/asset-prompts.md`.

---

## 11. Page layouts (wireframes)

### Homepage
```
[NAV] logo ............................ Websites  AI Assistants  Work  About  (Book a free call)

[HERO, paper]
 You're busy running your                    We build websites people trust, and
 business. Who's answering                   assistants that reply, book and follow up...
 your customers?  ~~~~gold river~~~◯        (Book a free call →)  See it working ↓
 ┌────────────────────────────── colour photo, radius 40, salon owner + phone lighting up─┐
 │                                   [live chat bubble pops on phone]                    │
 └──────────────────────────────────────────────────────────────────────────────────────┘
[LOGO MARQUEE] greyscale client logos

[01 SOUND FAMILIAR, paper] header split + 4 staggered pain cards (icon→arrow)
       │ river line winds down
[02 WHAT WE DO, paper] two doors: white panel | ink panel
       │
[03 SEE IT WORKING, INK] switcher + questions | big phone demo + counter
                         before/after slider full width below
[04 HOW IT WORKS, paper] 3 steps, outlined numbers fill as the river line reaches them
[05 PROOF, paper] bento: big video, result, quote, wide video → "See all our work"
[06 FAIR QUESTIONS, paper] accordion
[FINAL CTA + FOOTER, INK] "Your next customer is probably messaging someone right now." (gold button)
                          river line encircles the logo mark
```

### Contact = Sales page
```
[MINIMAL NAV] logo ..................................... WhatsApp · Call

[HERO, INK]
 Never miss another customer           ┌──────── white form card ────────┐
 message. Even at midnight.            │ Get your free plan              │
 Subhead...                            │ name / business / need (pills)  │
 ✓ Free call ✓ Fixed price ✓ 1 day     │ best way to reach you           │
 [greyscale logos]                     │ (Get my free plan →) gold       │
                                       └─────────────────────────────────┘
[COST OF DOING NOTHING, paper] split header + 3 facts in a row with line icons
[WHAT YOU GET, paper] two-column checklist (website | assistant), gold ticks
[HOW IT WORKS, paper] 3 steps (compact)
[PROOF, INK] 1 big video + 2 quotes
[WHAT HAPPENS NEXT, paper] numbered timeline along the river line
[RISK REVERSAL, paper] single big statement
[FAQ, paper] accordion
[FORM AGAIN + DIRECT CONTACT, INK]
[MOBILE] sticky bottom bar: (Get my free plan) once the hero form is out of view
```

---

## 12. Responsive behaviour
- **Breakpoints:** 640 / 768 / 1024 / 1280 / 1536 (Tailwind defaults).
- Split headers stack: headline first, supporting text + button after.
- Pain cards: 1 column on mobile with horizontal swipe option; staggering only from `lg`.
- Two doors stack; ink door second.
- Chat demo: phone first, questions as a horizontal scroll row of pills under it.
- Bento → single column, videos first.
- River line: simplified path on mobile (gentle S-curve down the left gutter).
- Custom cursor and morph hovers: desktop only; on touch, arrows are shown static.
- Tap targets ≥ 44px.

## 13. Accessibility & performance (non-negotiable)
- WCAG AA contrast (see gold rules §4). Visible focus ring: 2px ink (paper on dark), 3px offset.
- All motion respects `prefers-reduced-motion`.
- Videos: muted, `playsinline`, captions, poster image, lazy-loaded; never autoplay with sound.
- Images: Next.js `<Image>`, AVIF/WebP, explicit sizes. Hero image preloaded.
- Fonts: self-hosted Satoshi + JetBrains Mono, `font-display: swap`, subset.
- Targets: LCP < 2.5s on 4G, CLS < 0.05, Lighthouse ≥ 90 on mobile.

## 14. The "doesn't look AI-made" checklist
Before any section ships, all must be true:
- [ ] No gradients, glows, glassmorphism, neon, 3D blobs, sparkle ✨ icons, robot faces, brain/circuit imagery.
- [ ] No centred hero with a gradient headline.
- [ ] No uniform grid of identical cards with drop shadows.
- [ ] Gold appears at most once per viewport (plus the nav button).
- [ ] Headlines are left-aligned with hand-set line breaks.
- [ ] At least one real photo or real screenshot on the page (not generated).
- [ ] There's one custom interaction in the section, and only one.
- [ ] The copy passes the banned-words list in `/copy/01-voice-and-strategy.md`.

## 15. Build stack (when we start)
Next.js (App Router) + TypeScript + Tailwind CSS (tokens above as CSS variables in `@theme`) + GSAP + Lenis. Components: `SectionHeader`, `RiverLine`, `Button`, `Card`, `PainCard`, `Door`, `ChatDemo`, `BeforeAfter`, `Steps`, `BentoProof`, `VideoCard`, `FAQ`, `LogoMarquee`, `LeadForm`, `Cursor`, `Footer`.

---

## 16. Codex handoff: what to produce first (priority order)
1. **Icon set** (16 SVGs). Unblocks cards, nav and forms.
2. **River-line illustrations**: 3 steps, 4 pain scenes, 404, form success (SVG).
3. **Hero photo** + 4 business variants (salon, restaurant, clinic, shop).
4. **Two doors** photos/loops.
5. **UI objects**: phone frame, chat bubbles, booking card, browser frames.
6. **Video poster frames** (until real client videos arrive).
7. **Ad creatives** (A, B, C in 1:1, 4:5, 9:16).

Put outputs in `/assets/generated/<family>/<file-name>` using the file names in `/assets/asset-prompts.md`.
