# Codex: Revisions to Asset Round 1

Read with `design/design-plan.md` (§5 River Line, §10 Assets) and `assets/asset-prompts.md`.

## Status

| Family | Verdict |
|---|---|
| Photography | ✅ Approved. Consistent, real-looking, on brief. |
| Ads (A, B, C) | ✅ Approved for layout. Final text will be re-typeset in Satoshi. Small fix below. |
| Posters | ✅ Approved as placeholders. |
| UI objects + mockups | ✅ Approved. Small fix below. |
| Icons | ✅ 14 of 16 approved. Redo 2 (below). |
| **Illustrations** | ❌ **Redo all 9.** See brief below. |

---

## 1. Illustrations: redo all 9 (highest priority)

### What's wrong with round 1
- **They read as stick figures.** People are circles on sticks, and the drawing is crude, so it looks amateur next to the photography. This would cheapen the whole site.
- **Not one continuous line.** They're many separate segments with a loop stuck on each end. The point of the style is that it looks drawn in one unbroken stroke.
- **The stroke is far too thin.** `stroke-width="2"` on a 1000 viewBox becomes a ~0.5px hairline at card size. It disappears.
- **Hard to read at a glance.** pain-missed and pain-afterhours aren't understandable in 2 seconds.
- **The gold detail is too small or too faint** to register.

### How to do it this time
1. **Draw them with the image generation model, not hand-coded SVG paths.** Generate each illustration as high-res continuous line art (2048px, pure ink line on plain off-white), then **vectorise** it to SVG (vtracer / potrace / Illustrator Image Trace with centreline tracing if available). Clean the result: merge it into as few paths as possible and remove stray nodes.
2. **Quality bar:** look at Picasso's one-line animal drawings, and at continuous line art on Dribbble/Behance for "one line drawing" by professional illustrators. Elegant, fluid, confident curves with correct proportions. People have real anatomy and gesture (hands, shoulders, posture), not circles and sticks.
3. **Stroke:** it must look like **~2.5px at 400px wide** in the final render. In a 1000 viewBox that's `stroke-width` **6–7**, with round caps and joins. Use `vector-effect="non-scaling-stroke"` only if we decide on a fixed px weight at build.
4. **Composition:** **object-led, fewer people.** Lead with the objects of the story (phone, chat bubble, shop door, coffee cup, calendar). When a person appears, show a close crop (hands, head and shoulders), never a full-body stick figure.
5. **Gold:** exactly one detail, **solid fill or 6–7 stroke** in `#D4AF37`, large enough to be seen at thumbnail size (≈ 6–10% of the drawing area).
6. **Loops:** the line should *start* with the small logo-style loop and *end* naturally. Don't add a loop on every segment.
7. **Readability test:** shrink it to 200px wide. Could a stranger say what's happening in 2 seconds? If not, simplify.
8. Keep `id="river-line"` (ink path) and `id="gold-detail"` on the two layers so we can animate the line drawing on scroll.

### Revised scene briefs (simpler, clearer)

| File | Scene (object-led) | Gold detail |
|---|---|---|
| `pain-missed` | Close-up of two hands holding scissors and a comb, mid-cut; beside them a phone lying on a counter with a stack of 3 unread chat bubbles rising out of it | The unread badge on the phone |
| `pain-leave` | A hand holding a phone showing a messy, broken website; the thumb is about to swipe away | A small "×" / exit arrow on screen |
| `pain-repeat` | One speech bubble with "?" copied five times in a neat stack, like a pile of paper on a counter, with a tired hand resting on it | The top bubble |
| `pain-afterhours` | A shop door with a hanging "Closed" sign (the sign is blank, no text) at night, moon above; through the glass, a phone on the counter | The phone screen (filled rectangle) |
| `step-1-talk` | Two coffee cups on a table, two hands gesturing over them mid-conversation | One coffee cup |
| `step-2-build` | Two hands placing a website "card" into a browser frame, like a puzzle piece | The piece being placed |
| `step-3-customers` | An open shop door with three pairs of feet / shoes walking in (cropped, no stick bodies) | A tick above the door |
| `404` | A deckchair beside a small "back soon" sign (blank sign, no text), a chat bubble on a stand still "talking" | The chat bubble |
| `form-success` | A paper plane flying along a looping path (the river line itself) into an open hand | A tick on the plane's wing |

Deliver: `illustrations/<name>.svg` (vectorised, cleaned) + `<name>.png` (2048px, transparent), then regenerate `illustration-review.png`.

**Prompt (use per scene):**
```
Continuous single line drawing, one unbroken fluid black ink line (#0F0F10), elegant and confident like a professional illustrator's one-line art, correct proportions and natural gesture, medium-weight line, plenty of empty space, plain off-white background #F6F5F1. Scene: [SCENE]. Exactly one element, [GOLD DETAIL], is filled in flat gold #D4AF37. The line starts with a small loop. No shading, no hatching, no extra colours, no text, no letters, no gradients, no 3D. Square composition, subject centred with generous margins.
```

---

## 2. Icons: redo 2

- **`icon-handover.svg`**: the current icon is muddled; the bubble and hands overlap into a blob. New concept: **one speech bubble with a small arrow curving from it into a simple person/head-and-shoulders outline.** Same 24px grid, 1.5 stroke, round caps.
- **`icon-whatsapp-like.svg`**: it's too close to the real WhatsApp logo (trademark risk). New concept: **a rounded-square chat bubble with a phone handset inside it, with the tail at bottom-left and no circle.** It must not resemble the WhatsApp mark.

---

## 3. Small fixes

- **`ads/ad-a-1x1.png`**: add the short gold underline under the headline, to match the 4:5 and 9:16 versions and the other ads.
- **`ui/mock-before-after.png`**: `thegardenrestaurant.co.uk` could be a real business. Change it to an obviously fictional domain, e.g. `gardenkitchen-demo.co.uk`, in both URL bars.
- **`photography/final-cta-night.jpg`**: lift the shadows slightly (+10–15% exposure in the midtones) so the shopfront is visible on screens. It's currently nearly pure black.

---

## Not needed from Codex
Logos (supplied from the brand guide by the client), the interactive chat demo and the icon→arrow morph (both built in code), and real testimonials (supplied by clients).
