# Gates de release

| Gate | Prueba exigida | Estado |
|---|---|---|
| G01 | árbol/commit SHA e identificación de cambios | INTEGRADO EN MAIN mediante PR #6 (merge 17bd62ed); CS-04 PR #4 y G06 PR #5 incluidos. Este estado no equivale a GO de despliegue |
| G02 | npm run check completo; integridad de 112 GIF y posters | **PASS — 69/69 pruebas, 0 fallos**; `check:repository` PASS en `main@2b70b650` (Windows, 19-10-2026): 293 archivos de inventario, 49 documentos, 101 enlaces locales, 112 GIF y 112 PNG íntegros. Incluye CS-04 y G06. Cualquier cambio posterior de código requiere reevaluación |
| G03 | end-to-end rutina sentada y alertas en navegadores reales | 3/3 flujo básico PASS en Windows; accesibilidad/dispositivos PENDIENTES |
| G04 | instalación PWA, upgrade SW, offline, cuota | PASS manual: instalación + offline; actualización/cuota PENDIENTES |
| G05 | notificaciones granted/denied; suspensión, múltiples tabs, horario, DST | PASS manual: aviso inmediato + sincronización preferencias dos pestañas; vencimiento/suspensión/DST PENDIENTES |
| G06 | accesibilidad real, revisión profesional de movimientos y claims | Correcciones semánticas y de contraste incorporadas (PR #5); test de contraste específico 3/3 en V8 aislado; teclado, lector, zoom, cascada CSS real y profesional PENDIENTES |
| G07 | beta consentida, experiencia repetida y retención a 14 días | PENDIENTE |
| G08 | checkout, derecho del cliente, facturación, impuestos, reembolsos y soporte | PENDIENTE |
| G09 | rollback, titularidad de marca/dominio, contacto comercial y operaciones | PENDIENTE |
| G10 | app Android firmada y aprobada por Play Store si se decide | FUTURO |

GO beta web limitado requiere G02–G06. GO venta real requiere G02–G09 y decisión expresa del propietario. No confundir presencia de tests o despliegue exitoso con certificación de producto.

**Separación de estados:** integrar código en `main` no equivale a desplegar Pages, aprobar beta ni habilitar monetización. G04/G05 conservan aceptación parcial de las pruebas manuales previas, sin revalidación innecesaria. La actualización SW/cuota, vencimiento y suspensión, accesibilidad real y evaluación clínica siguen abiertas.


## Disposición de cierre técnico — 22-10-2026

El propietario solicitó finalizar la iteración v1.12.0 sin prolongar el desarrollo por inercia. **Se cierra el alcance de ingeniería, no se declaran superados los gates pendientes.** La aplicación gratuita sigue publicada como demostración sin monetización.

- Evidencia adicional: [smoke Chromium remoto en producción](../test/BROWSER-SMOKE-2026-10-22.md), **18/18 vistas (6 rutas × 3 viewports: 360, 768, 1280)** sin overflow horizontal y sin nombres vacíos detectados en enlaces/botones visibles; flujo `Pausa sentado` completo, prechequeo→registro de 11 s. Esto **refuerza G03**, pero no constituye E2E exhaustivo ni accesibilidad asistiva.
- Evidencia del despliegue: Cloudflare Pages producción `e4568010-190c-4ee5-a66b-40c657e21808` con status `success` (19-10-2026 22:31 Lima), commit `6d403180` (solo documentación posterior al SHA de código probado `2b70b65`).
- **G04 y G05 siguen PARCIALES. G06 sigue PARCIAL. G07–G09 NO CERRADOS; G10 futuro/fuera de esta versión. No hay GO beta ni comercial.**
- Se congela la versión técnica v1.12.0. Excepciones de reapertura: defecto grave, exigencia de revisión profesional o nueva decisión validada. Véase [acta de cierre](../../PROJECT-CLOSURE-2026-10-22.md).
