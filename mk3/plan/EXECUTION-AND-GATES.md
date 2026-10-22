# MK3 · Plan ejecutivo y gates de decisión

**Objetivo inmediato:** obtener un **GO de piloto controlado**, no un GO comercial. Fecha de planificación: 22-10-2026. La demo gratuita permanece accesible, pero **no se anuncia como beta aprobada**.

## Fases en orden, con evidencia

| Fase | Acción | Responsable por rol | Evidencia/exit |
|---|---|---|---|
| P0 — Setup | fijar versión y protocolos, designar custodio de datos y responsable de incidencias | propietario/product lead | documentos y baseline firmados |
| P1a — QA | terminar G03–G05 según matriz: dispositivos, upgrade SW/cuota, alertas programadas y degradaciones | QA independiente + responsable técnico | capturas/logs redactados, casos PASS/FAIL vinculados a versión |
| P1b — Inclusión | QA WCAG con teclado real, lector, zoom, controles y movimiento reducido | tester de accesibilidad | reporte con severidades, remediación crítica |
| P1c — Contenido | revisar profesionalmente **todo movimiento e instrucción accesible** en el piloto y claims/red flags | profesional competente en terapia física y rehabilitación, habilitación comprobada por responsable | dictamen fechado de cada unidad: APROBAR / MODIFICAR / RETIRAR, con límites y firma |
| P1d — Privacidad | consentimiento separado, contacto, custodia, baja y retención; conformidad operacional y normativa aplicable | responsable de datos (+ asesoría legal si corresponde) | consentimiento final, mecanismo real de retiro y custodia comprobada |
| **P1 → P2 gate** | comité mínimo: propietario + responsable técnico + responsable de contenido | responsables identificados | acta explícita GO/HOLD/STOP con rutas a recibos |
| P2 — Captación | adultos voluntarios 12–20; contexto de uso y mezcla de dispositivo; **no** reclutar antes del GO P1 | coordinador del estudio | elegibilidad/consentimiento y denominador N |
| P3 — 14 días | D0, D7, D14 y retirada voluntaria; sin telemetría agregada por defecto | coordinador | registro privado mínimo por alias |
| P4 — Análisis | resultados, pérdidas, alternativas, riesgos y límites | analista independiente o revisión cruzada | informe GO/PIVOT/KILL con métricas completas |
| P5 — Comercial | solo tras P4 positivo evaluar compradores, dos propuestas de oferta/precio y G08/G09 | responsable de negocio/legal | plan económico y autorización expresa; no cobros prematuros |

**No inventar fechas de piloto**: la fecha de inicio depende de P1; 14 días se cuentan por participante desde su D0. La validación con usuarios no se ejecuta en segundo plano por el asistente.

## Reglas de P1
- **STOP inmediato** ante red flag de seguridad desatendida, daño plausible por instrucción, fuga de datos, imposibilidad de abandonar rutina o inaccesibilidad crítica sin alternativa real.
- **HOLD** ante actualización del Service Worker que rompa offline/sesiones, duplicaciones no controladas, trampa de teclado, nombres accesibles vacíos de controles principales o contenido sin revisión profesional.
- Avisos con navegador cerrado **no** son criterio de éxito porque el producto no lo promete; sí lo son precisión del texto y degradación honesta con permisos denegados/suspensión.
- Si un defecto exige cambiar código, abrir **hotfix acotado**, referenciar incidencia, ejecutar `npm run check`, repetir smoke pertinente y congelar nuevo SHA/versionado. No introducir nuevas features.
- Prueba de accesibilidad debe cubrir la ruta completa (consentimiento de seguridad, rutina, modal, finalización y actividad) en Chrome/Firefox y al menos un lector asistivo real.

## Criterio GO P1 (cumulativo)
1. Cero incidencias de severidad S0/S1 abiertas, y las S2 que afecten acceso a funciones esenciales tienen solución probada.
2. G03 esencial y G04/G05 en comportamientos **prometidos** aprobados con evidencia física; limitaciones no prometidas comunicadas.
3. G06 prueba real de accesibilidad, más dictamen profesional **favorable** del material accesible; el consentimiento preflight de la app no sustituye dictamen.
4. Consentimiento/privacidad/contacto y protocolo de incidentes listos.
5. Firma/decisión registrada del propietario. Sin 1–5, **HOLD**, aunque el sitio esté publicado.

## Dependencias abiertas ahora
| ID | Bloqueo | Evidencia existente | Evidencia faltante |
|---|---|---|---|
| G04 | PWA | instalación/offline Windows previos | actualización desde SW viejo, cuota/recovery, dispositivos |
| G05 | aviso | aviso inmediato y preferencias 2 pestañas previos | vencimiento real en dos pestañas, suspensión, permiso negado, horario |
| G06a | acceso | semántica/contraste en tests; 18 vistas Chromium | Tab/Escape/foco real, NVDA/VoiceOver, zoom, CSS computado completo |
| G06b | movimientos | advertencias y prompts en código | dictamen profesional de todos los movimientos disponibles |
| PRIV | datos | app local-first | titular, custodia, consentimiento del estudio, mecanismo de borrado |

## Qué está fuera de MK3
No pagos reales, no backends, no Play Store, no marketing como producto de salud, no nuevas rutinas ni nuevas capacidades IA, no GitHub Actions. MK3 mide y decide.

Enlace a [matriz técnica](../test/PREFLIGHT-CHECKLIST.md), [piloto](PILOT-MEASURES.md), [cierre MK2](../../PROJECT-CLOSURE-2026-10-22.md).
