# PDN: Asset Prompts (for Codex / image generation)

> **Read `design/design-plan.md` first** (especially §4 Colour, §5 The River Line, §10 Assets). Brand colours: **Gold `#D4AF37`** (accent only, ~10%), **Onyx `#0F0F10`** (ink), paper `#F6F5F1`. Do not use the brand-guide gradient or fonts. Logos come from `/brand/` and must never be generated, tilted, recoloured or overlaid.
> **Priority order** for production: see design plan §16. Save outputs to `/assets/generated/<family>/<file-name>`.

Every prompt below starts with the **STYLE LOCK** so all assets look like one family.
Replace `#D4AF37` with PDN's real brand colour once supplied (put the logo + colours in `/brand`).

**Art direction in one line:** the website INTERFACE is black and white (~90%) with PDN gold as a ~10% accent. PHOTOS: the approved round-2 set is BLACK AND WHITE with real skin texture. Any new photo must also be black and white to match. All people are Nigerian. See the round-2 prompts for the full realism rules. Everything should feel photographed, drawn or designed by a person, not generated.

---

## 0. STYLE LOCK (paste at the start of every prompt)

### For photography
```
Editorial documentary photograph, shot on a 35mm full-frame camera with a 35mm or 50mm prime lens, natural available light, real location, candid unposed moment, true-to-life skin texture with pores and imperfections, slight film grain, natural colour with a slightly muted, warm editorial grade (never oversaturated), true-to-life Nigerian skin tones, deep blacks and soft highlights, generous negative space for text, authentic small-business interior with real clutter.
AVOID: stock-photo posing, smiling at camera, perfect symmetry, plastic or airbrushed skin, glowing light, lens flares, purple or blue tint, gradients, futuristic or sci-fi elements, holograms, robots, visible text or logos, distorted hands, extra fingers, watermark.
```

### For illustration ("River-line" style: see design/design-plan.md §5 and §10)
```
Single continuous line drawing, as if drawn in one stroke without lifting the pen, uniform thin ink line in #0F0F10 (around 2px at 1000px width), confident and slightly imperfect hand-drawn quality, the line begins and ends with a small loop, minimal and elegant, lots of empty space, plain off-white background #F6F5F1 (or transparent), exactly ONE small detail filled or stroked in gold #D4AF37 (a tick, a dot, a speech bubble or a coffee cup, never more than one), no fills, no shading, no textures, modern editorial style like a high-end UK design studio.
AVOID: multiple lines or sketchy hatching, 3D render look, gradients, glow, more than one colour besides ink and gold, cartoon mascots, robots, brains, circuit lines, sparkles, AI-art smoothness, text, letters, numbers.
DELIVER: SVG with a single open path where possible (so it can be animated drawing on scroll), otherwise 2x PNG on transparent.
```

### For UI mockups
```
Clean realistic UI mockup, flat front-on view, true-to-life smartphone or browser frame in matte black, interface in black, white and greys, system sans-serif type, one accent colour #D4AF37 only on a single button or tick, soft natural drop shadow on off-white #F6F5F1 background, crisp and legible.
AVOID: perspective tilts, floating 3D phones, glassmorphism, neon, gradients, fake gibberish text (leave text areas blank if unsure).
```

> **Photos are black and white** (round-2 decision) to match the approved set. Keep real skin texture and correct exposure for dark skin.

---

## 1. Photography

| File name | Where used | Ratio |
|---|---|---|
| `hero-salon.jpg` | Homepage hero | 4:5 (desktop right panel) + 9:16 crop for mobile |
| `pain-1-busy-hands.jpg` | "Sound familiar?" card background (optional) | 1:1 |
| `door-website.jpg` | What we do, Door A | 4:3 |
| `door-assistant.jpg` | What we do, Door B | 4:3 |
| `final-cta-night.jpg` | Final CTA (optional background) | 21:9 |
| `about-team-*.jpg` | About page | 4:5 |

