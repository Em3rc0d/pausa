# MK2 — Readiness comercial de Pausa

Estado: RELEASE CANDIDATE v1.12.0, no production GO. Inicio 2026-10-19. MK0 y MK1 quedan intactos.

Objetivo: recordatorios no invasivos y pausas voluntarias de movimiento, incluidas rutinas que se hacen sentado, sin obligar a descargar IA. No diagnostica ni garantiza prevención o tratamiento de lesiones.

Áreas:
- brainstorming/OPPORTUNITY.md — comprador y problema
- design/EXPERIENCE.md — contrato UX
- arch/ADR.md — decisiones de arquitectura y límites
- plan/RELEASE-GATES.md — bloqueos y GO/HOLD
- build/CHANGES.md — diferencias técnicas de v1.12
- test/RELEASE-MATRIX.md — pruebas ejecutadas y pendientes
- quarries/RAILLY-TRANSFER.md — adaptación selectiva de Railly
- mining-site/SOURCES.md — recibos de fuentes

MK2 no incluye cobros, suscripciones, cuentas, Android, push persistente, validación clínica ni ventas verificadas.

## Nuevos gates tras QA de campo

- [Plan de beta 14 días](plan/BETA-PILOT.md): selección voluntaria, consentimiento, adopción, retención y salida GO/PIVOT/KILL.
- [Contrato comercial](plan/COMMERCIAL-READINESS.md): qué ofrecer, cómo medir disposición de pago y qué falta para cobrar legalmente.
- [Protocolo G06](test/ACCESSIBILITY-PROTOCOL.md): lector, teclado, zoom, movimiento y revisión de contenido.

## Incorporaciones CS-04 y G06

- [PILOT-001, CS-04](test/PILOT-001-CS04.md): siete valores de Actividad accesibles, notificaciones de frecuencia con texto fiel al horario y pruebas offline complementarias. La rama exacta evaluada aprobó 69/69 pruebas Node y el verificador del repositorio.
- [Contraste G06](test/G06-CONTRAST-REVIEW-2026-10-19.md): color secundario y prueba ampliada de ratio sobre cinco fondos; verificación matemática y V8 específica, con suite nativa de la combinación pendiente.
- [Matriz de evidencia](test/RELEASE-MATRIX.md) y [gates](plan/RELEASE-GATES.md): no atribuir los PASS de una revisión a otra sin pruebas. G04/G05 siguen parciales, G06 no equivale a certificación clínica o WCAG.
