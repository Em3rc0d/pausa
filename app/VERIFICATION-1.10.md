# Verification · Pausa 1.10.0

## Contract

A routine requires the fullest feasible selection of distinct movement families, up to three. Higher fatigue shortens each movement to 20 s instead of reducing routine count. Lumbar seated routines retain direct trunk coverage and explicitly labeled complements for legs/hips and shoulders; no region is relabeled as lumbar. Exclusions, positions, and explicit alarm interrupts remain in force. Complements do not establish clinical suitability.

## Source checks

`npm run check`: 39/39 passed. Includes exact reported lumbar text, seated fatigue 7, mandatory full length, complement budget/region diversity, direct-target coverage, floor priority, exclusions and truly limited catalogs, actual alternative availability, and all previous functional checks.

Original 112 GIF and 112 poster SHA-256 checks pass. The newly annotated seated-overhead asset already existed. There are 25 annotated candidates; no media was generated or edited.

## Browser and publication

Chromium 153 ran the unmodified generative worker with the public Transformers.js CDN and pinned public WASM q8 model. The exact reported input, automatic lumbar region, seated position and fatigue 7 produced three original movements (60 s), with one directly labeled target and two explicitly labeled complements. Another valid combination was generated. Start/pause/exit, prior caution profile, hand mobility, omission, general full-body composition and alarm interruption passed. No JavaScript page errors occurred.

Widths 320/390/768/1024/1440 showed no horizontal overflow. Axe WCAG 2 A/AA and 2.1 AA at 390/1440 reported zero violations. These automated checks are not accessibility certification. Final mobile styling then changed cards from two narrow columns to one full-width column with larger instructions; composition JavaScript is identical.

Cloudflare production deployment `79733829-005b-4983-9444-29cf72f5256c`, https://79733829.pausa-homeoffice.pages.dev/ and https://pausa-homeoffice.pages.dev/. Public real-model smoke check passed with the exact sentence: seated-march-bilateral, seated-side-bend-bilateral and seated-overhead-bilateral, 20 s each, session start/pause/exit and zero JavaScript errors. Final CSS was separately inspected on the canonical production site: a three-card layout fixture confirmed one full-width column and 17px titles at 320/390/650, with no horizontal overflow through 1440. This isolated layout probe did not simulate model inference.

## Limits

Structural validation and a multi-movement result do not establish medical appropriateness. Pending clinical review applies to all movement illustrations and annotations. Model download/memory requirements, cold-start latency, and device-dependent cache behavior remain unchanged. Physical low-memory phones and installed-PWA migration remain unverified.