### hero-salon.jpg
```
[PHOTO STYLE LOCK] A hairdresser in her 30s in a small independent salon, mid-haircut, both hands busy with scissors and comb, focused on her client, not looking at the camera. In the foreground on the counter, out of focus slightly, her smartphone screen lights up with a new message notification. Warm everyday salon details: mirrors, product bottles, a towel on a chair. Shot from a slightly low angle at counter height, the phone in the lower third, empty wall space on the left for a headline. Aspect ratio 4:5.
```
Variants (to swap per audience / ad):
- **Restaurant:** `…a chef-owner plating food in a busy small restaurant kitchen at evening service, phone on the steel pass lighting up with a message…`
- **Clinic:** `…a dental receptionist helping a patient at the front desk while the desk phone and a mobile both light up, after-hours clock on the wall showing 6:15pm…`
- **Shop:** `…a boutique owner folding clothes and serving a customer at the till while her phone buzzes on the counter…`

### door-website.jpg
```
[PHOTO STYLE LOCK] Over-the-shoulder shot of a customer sitting on a sofa at home in the evening, scrolling a small business website on their phone, thumb mid-scroll, screen content blurred and unreadable. Cosy, real living room, lamp light. Aspect ratio 4:3.
```

### door-assistant.jpg
```
[PHOTO STYLE LOCK] A small business owner asleep on a sofa at night, still in work clothes, while their phone on the coffee table glows softly with incoming messages. Quiet, calm, slightly humorous mood. Dark room with low light from a window. Aspect ratio 4:3.
```

### final-cta-night.jpg
```
[PHOTO STYLE LOCK] Exterior of a small independent shopfront at night, closed, lights off, a single phone glowing on the counter visible through the window. Empty street, wet pavement, very dark frame with lots of black space for large white text. Aspect ratio 21:9.
```

### about-team (if no real team photos yet, but real photos are strongly preferred)
```
[PHOTO STYLE LOCK] Candid photo of a small creative team of three around a desk in a bright, slightly messy studio, one person pointing at a laptop, others laughing, coffee cups and notebooks on the desk. Not looking at the camera. Aspect ratio 4:5.
```
> ⚠️ Use real photos of the PDN team on the About page. Generated "team" photos would undermine trust, so use these only as layout placeholders.

---

## 2. Illustrations

| File name | Where used | Ratio |
|---|---|---|
| `step-1-talk.svg/png` | How it works, step 1 | 1:1 |
| `step-2-build.svg/png` | How it works, step 2 | 1:1 |
| `step-3-customers.svg/png` | How it works, step 3 | 1:1 |
| `pain-missed.png` | Sound familiar card 1 (alt to icon) | 4:3 |
| `pain-leave.png` | card 2 | 4:3 |
| `pain-repeat.png` | card 3 | 4:3 |
| `pain-afterhours.png` | card 4 | 4:3 |
| `404.png` | 404 page | 16:9 |
| `form-success.png` | Sales page success state | 1:1 |

### How it works
**step-1-talk**
```
[ILLUSTRATION STYLE LOCK] Two people sitting across a small table with coffee cups, one talking with open hands, the other listening and taking notes. Simple, warm, human. The accent colour #D4AF37 only on one coffee cup. Square 1:1.
```
**step-2-build**
```
[ILLUSTRATION STYLE LOCK] A pair of hands arranging large blocks that form a simple website layout and a chat bubble, like building with paper cut-outs on a table. The accent colour #D4AF37 only on the chat bubble. Square 1:1.
```
**step-3-customers**
```
[ILLUSTRATION STYLE LOCK] A shop door with an "open" sign and a short queue of three different people walking in, one holding a phone showing a tick. The accent colour #D4AF37 only on the tick. Square 1:1.
```

