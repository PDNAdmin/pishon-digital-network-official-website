# PDN asset changelog

## Round 2 — 2026-11-16

Replaced at the existing canonical paths:

- `ads/ad-a-1x1.png`
- `ads/ad-a-4x5.png`
- `ads/ad-a-9x16.png`
- `ads/ad-b-1x1.png`
- `ads/ad-b-4x5.png`
- `ads/ad-b-9x16.png`
- `ads/ad-c-1x1.png`
- `ads/ad-c-4x5.png`
- `ads/ad-c-9x16.png`
- `icons/icon-handover.svg`
- `icons/icon-whatsapp-like.svg`
- `illustrations/404.png`
- `illustrations/404.svg`
- `illustrations/form-success.png`
- `illustrations/form-success.svg`
- `illustrations/pain-afterhours.png`
- `illustrations/pain-afterhours.svg`
- `illustrations/pain-leave.png`
- `illustrations/pain-leave.svg`
- `illustrations/pain-missed.png`
- `illustrations/pain-missed.svg`
- `illustrations/pain-repeat.png`
- `illustrations/pain-repeat.svg`
- `illustrations/step-1-talk.png`
- `illustrations/step-1-talk.svg`
- `illustrations/step-2-build.png`
- `illustrations/step-2-build.svg`
- `illustrations/step-3-customers.png`
- `illustrations/step-3-customers.svg`
- `photography/about-team-placeholder.jpg`
- `photography/door-assistant.jpg`
- `photography/door-website.jpg`
- `photography/final-cta-night.jpg`
- `photography/hero-clinic.jpg`
- `photography/hero-clinic-mobile.jpg`
- `photography/hero-restaurant.jpg`
- `photography/hero-restaurant-mobile.jpg`
- `photography/hero-salon.jpg`
- `photography/hero-salon-mobile.jpg`
- `photography/hero-shop.jpg`
- `photography/hero-shop-mobile.jpg`
- `photography/pain-1-busy-hands.jpg`
- `posters/testimonial-clinic-placeholder.jpg`
- `posters/testimonial-clinic-placeholder-mobile.jpg`
- `posters/testimonial-restaurant-placeholder.jpg`
- `posters/testimonial-restaurant-placeholder-mobile.jpg`
- `posters/testimonial-salon-placeholder.jpg`
- `posters/testimonial-salon-placeholder-mobile.jpg`
- `posters/testimonial-shop-placeholder.jpg`
- `posters/testimonial-shop-placeholder-mobile.jpg`
- `ui/mock-before-after.png`


Re-reviewed and retained neutral assets (explicitly approved in the revision brief; no people or nationality-specific scenes):

- `icons/icon-arrow-right.svg`
- `icons/icon-assistant.svg`
- `icons/icon-browser-leave.svg`
- `icons/icon-calendar-check.svg`
- `icons/icon-chart-up.svg`
- `icons/icon-edit.svg`
- `icons/icon-message-missed.svg`
- `icons/icon-moon-phone.svg`
- `icons/icon-phone-fast.svg`
- `icons/icon-play.svg`
- `icons/icon-plus.svg`
- `icons/icon-repeat-questions.svg`
- `icons/icon-search-pin.svg`
- `icons/icon-shield.svg`
- `icons/icon-website.svg`
- `ui/booking-card.svg`
- `ui/browser-frame.svg`
- `ui/chat-bubbles.svg`
- `ui/mock-chat-booking.png`
- `ui/phone-frame.svg`


Deleted and rebuilt:

- `_work/` and all 
392
 temporary files: generated candidates, rejected variants, native detail crops, tracing previews, scripts, dependencies and package cache. Exact deleted paths are in `cleanup-report.json`.
- `round2-baseline.json`: temporary dimension baseline; verification is retained.
- `photography-review.png`, `illustration-review.png`, `ads-review.png`: deleted and regenerated from current files.
- `../pdn-generated-assets.zip`: stale archive deleted and rebuilt without work, scripts, or review sheets.

Corrections made during review:

- Rejected the first customer-arrival illustration because it displayed shoes rather than three pairs entering. Replaced both SVG and PNG.
- Corrected a VTracer stacking/order artefact that made the 404 sign gold; cutout tracing keeps only the speech bubble gold.
- Corrected campaign C phone orientation/screens so an unread notification is visible. Removed generated phone wallpaper gradients.
- Corrected both browser domains to `gardenkitchen-demo.co.uk`; replaced British restaurant content with fictional Nigerian dining content.
- Redesigned handover and generic phone-chat icons.
- Nine illustration pairs now use model-generated source art, two-colour VTracer compound paths, and transparent 2048×2048 PNGs. The revised square prompt overrides legacy illustration ratios.
- Every photograph, poster and ad with people was regenerated with explicit Black Nigerian casting and modern Nigerian settings. Original raster dimensions and mobile crop dimensions are preserved. No photographic upscaling or skin retouching.

Quality and verification:

- No selected photograph or ad still shows an obvious realism or casting failure in the completed visual review. Nationality is specified in generation prompts; it cannot be independently established from pixels.
- Team and interview portraits remain clearly labelled fictional layout placeholders.
- Filled contour SVGs use reveal masks for draw animation; they are not hand-coded stick figures or guaranteed open centreline paths.
- SHA-256, perceptual duplicate, dimension, transparency, pair coverage, and prompt coverage checks passed. Intentional SVG/PNG pairs and mobile crops are documented derivatives, not accidental copies.
- No unexpected round-1 image survivors remain. Twenty approved neutral assets are explicitly re-approved rather than falsely described as regenerated.


Two cumulative phone-screen edits were rejected after they introduced visible smoothing. Fresh 4:5 and 9:16 campaign-C photographs were generated and reviewed instead.


## Round 3 - professional testimonial placeholders

Added three fictional Nigerian professional-owner thumbnails and matching mobile crops:

- `posters/testimonial-realestate-placeholder.jpg`
- `posters/testimonial-realestate-placeholder-mobile.jpg`
- `posters/testimonial-law-placeholder.jpg`
- `posters/testimonial-law-placeholder-mobile.jpg`
- `posters/testimonial-hotel-placeholder.jpg`
- `posters/testimonial-hotel-placeholder-mobile.jpg`

Landscape files: 1672 x 941. Mobile crops: 522 x 928, framed on faces, hands and lit message phones. Matched the approved clinic/salon documentary references; reviewed native skin/hair/hand detail, grain, settings and phone visibility. No upscaling or skin retouching.

Exact prompts and crop rectangles added to prompts.json; six records added to manifest.json. Photography review regenerated with the three new originals. Existing photographs, crops, other review sheets, gallery and archive were preserved. Temporary generation and review files removed.



## Demo and showreel asset batch — 2026-11-16

Added 10 customer avatars, 5 chat media photographs, 6 phone plates in both requested orientations, 5 showreel backgrounds, 6 model-generated and vectorized illustration pairs, and 7 hand-authored icons. Added screen-corners.json, six lossless PNG plate companions, a review gallery and verification report. Exact selected prompts and processing details are recorded in prompts.json and manifest.json.

Rejected apartment drafts with artificial surface texture, a follow-up plane pointing away from the hand, and two portrait compositions with undersized screens; regenerated before approval. All rejected candidates, diagnostic crops and corner-overlay test renders were deleted with _work. No previous asset was overwritten. JPEG alters exact RGB values; the paired PNG plates retain flat #00FF00. Photos were resized conventionally to the requested dimensions; no AI upscaling or skin smoothing was used.
