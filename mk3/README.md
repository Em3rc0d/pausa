# MK3 — Validación independiente de Pausa

**Inicio documental:** 22-10-2026 · **Estado:** PREPARADO / HOLD para reclutamiento, **sin participantes enrolados**.  
**Producto inmutable de referencia:** v1.12.0, despliegue Cloudflare Pages `e4568010`, código probado en `main@2b70b650` (69/69 PASS), artefacto desplegado vinculado a `6d403180`. El código no se modifica en MK3 por defecto.

## Pregunta de decisión
¿Es Pausa suficientemente segura, accesible, útil y diferenciada para justificar un **piloto consentido de 14 días** y, después, una **evaluación comercial separada**, sin añadir funciones por intuición?

MK3 **no es una nueva versión de la app** y no revoca el [cierre de MK2](../PROJECT-CLOSURE-2026-10-22.md).

## Fases con gates

| Hito | Objetivo | Estado inicial |
|---|---|---|
| MK3-P0 | Congelar línea base y preparar documentos, contactos e instrumentos | EN PREPARACIÓN (documentos no son pruebas) |
| MK3-P1 | Resolver verificación restante G03–G06: PWA/SW/cuota, alertas reales, accesibilidad y revisión profesional | **HOLD** |
| MK3-P2 | Incorporar 12–20 personas adultas, solo tras autorización documentada de P1 | **NO INICIADO** |
| MK3-P3 | Observar 14 días calendario completos por participante, con mediciones mínimas | **NO INICIADO** |
| MK3-P4 | Analizar cohortes, entrevistas, adopción y decisión GO / PIVOT / KILL | **NO INICIADO** |
| MK3-P5 | Solo si hay evidencia, evaluar oferta y obligaciones comerciales G08–G09 | **NO AUTORIZADO** |

**Dependencia obligatoria:** P1 aprobada ⇒ se puede abrir P2. La publicación gratuita existente es demostración, no beta validada. Una aprobación comercial no se deduce de que P1 o P3 terminen.

## Artefactos por método MK

- [brainstorming/HYPOTHESES.md](brainstorming/HYPOTHESES.md) — problema, alternativas e hipótesis falsables.
- [design/PARTICIPANT-KIT.md](design/PARTICIPANT-KIT.md) — invitación, consentimiento e entrevistas (plantillas, sin respuestas).
- [arch/DATA-PRIVACY.md](arch/DATA-PRIVACY.md) — límites de datos, custodia y anonimización.
- [plan/EXECUTION-AND-GATES.md](plan/EXECUTION-AND-GATES.md) — secuencia, responsables, decisión de go/no-go.
- [plan/PILOT-MEASURES.md](plan/PILOT-MEASURES.md) — denominadores y umbrales definidos antes de captar.
- [build/OPERATIONAL-RUNBOOK.md](build/OPERATIONAL-RUNBOOK.md) — ejecución sin más funcionalidades, sin CI de pago.
- [test/PREFLIGHT-CHECKLIST.md](test/PREFLIGHT-CHECKLIST.md) — casos QA y registro de evidencia pendientes.
- [quarries/EVIDENCE-REGISTER.md](quarries/EVIDENCE-REGISTER.md) — procedencia y evidencia previa.
- [mining-site/EXTERNAL-REFERENCES.md](mining-site/EXTERNAL-REFERENCES.md) — fuentes primarias y límites.
- [plan/RESULT-TEMPLATE.md](plan/RESULT-TEMPLATE.md) — informe GO/PIVOT/KILL, inicialmente vacío.

## Reglas
1. **NO GO para estudio con ejercicios hasta revisión profesional documentada del contenido al que tendrá acceso la cohorte** y no haya defectos críticos pendientes. Si el profesional limita el alcance, los contenidos fuera de su revisión deben estar realmente inaccesibles para participantes; un aviso por sí solo no crea una barrera técnica.
2. No extraer telemetría sin consentimiento, no usar respuestas de molestias para segmentación ni publicar PII en GitHub. Nunca solicitar exportaciones completas de historial.
3. Priorizar hipótesis, no nuevas features. Defectos de seguridad/funcionamiento críticos se tratan mediante cambio acotado, test nativo y nueva verificación de despliegue.
4. Definir umbrales *antes* de captar; no reportar tasas con denominadores desconocidos ni presentar muestras pequeñas como estimaciones poblacionales.
5. No pagar, no cobrar, no publicar Play Store ni prometer recordatorios con la aplicación cerrada en esta fase.

**Siguiente acción humana desbloqueante:** conseguir evaluación profesional del conjunto de movimientos accesible y realizar el checklist real de G04–G06; luego registrar aprobación P1 con responsable, evidencia y fecha.
