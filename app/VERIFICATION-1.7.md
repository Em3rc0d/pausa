# Verification · Pausa 1.7.0

## What the evidence establishes

The guide uses a real local generative Transformer to choose catalog indices and order. Candidate filtering alone cannot display a routine. Decoding and a separate validator enforce structural relevance and exclusions. This evidence does not establish medical appropriateness, optimal selection, or clinical validation of any GIF.

## Automated source checks

`npm run check`: 31/31 passed in Node 24. Covers candidate-only preparation, preserving model selection/order, rejecting malformed/invented/duplicate/redundant outputs, multiple-target coverage, whole-body diversity, position/exclusion matrices, ambiguity/conflicts, symptom/important-pain overrides, omissions, unavailable media, prompt separation, variation, runtime/version wiring and existing activity/media checks. All 112 GIF and 112 poster originals retain their integrity.

## Real model inference

Pinned Qwen2.5-0.5B-Instruct q8 weights, Transformers.js 3.8.1, native ONNX CPU for reproducible execution. These are observed selections, not approved clinical examples:

| Context | Actual selected IDs |
|---|---|
| Hands tired from writing | forearm-turn-bilateral; fingers-bilateral; wrist-flex-bilateral |
| Another hand combination | forearm-turn-bilateral; fingers-bilateral; wrist-extend-bilateral |
| Stiff neck | shoulder-backward-bilateral; shrug-bilateral; neck-turn-bilateral |
| Tired legs | seated-march-bilateral |
| Full-body pause | shoulder-backward-bilateral; ankle-circle-bilateral; wrist-circle-bilateral |
| Lower back, floor enabled | pelvic-tilt; cat-cow; knee-rolls |
| Hands and legs | forearm-turn-bilateral; fingers-bilateral; seated-march-bilateral |

All seven outputs passed the independent structural validator. Native warm inference in this container took about 1–2.4 s; that is not a browser/mobile latency promise. Before constrained decoding, the same small model produced malformed output and frequent abstention. Those failures were rejected, and that unrestricted path is not shipped. The token grammar guarantees only the formal combination constraints, not clinical judgment or sophisticated reasoning.

## Real browser/WASM journeys

Headless Chromium 153; exact installed 3.8.1 runtime and pinned real model files served locally to isolate inference from download availability. No simulated model output was used for these flows:

1. Real WASM inference composed a hand-related routine.
2. Another request produced a different compatible set.
3. An omitted ID stayed excluded during subsequent inference.
4. The resulting routine started and paused.
5. Hands at 7/10 yielded professional-evaluation guidance and zero exercise cards, never a foot routine.
6. Changing to the neck composed neck-related movements.
7. Widths 320, 390, 768, 1024 and 1440 had no horizontal overflow.
8. Axe found zero WCAG 2 A/AA and 2.1 AA violations in the composed result. Automated checking is not certification.
9. Cancellation discarded the pending result and restored the form.
10. With Worker unavailable, the UI reported failure and showed zero automatic exercises; no deterministic AI substitute appeared.

## Public-host cold-start verification

A second real Chromium/WASM run used the unmodified production worker URLs, public jsDelivr runtime and pinned Hugging Face weights, over the configured network proxy. The cold composition succeeded and returned `forearm-turn-bilateral` for a hand goal. This checks actual public-host loading in this environment; it does not establish availability or performance on every network/device.

## Publication

Cloudflare production deployment `e192e038-7c2a-4f07-a082-64e2c5a3a131` succeeded on 2026-10-18 at 05:41:05 UTC (00:41:05 America/Lima). Canonical project deployment matches this ID.

- https://pausa-homeoffice.pages.dev/
- https://e192e038.pausa-homeoffice.pages.dev/

## Remaining limits

All annotation, movement suitability, timing, and the conservative intensity policy remain pending professional review. Only the 23 annotated IDs are automatic candidates; all 112 remain browsable. A small model can satisfy structural constraints without choosing the best possible movement. General target interpretation still requires a recognized description or explicit zone; ambiguous/conflicting goals ask for clarification. No promise of clinical reasoning is made.

The q8 model alone is 512,096,557 bytes plus runtime/tokenizer and requires substantial device memory. Physical phones, low-memory devices, full-library offline download and installed-PWA migration were not validated in this run. External-host availability and browser caches affect cold start; the app has a 180 s timeout, cancellation and explicit failure. The HTML preview disables composition and directs the person to the live site; it does not pretend to execute the model.
