# Verification · Pausa 1.8.0

## Product contract

The user explicitly selected «Solo cansancio o rigidez» for the guide. The rating is now `fatigue`, not pain intensity. No value from 0 to 10 triggers a medical block by itself. A high rating caps the brief break at two 20-second movements for the requested target. This is a product duration rule, not clinical dosing.

## Source checks

`npm run check`: 35/35 passed in Node 24. New regression cases cover hand fatigue 6–7/10, all fatigue values through 10 across regions, short-break duration/count limits, upper/lower coverage in a two-movement general break, explicit pain outside scope, common pain negations, pain in a second clause, invalid values and legacy ratings that must not be reinterpreted. Existing model-output, exclusion, position, multiple-target, cancellation/version, history and original-media checks remain passing.

All 112 original GIF and 112 original posters retain their integrity. Existing history fields and stored activity were not renamed or reinterpreted.

## Real browser/WASM checks

Chromium 153, Transformers.js 3.8.1, pinned Qwen2.5-0.5B-Instruct q8, actual inference with the exact runtime and weights served locally. These are functional checks, not clinical validation:

- Hands, fatigue 7/10 and «sin dolor»: one or two hand-related movements, 20 seconds each, exact total shown.
- Another combination changes the selected ID set while preserving the target and exclusions.
- An omitted movement stays excluded.
- Starting the generated break uses the displayed short duration.
- Fatigue 6/10 and 10/10 both allow composition.
- General fatigue 7/10 yields two movements covering upper and lower regions.
- Explicit pain gives a separate out-of-scope message and zero automatic exercises.
- Stiff neck without pain at 7/10 yields neck-related movements.
- Five responsive widths and mobile/desktop automated WCAG A/AA checks.
- Cancellation prevents stale output.
- Follow-up real-inference visual check confirms that Cancel is hidden after completion, single-movement cards stay bounded, and mobile/desktop WCAG A/AA scans remain clear.

## Limits

The model still chooses among the 23 annotated IDs; all 112 remain in the library. This is not medical advice, a diagnosis or a clinically validated exercise-selection system. Symptom text checks are conservative patterns, not a validated clinical language model. Structural validation cannot guarantee the best possible selection.

The 512 MB q8 weights plus tokenizer/runtime, cancellation, cache-dependent cold start and 180-second timeout remain unchanged. Public-host loading and real production inference were verified in 1.7; see VERIFICATION-1.7.md. Physical low-memory phones, installed-PWA migration and comprehensive offline behavior remain unverified. The HTML preview is a design preview; real composition runs on the live site.

## Publication

Published to the existing Cloudflare Pages production project on 2026-10-18. Deployment `06e8b2b5-d3e6-4ba1-a301-c187840fcf64` at https://06e8b2b5.pausa-homeoffice.pages.dev/; public URL https://pausa-homeoffice.pages.dev/.
