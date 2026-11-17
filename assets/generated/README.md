# PDN generated assets — round 2

Open `index.html` in a browser to review the complete local gallery. `manifest.json` lists file dimensions, formats, transparency, and placeholder status.

Source briefs: `../asset-prompts.md`, `../codex-revisions.md`, and the round-2 Nigerian casting and realism direction; design: `../../design/design-plan.md`.

- `photography/`: documentary-style generated images, business hero variants, and 9:16 mobile crops.
- `illustrations/`: nine model-generated, object-led continuous-contour drawings, vectorised with VTracer and cleaned into two compound SVG paths, `river-line` and `gold-detail`. Every PNG is a transparent 2048×2048 render of its paired vector. The revised square illustration prompt overrides round-1 illustration ratios. These are filled outline traces; draw animation needs a reveal mask rather than directly animating an open centreline stroke.
- `icons/`: the 16 requested 24px, 1.5px stroke SVG icons, plus a right arrow.
- `ui/`: generated booking and before/after mockups plus editable SVG phone, browser, bubbles, and booking-card objects.
- `posters/`: fictional salon, restaurant, clinic, and shop interview poster placeholders, plus vertical crops.
- `ads/`: A, B, and C creative in square, 4:5, and 9:16 formats, using the specified headlines.

Round-2 photographs, posters, ads, and illustration source art use the built-in image generation tool. All photographic casting is explicitly Black Nigerian, in modern Nigerian business settings. Photos are reviewed at native resolution for exposed skin texture, hair, hands, lighting, grain, and coherent objects. No photo upscaling, skin smoothing, beauty retouching, or AI enhancement is used. Raster exports preserve round-1 pixel dimensions except the revised square illustrations. The two revised icons use native SVG. The approved neutral icons and UI components are re-reviewed and retained; their records explicitly say `reapproved` rather than claiming new generation.

`prompts.json` contains only round-2 generation, editing, tracing, crop, and reapproval records. `manifest.json` records dimensions, round, review notes, modification time, and SHA-256 hashes. `verification.json` records duplicate, perceptual similarity, dimension, and coverage checks. `inventory-before-round2.json` preserves the requested initial file inventory with original modification dates and hashes. `CHANGELOG.md` records replacements, deletions, retained approvals, and any unresolved quality issues.

Team and testimonial images are **fictional layout placeholders**, not PDN staff or actual clients. The before/after image is a fictional design reference. Replace these with real photographs and client screenshots before publication. No testimonial claims are included. No PDN or third-party logos were generated; supply official files separately. Ad typography is generated sans-serif approximating Satoshi; re-typeset in licensed Satoshi for exact brand typography.

Real testimonial videos, official brand files, the live HTML chat demo, and interactive icon morph behavior are implementation or supplied-content tasks rather than generated still assets.

To refresh the inventory, gallery, all three review sheets, and mobile crops, run `powershell -NoProfile -ExecutionPolicy Bypass -File assets/generated/build-catalog.ps1 -CropVariants` from the project root. This only sets execution policy for that process. Hero crops are centred; poster crops use a right-of-centre subject position. Review composition in the target layout.

`../pdn-generated-assets.zip` contains the cleaned delivery files and documentation. It excludes `_work`, build scripts, and review sheets. The gallery excludes review-sheet cards so it also works inside the extracted archive. SVG/PNG versions and mobile crops are intentional derived deliverables, not accidental duplicate assets.
