# Gates de release

| Gate | Prueba exigida | Estado |
|---|---|---|
| G01 | árbol/commit SHA e identificación de cambios | CANDIDATE |
| G02 | npm run check completo; integridad de 112 GIF y posters | PASS 61/61 sobre 4faee29; check:repository PASS (19-10-2026) |
| G03 | end-to-end rutina sentada y alertas en navegadores reales | 3/3 flujo básico PASS en Windows; accesibilidad/dispositivos PENDIENTES |
| G04 | instalación PWA, upgrade SW, offline, cuota | PASS manual: instalación + offline; actualización/cuota PENDIENTES |
| G05 | notificaciones granted/denied; suspensión, múltiples tabs, horario, DST | PASS manual: aviso inmediato + sincronización preferencias dos pestañas; vencimiento/suspensión/DST PENDIENTES |
| G06 | accesibilidad real, revisión profesional de movimientos y claims | SEMÁNTICA/CONTRASTE: RC PENDIENTE QA; evaluación profesional PENDIENTE |
| G07 | beta consentida, experiencia repetida y retención a 14 días | PENDIENTE |
| G08 | checkout, derecho del cliente, facturación, impuestos, reembolsos y soporte | PENDIENTE |
| G09 | rollback, titularidad de marca/dominio, contacto comercial y operaciones | PENDIENTE |
| G10 | app Android firmada y aprobada por Play Store si se decide | FUTURO |

GO beta web limitado requiere G02–G06. GO venta real requiere G02–G09 y decisión expresa del propietario. No confundir presencia de tests o despliegue exitoso con certificación de producto.
