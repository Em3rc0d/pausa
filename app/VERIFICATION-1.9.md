# Verification · Pausa 1.9.0

## Scope

General catalog mobility routines, not diagnosis or symptom-specific treatment. The initial notice recommends professional advice for frequent/persistent problems and explains voluntary participation. The change removes the blanket keyword rejection of ordinary descriptions of pain and the mandatory safety modal before guide creation; explicit alarm patterns remain interrupts.

## Source checks

`npm run check`: 37/37 passed. Regressions cover the exact user input «Me duele la parte baja de la columna cuando estoy horas sentado frente a la computadora», automatic lumbar recognition, seated candidates at 7/10, no extra questionnaire for unset safety, previous caution profiles, ordinary pain descriptions, explicit alarms, manual-zone priority, general text fallback, positions/exclusions, model output validation and media/version wiring.

All 112 original GIF and 112 original poster hashes remain unchanged. The seated-side-bend-bilateral asset already existed; it is now one of 24 annotated automatic candidates. Its regional/load annotation is an engineering judgment and remains pending clinical review. No assets were generated or edited.

## Limits

A routine for a body region is not evidence that its movements are suitable for a person's pain. The model selects IDs and order from the supplied catalog and does not diagnose or generate a treatment. Alarm detection is conservative pattern matching, not a validated medical assessment. A disclaimer is not treated as clinical approval.

The 512 MB q8 model, runtime/tokenizer download, cache/memory dependence, 180 s timeout, cancellation and explicit inference failure behavior are unchanged. Previous browser/production evidence is retained in VERIFICATION-1.7.md and VERIFICATION-1.8.md. Physical low-memory phones, installed-PWA migration and comprehensive offline behavior remain unverified.

## Actual browser inference

The exact user text was executed in Chromium 153 with the unmodified worker, public Transformers.js 3.8.1 CDN and pinned public Qwen2.5 q8 model. Automatic zone detection resolved lumbar; default seated position, fatigue 7/10 and an unset safety profile produced `seated-side-bend-bilateral`, a decoded original GIF, and a 20 s routine without a questionnaire. Start, pause and exit worked. Repeating with a prior caution profile retained its notice and still showed the general routine. Ordinary hand-pain text produced hand-related movements; variation and omission preserved the region/exclusions. These are functional observations, not clinical suitability evidence.

General-text fallback and explicit-alarm interruption also passed. Widths 320, 390, 768, 1024 and 1440 had no horizontal overflow; mobile/desktop Axe WCAG 2 A/AA and 2.1 AA checks reported zero violations. No JavaScript page errors occurred. Automated accessibility checks are not certification.

## Publication

Cloudflare Pages production deployment `21af08d7-513e-46d7-b739-83a34c71798c` published on 2026-10-18. Public URL https://pausa-homeoffice.pages.dev/ and version URL https://21af08d7.pausa-homeoffice.pages.dev/.

Production smoke check passed with the exact user sentence: v1.9.0, automatic lumbar detection, real public-model WASM inference, seated-side-bend-bilateral GIF, no mandatory questionnaire, session start/pause/exit, 390px layout and zero JavaScript page errors.
