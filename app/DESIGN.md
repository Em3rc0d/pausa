# Pausa · Visual system 1.5

## Intent
A calm personal movement space. The main task is to take a short break; the contextual guide is the second entry point. Users choose a body zone, describe their experience if needed, select discomfort intensity, review precautions and see illustrated movements.

## Provenance
- OBSERVED: Pausa 1.4.2 source, six sections, 112 full-body GIF/poster pairs, local history and deterministic safety rules.
- GENERATED: revised visual language, editorial headings, image-led routine cards, body-zone symbols, form layout and responsive rules in 1.5.
- PRESERVED: original media, their licenses, the routine catalog, safety thresholds and local storage key `pausa.local.v1`.
- No clinical validation is claimed. Semantic model similarity is not medical confidence.

## Tokens
| Purpose | Value |
|---|---|
| Canvas | `#f7f8f4` |
| Surface | `#ffffff` |
| Main text | `#183e34` |
| Main action | `#285f46` |
| Hero | `#1f4e3b` |
| Hero action | `#dfecb2` |
| Secondary text | `#586f59` |
| Divider | `#e1e7de` |
| Selected zone | `#eff4e5` with `#78975b` outline |
| Cards | 13–20px corner radius |
| Buttons | 10px corner radius; primary actions ≥44px tall |
| Type | System sans-serif; Georgia italic for short display accents |

The existing stylesheet is retained for the session player and established screens. The explicitly labeled 1.5 section defines the new design; final contrast refinements take precedence over earlier secondary-text colors.

## Components and behavior
- Hero: one primary start action, actual routine duration and original local illustration.
- Reminders: explicit opt-in; notices work while the application is open. Mobile uses a compact card instead of the desktop dial.
- Routine cards: image, duration, name, short description and movement count. Images remain illustrative.
- Guide: six body-zone buttons, optional text when a zone is selected, intensity slider with textual value, contextual caution, primary create action.
- Safety review preserves the in-memory form draft. Draft descriptions are never written to local storage.
- Results: existing catalog only, visible duration and instructions, motion control. At 6–7/10 the generic nature and medical recommendation remain explicit, with acknowledgement required to start.
- Page navigation: readable hash routes, selected navigation state and main-content focus. Form drafts survive navigation within the open tab.
- Dialogs: named dialog, focus cycling, inert background and focus restoration. Escape closes ordinary dialogs; active sessions retain their established exit behavior.
- Activity: real recorded sessions only, no fabricated progress or health score.

## Responsive rules
- Above 850px: sidebar and desktop header.
- At or below 850px: bottom navigation and compact header.
- At or below 650px: single-column guide, 3×2 zone controls, compact reminder, 2-column routine and library cards. Decorative guide panel is omitted.
- 320–1440px widths checked for horizontal overflow across all six sections.
- Reduced-motion preference disables transitions and chooses posters instead of autoplayed exercise media.
- Core form text is 16px on mobile to avoid input zoom in common mobile browsers.

## Publication
Use the bundled static assets with Cloudflare Pages. HTML, CSS and scripts carry version 1.5.0; the service-worker shell cache is versioned separately from immutable movement media. No paid inference service, account system or backend is introduced.


## 1.6 selector extension
The visual system is retained. A context disclosure adds position, floor permission and avoid-region preferences. At 6–7/10, a separate explicit opt-in describes a general break outside affected regions. Results include eligible-pool count, per-card reasons/reference disclosure, omission control and an alternative-combination action. No candidates or unresolved context use a visible abstention card. All options are keyboard-accessible; changed constraints invalidate old results. See SELECTION-SPEC.md for the authoritative selection contract.


## 1.8 guide semantics (GENERATED, product direction user-confirmed)

The numeric guide input measures tiredness/stiffness, not pain or exercise effort. High tiredness uses an informational sage notice for a shorter break, rather than the amber medical warning style. Single-movement result cards stay at a readable maximum width and figure height on desktop. A request-cancel button is only visible while a request is active; its hidden state must override the generic button display style.


## 1.9 general-mobility notice (GENERATED, user-requested scope)

A concise notice precedes the form, remains visible without opening a disclosure and introduces the routine as general movement. It recommends professional advice for frequent/persistent problems without adding a mandatory confirmation modal. The existing urgent-symptom notice remains distinct. The user can create, inspect, omit and choose whether to start the proposed routine.
