# MK3 · Mining-site: normas y referencias primarias

Fecha de consulta base: 22-10-2026. Fuentes públicas, no evidencia de que Pausa satisfaga los criterios.

| Fuente | Alcance justificable | Límite |
|---|---|---|
| W3C, WCAG 2.2, https://www.w3.org/TR/WCAG22/ | comprobar teclado, ausencia de trampas, orden/foco, reflow, contraste, nombre accesible, movimiento | cumplimiento requiere evaluación del producto real; tests DOM no certifican WCAG |
| W3C Understanding WCAG, https://www.w3.org/WAI/WCAG22/Understanding/ | interpretación de criterios de éxito para QA manual y asistivo | técnicas son explicativas, no un sello de certificación |
| MDN Notifications API, https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API | diferencias entre notificaciones no persistentes y de Service Worker | no garantiza disparo programado con app/pestaña cerrada |
| MDN Push API, https://developer.mozilla.org/en-US/docs/Web/API/Push_API | infraestructura requerida para push genuino en background | Pausa v1.12 no tiene servicio de push remoto |
| Autoridad Nacional de Protección de Datos Personales, D.S. N.° 016-2024-JUS, https://www.gob.pe/institucion/anpd/normas-legales/6554453-n-016-2024-jus | reglamento de LPDP peruana y deber de evaluar protección de datos | no implica evaluación legal concluida del estudio |
| ANPD, vigencia 31-03-2025, https://www.gob.pe/institucion/anpd/campa%C3%B1as/128319-nuevo-reglamento-de-proteccion-de-datos-personales | fecha de vigencia publicada | verificar obligaciones concretas con asesoría aplicable |

## Procedencia interna
- [MK2 RELEASE-GATES](../../mk2/plan/RELEASE-GATES.md) contiene gates canónicos G01–G10.
- [MK2 BETA-PILOT](../../mk2/plan/BETA-PILOT.md) ya exigía reclutamiento voluntario de 10–20 y ventana de 14 días, **nunca ejecutada**.
- [QA Chromium 22-10-2026](../../mk2/test/BROWSER-SMOKE-2026-10-22.md) evidencia navegación y flujo funcional **sin evaluación asistiva o profesional**.
- [Acta MK2](../../PROJECT-CLOSURE-2026-10-22.md) congela versión y bloquea lanzamiento comercial.

## Categorías de procedencia
- **OFFICIAL:** normas/especificaciones W3C, ANPD, MDN (documentación técnica primaria).
- **OBSERVED:** pruebas con navegador y resultados nativos del usuario registrados con fecha/SHA.
- **INFERRED:** hipótesis y umbrales iniciales del piloto, no resultados.
- **PROPOSED:** acciones P1–P5 todavía sin ejecutar.

No usar la existencia de este documento como verificación del cumplimiento legal, médico o comercial.