### Pain scenes
**pain-missed**
```
[ILLUSTRATION STYLE LOCK] A barber with both hands busy cutting hair while a phone on the shelf behind him vibrates with motion lines and a stack of unread message bubbles floating up. The accent colour on the unread badge only. 4:3.
```
**pain-leave**
```
[ILLUSTRATION STYLE LOCK] A person on a phone looking at a cracked, dusty-looking old website on the screen, walking away towards a different shop. Subtle, slightly humorous. Accent colour on the person's coat only. 4:3.
```
**pain-repeat**
```
[ILLUSTRATION STYLE LOCK] A tired shop owner at a counter surrounded by many identical speech bubbles each containing a question mark, stacked like paperwork. Accent colour on one speech bubble only. 4:3.
```
**pain-afterhours**
```
[ILLUSTRATION STYLE LOCK] A closed shop at night with the moon in the window, a phone on the counter lighting up with messages nobody is answering. Accent colour on the phone screen glow only (flat, not glowing effect). 4:3.
```

### 404
```
[ILLUSTRATION STYLE LOCK] A small shop with a hand-drawn "back soon" sign on the door and a deckchair outside, a lone chat bubble on a stand happily still answering someone. Light, funny, calm. Accent colour on the chat bubble. 16:9.
```

### form-success
```
[ILLUSTRATION STYLE LOCK] A paper plane flying from a hand towards a simple drawn phone, with a small tick mark trailing behind it. Accent colour on the tick only. Square 1:1.
```

---

## 3. UI mockups (for the interactive demo + before/after)

> The live chat demo on the homepage will be **built in code** (real HTML), not an image. These mockups are for ads, social and design reference.

### mock-chat-booking.png
```
[UI STYLE LOCK] A smartphone showing a messaging conversation at 11:42pm (time visible in the status bar). Customer bubble (light grey): "Hi, can I book for Saturday morning?" Assistant bubble (black with white text): "Saturday morning: I have 9:30 or 11:00. Which works?" Customer: "9:30 please". Then a booking confirmation card with a tick in #D4AF37: "Booked: Sat 9:30". Flat front view, centred, off-white background. Portrait 4:5.
```

### mock-before-after.png
```
[UI STYLE LOCK] Two browser windows side by side. Left labelled BEFORE: a dated small restaurant website with clashing colours, tiny text, a cluttered layout and a broken image icon. Right labelled AFTER: a clean modern restaurant website in black and white with a large food photo, clear menu button and a "Book a table" button in #D4AF37. Landscape 16:9.
```
> Replace with a **real** client before/after as soon as possible. Real beats generated here.

---

## 4. Iconography

### Icon spec (apply to every icon)
```
Style: outline / line icon, 24×24 px grid, 1.5px stroke, round line caps and round joins, 2px corner radius, 2px internal padding, single colour black (#0F0F10) on transparent. No fills except tiny details. Optical balance over mathematical. Export as SVG, one path per stroke where possible.
Accent: none by default. On hover, the stroke turns to #D4AF37 only on the primary CTA icon.
```

**Prompt template:**
```
A single minimal line icon of [SUBJECT], 24x24 grid, 1.5px uniform stroke, round caps and joins, black on transparent, no fill, no shading, no gradient, no text, consistent with a hand-tuned icon set like Phosphor or Lucide but slightly more human with soft imperfect curves. SVG-ready, centred.
```

### Icon list

| Icon file | [SUBJECT] | Used for |
|---|---|---|
| `icon-message-missed.svg` | a chat bubble with a small clock in the corner | Pain card 1 |
| `icon-browser-leave.svg` | a browser window with an arrow exiting to the right | Pain card 2 |
| `icon-repeat-questions.svg` | two overlapping speech bubbles with circular arrows | Pain card 3 |
| `icon-moon-phone.svg` | a phone with a crescent moon above it | Pain card 4 |
| `icon-website.svg` | a simple browser window with a layout inside | Websites door / nav |
| `icon-assistant.svg` | a chat bubble with three dots and a small spark replaced by a tick (no robot face) | Assistant door / nav |
| `icon-calendar-check.svg` | a calendar page with a tick | Booking features |
| `icon-whatsapp-like.svg` | a generic chat bubble with a phone handset (not the WhatsApp logo) | Channels |
| `icon-handover.svg` | two hands, one passing a speech bubble to the other | "Hands over to you" |
| `icon-phone-fast.svg` | a smartphone with speed lines | Fast on phones |
| `icon-search-pin.svg` | a magnifying glass over a map pin | Show up on Google |
| `icon-edit.svg` | a pencil over a small page | Update it yourself |
| `icon-shield.svg` | a simple shield with a tick | Security / hosting |
| `icon-chart-up.svg` | a simple bar chart with an upward arrow | Weekly summary / results |
| `icon-play.svg` | a play triangle in a circle | Video testimonials |
| `icon-plus.svg` | a plus (rotates to a cross in the FAQ) | FAQ accordion |

