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
