# PILOT-001 — CS-04: revisión UX verificable de Pausa v1.12.0

**Fecha:** 2026-10-19
**Baseline:** `release/pausa-commercial-readiness-2026-10-19@1c5d865dadea1e4bd3e74822936989123b9ba6bc`
**Rama de experimento:** `pilot/cs04-visual-evidence-2026-10-19`
**Objetivo:** someter a prueba el criterio CS-04 del canon Jett: un defecto UX debe conservar ruta, elemento, contexto, resultado observado, criterio de aceptación y evidencia antes/después. No instalar el widget externo `screen2prompt`.
**Estado:** **ITERATE / PARTIAL EVIDENCE**, nunca GO de release, accesibilidad, clínica o mercado.

## Alcance congelado (tres flujos)
1. **F-01 Inicio → Pausa sentado → Sesión → Actividad**: `#inicio`, botón `data-action=detail,data-routine=seated`, confirmación de seguridad, `showSession`, `#actividad`; comprobar valores diarios, duración registrada y navegación.
2. **F-02 Mi guía → formulario → precauciones → propuesta**: `#agente`, `#agentForm`, `#agentStatus`, `#agentOutput`, modalidad, restricciones, cancelación, 512 MB y acceso alternativo sin inferencia.
3. **F-03 Preferencias → frecuencia/horario → aviso**: `#ajustes`, `#intervalInput`, `#scheduleToggle`, `#scheduleStart`, `#scheduleEnd`, `#scheduleWeekdays`, `#remindersToggle`, `#toastRoot`.

**Viewports objetivo:** 360×800, 768×1024 y 1280×800; foco por teclado, lector de pantalla, motion reducido, sin conexión y permisos denegados cuando aplique. Solo hubo inspección del código de responsive CSS; **no se ejecutaron navegadores ni se tomaron screenshots de esas dimensiones** en este entorno.

## Baseline: hallazgos reproducibles desde el código

### UX-001 — Actividad sin valores semánticos por día
- **Flujo:** F-01; `#actividad`, `.bar-chart`, `.bar-col`, `.bar-track`.
- **Antes:** el contenedor visual tenía `aria-label`, las barras eran `div` sin semántica de datos y el tiempo por día se encontraba en `title` (dependiente de hover, no un equivalente textual fiable para tecnologías de asistencia).
- **Severidad:** P2 (accesibilidad informativa). **Evidencia:** `app/app.js` en `activityPage()` a SHA baseline.
- **Cambio mínimo:** gráfica decorativa `aria-hidden=true` más lista semántica `ul.sr-only` con `li` por día usando la misma fuente `Core.week` y `Core.formatElapsed`. No fabricamos minutos ni añadimos cálculos paralelos.
- **Acceptance:** siete valores diarios deben corresponder a los mismos `seven[].seconds` de barras. La regresión está cubierta por el nuevo test estático; validación de screen reader real **PENDING**.
- **Provenance:** OBSERVED (fuente), GENERATED (criterio de UX), sin afirmación de cumplimiento WCAG global.

### UX-002 — Copy de recordatorio futuro inexacto
- **Flujo:** F-03; `#intervalInput`, `#toastRoot`.
- **Antes:** todo cambio de intervalo notificaba literalmente “Tu próximo recordatorio será en N minutos”, incluso cuando el horario habilitado mueve el siguiente aviso a la próxima ventana o los recordatorios están apagados.
- **Severidad:** P2 (promesa temporal engañosa). **Evidencia:** `app/app.js` en el evento change y `Core.nextAllowedReminder()`.
- **Cambio mínimo:** `Core.reminderFrequencyFeedback()` distingue activo sin horario, activo con horario y desactivado, sin prometer exactitud que el navegador no garantiza. `app.js` usa el helper al cambiar el intervalo.
- **Acceptance:** los tres estados y normalización de intervalos inválidos devuelven copy coherente; **4/4 evaluaciones de helper** ejecutadas en V8.

### UX-003 — Riesgo visual no confirmado (NO FIX)
- **Flujos:** F-01/F-02, en 360 px.
- **Observación fuente:** CSS de navegación móvil y texto auxiliar contiene tamaños de 9–11 px en algunos lugares; posteriores overrides modifican valores. No afirmar que exista overflow o ilegibilidad sin estilo computado y prueba de zoom/viewport.
- **Estado:** `UNVERIFIED`; tomar capturas reales y medir caja/tap targets; no cambiar CSS especulativamente.

## Evidencia ejecutada (sin extrapolar)
- Se consultó el source del release candidate desde GitHub, no se descargó el proyecto completo (restricción de red del entorno local).
- `Core.reminderFrequencyFeedback()` fue **ejecutado desde el texto JS recuperado** en un motor V8 aislado, cuatro combinaciones relevantes: PASS 4/4.
- Los archivos `app/tests/core.test.js` y `app/tests/experience.test.js` se evaluaron en V8 con shims de `require`, `fs`, `path`, `assert` y `node:test`, leyendo las versiones actuales del código fuente de GitHub: **19/19 aserciones-test PASS**. Esto verifica esos tests con el harness aproximado, **no equivale a Node `--test` oficial**.
- **NO EJECUTADO:** `npm run check` raíz, 52+ tests completos, `scripts/check-repository.mjs`, hash de medios, Playwright/Chromium, Axe, validación visual, pruebas móviles físicas, permisos reales, instalación PWA, pruebas de inferencia 512 MB, QA clínica y comercial.
- No se modificaron `agent-core`, `agent-planner`, `agent-worker`, `data`, rutinas, catálogo, ilustraciones ni medios.

## Matriz de aceptación y decisiones

| Gate | Resultado | Prueba/pendiente |
|---|---|---|
| B0 identidad de release | PASS | base exacta y rama aislada |
| Tres recorridos especificados | PASS (contrato) | rutas/controles/errores identificados |
| UX-001 fuente y patch acotado | PASS (source) | validar lector de pantalla |
| UX-002 lógica de mensajes | PASS (V8 4/4) | validar toast en navegador |
| Tests núcleo/experiencia con shims | PASS (19/19) | ejecutar Node real |
| `npm run check` en checkout completo | NOT RUN | ejecutar en Windows/Node 24 |
| Chromium 360/768/1280 | NOT RUN | screenshots antes/después, scroll horizontal, keyboard |
| Reducción de movimiento / offline / permisos | NOT RUN | prueba por dispositivo/navegador |
| Determinar beneficio incremental de CS-04 | INCONCLUSIVE | medir costo de identificar/corregir y tasa de reproducción |
| Merge y release a producción | HOLD | no prometer GO |

**Secuencia de validación local:**
```powershell
git fetch origin
git switch pilot/cs04-visual-evidence-2026-10-19
npm run check
npm start
```
Luego visitar `http://localhost:4173/#inicio`, `/#agente` y `/#ajustes` en los tres anchos. Para UX-001 cargar registros reales o datos sintéticos solo en un perfil de prueba local; usar Accessibility Tree para confirmar siete entradas y contrastar con valores visibles. Para UX-002 activar horario y cambiar frecuencia fuera de la ventana; verificar que el toast describa intervalo sin prometer notificación inmediata.

## Veredicto
**ITERATE**: CS-04 aportó dos hallazgos precisos y cambios pequeños, pero el piloto no establece todavía mejoras cuantitativas ni un PASS visual/comercial. Mantener rama y PR sujetos a revisión y tests locales; cualquier afirmación de ROI o compatibilidad amplia permanece UNKNOWN.