> Brand logos (WhatsApp, Instagram, Google, Facebook) must come from each company's **official brand assets**, never generated.

### The icon → arrow morph (Off Brand-style)
**Do not generate this with AI.** It's built in code:
- Each card icon and a right arrow `→` are drawn as SVG paths with the **same number of points** so they can morph smoothly (GSAP MorphSVG or Flubber).
- Arrow spec: 24×24, 1.5px stroke, round caps, same as the icon set.
- On hover (~350ms, ease `power3.out`), the icon morphs into the arrow and shifts 4px right. Reverse on mouse leave.
- Reduced motion: crossfade instead of morph.

---

## 5. Video testimonial frames

### Filming guide (for real client videos)
- Film in the client's own business, during a quiet moment, on natural light.
- Horizontal 16:9 for the website plus a vertical 9:16 crop for ads/Reels.
- Owner framed mid-shot, slightly off-centre, looking just off-camera (at the interviewer).
- 30–60 seconds each. Burn in captions (most people watch on mute).
- Use the 4 interview questions from `copy/03-homepage.md`, section 6.

### Poster frame / thumbnail treatment
```
[PHOTO STYLE LOCK] Mid-shot of a [BUSINESS OWNER TYPE] in their own [BUSINESS], mid-sentence while speaking, natural expression, looking slightly off-camera, natural colour, room on the left for a name label. 16:9.
```
Overlay (done in design, not generated): name + business in white, small type bottom-left. Round play button in #D4AF37 in the centre.

---

## 6. Ad creative starter set (matches the sales page)

Each ad must use **the same headline as the sales page variant it links to**.

| Ad | Headline on creative | Links to | Formats |
|---|---|---|---|
| A: Assistant | "Never miss another customer message. Even at midnight." | `/contact?for=assistant` | 1:1, 4:5, 9:16 |
| B: Website | "Does your website make people pick you, or leave?" | `/contact?for=website` | 1:1, 4:5, 9:16 |
| C: Both | "Stop losing customers to slow replies and an old website." | `/contact?for=both` | 1:1, 4:5, 9:16 |

### Ad A visual
```
[UI STYLE LOCK] A smartphone in a hand (real Nigerian hand, natural skin texture, natural colour) showing a chat at 11:42pm where an assistant has just booked an appointment, a tick in #D4AF37. Large empty off-black space above for a headline. Format: [1:1 | 4:5 | 9:16].
```

### Ad B visual
```
[PHOTO STYLE LOCK] A person standing outside two shops on a street, looking at their phone, deciding which to walk into. One shop looks inviting, the other has its shutters half down. Natural colour, muted grade, lots of sky for a headline. Format: [1:1 | 4:5 | 9:16].
```

### Ad C visual
```
[PHOTO STYLE LOCK] Same scene as hero-salon.jpg: a hairdresser with busy hands and a phone lighting up on the counter. Extra headroom for a large headline. Format: [1:1 | 4:5 | 9:16].
```

Typography on ads: headline in the site font, white on black or black on off-white, left-aligned. The only colour is the PDN logo / button in `#D4AF37`.

---

## 7. Typography & colour tokens

Moved to **`design/design-plan.md`** (§4 Colour system, §6 Typography) so there's one source of truth.
Summary for asset work: ink `#0F0F10`, paper `#F6F5F1`, gold `#D4AF37` (≤10%, never as text on light backgrounds). Headline font on ad creatives: **Satoshi** (Medium 500), labels in **JetBrains Mono**. No brand-guide fonts, no gradients.
