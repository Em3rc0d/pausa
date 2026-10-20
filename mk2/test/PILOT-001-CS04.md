# PILOT-001 — CS-04 Pausa: auditoría UX, accesibilidad y evidencia

**Fecha:** 2026-10-19 · **Estado:** ITERATE (validación visual y suite nativa de esta rama pendientes)
**Base de release fijada:** `release/pausa-commercial-readiness-2026-10-19@e67aaee4751a974c5d4de5a4b9e6f8de9a370e1c`
**Rama de trabajo:** `pilot/cs04-final-reconciled-2026-10-19`
**Canon reutilizado:** `personal_knowledge/jett-engineering-method/architecture/CRAFT-STATION-BOUNDED-ADOPTIONS.md`, criterio CS-04. Inspirado en `crafter-station/screen2prompt` con SHA de origen documentado en el corpus; **no se incorporó software ajeno**.

## Objetivo y ámbitos congelados
Evaluar si feedback verificable con pantalla, selector, viewport, antes/después y test concreto permite una corrección mínima útil sin alterar el modelo local ni el contenido general de movilidad.

| Flujo | Ruta / controles | Aceptación |
|---|---|---|
| F01 Inicio → Pausa sentado → Mi actividad | `#inicio`, `[data-routine=seated]`, `#actividad`, `.bar-chart` | Historial real y datos diarios accesibles; no inventar duración |
| F02 Mi guía → revisión → resultado | `#agente`, `#agentForm`, `#agentStatus`, `#agentOutput` | Precauciones, modos y alternativa sin IA; sin cambiar elección generativa ni descargar el modelo por fuerza |
| F03 Preferencias → recordatorios | `#ajustes`, `#intervalInput`, `#scheduleToggle`, `#toastRoot` | Confirmaciones fieles al estado y horario, sin prometer un próximo aviso inexacto |

Viewports objetivo: **360×800**, **768×1024** y **1280×800**. Inspección de CSS sí; Chromium/screen reader/zoom y capturas **NO EJECUTADOS** por esta sesión.

## Hallazgos — código fuente y parches

### UX-001 · P2 — Gráfico semanal sin alternativa textual operable
**Antes:** `activityPage()` en `app/app.js` contenía barras `div` y valores diarios solo como `title` en `.bar-track`. `aria-label` de un gráfico sin roles/valores no comunica necesariamente datos por día a lectores de pantalla.

**Después:** `.bar-chart` se marca decorativo con `aria-hidden=true`, y se incluye lista `ul.sr-only` de siete `li` alimentados por la misma colección `Core.week` y `Core.formatElapsed`. No se duplican cálculos.

**Pruebas:** contrato fuente en `app/tests/experience.test.js`. Falta revisar Accessibility Tree en navegador con registros de prueba para comprobar lectura real.

### UX-002 · P2 — Confirmación de frecuencia temporalmente engañosa
**Antes:** `app.js` enviaba «Tu próximo recordatorio será en N minutos», incluso con avisos deshabilitados o horario que pospone el siguiente disparo.

**Después:** `Core.reminderFrequencyFeedback()` produce confirmaciones distintas para avisos desactivados, activos sin horario y activos con horario, sin garantizar entrega con navegador suspendido.

**Pruebas:** cuatro combinaciones de entrada en `app/tests/core.test.js`; referencia a helper en `app/tests/experience.test.js`. Falta comprobar toast y permiso real en navegador.

### UX-003 · Investigación abierta, sin fix
Existen tamaños auxiliares reducidos en CSS y reglas responsive superpuestas. La rama base más reciente también incorporó ajustes de contraste y asociaciones accesibles de escalas. No concluir falta de legibilidad o overflow sin renders a 360, 768 y 1280 px, zoom 200 %, teclado y lectores reales.

## Fallo de tests offline y corrección no productiva
La primera ejecución nativa documentada por el usuario en una rama anterior reportó **62 PASS / 2 FAIL de 64**; el harness de `service-worker.test.js` almacenaba claves relativas mediante `addAll` pero buscaba claves absolutas normalizadas, produciendo falsos fallos `offline` para GIF y shell. Se reparó el fixture, **sin modificar `app/sw.js`**. La rama de release integrada en esta base ya contiene aquella corrección de `addAll`.

En esta rama se preserva esa normalización y se corrige otra limitación del mock: `ignoreSearch` solo ignora parámetros de consulta cuando se solicita. Dos casos nuevos validan `app.js?v=1.12.0` sin red y prioridad network-first con red. Este cambio afecta exclusivamente `app/tests/service-worker.test.js`.

## Evidencia nativa aportada por el usuario y su límite
La segunda ejecución del usuario mostró **61/61 PASS** y `check:repository` PASS sobre su rama local divergente; la operación `git pull --ff-only` había FALLADO, por lo que **ese resultado no corresponde a la versión más nueva del piloto en GitHub**. Su verificación de repositorio enumeró 293 archivos del inventario, 112 GIF, 112 pósteres y 90 enlaces locales.

Esta nueva rama está fijada a release `e67aaee4751a974c5d4de5a4b9e6f8de9a370e1c` y reúne también los tests de accesibilidad añadidos posteriormente al release. La revisión de los **10 archivos `*.test.js`** en GitHub encuentra **69 declaraciones de test**:
- 61 en el checkout anterior del usuario;
- 3 nuevas de accesibilidad en release;
- 3 nuevas de CS-04 (1 core + 2 experience);
- 2 nuevas de Service Worker.
Las 69 declaraciones no implican 69 PASS.

**Ejecución limitada de este agente:** 25/25 casos core + experience + a11y y 6/6 casos de Service Worker fueron ejecutados en V8 con shims, no en Node oficial; cuatro archivos JS modificados pasan análisis sintáctico. El entorno del agente no resuelve GitHub para hacer checkout completo, por lo que **NO pudo correr** `npm run check` nativo, `check:repository`, Chromium, pruebas de dispositivo, inferencia 512 MB ni accesibilidad asistiva.

## Comprobaciones que todavía bloquean el cierre
1. En un checkout limpio de esta rama, `npm run check`: exigir todos los tests y el verificador de medios/enlaces. Nunca ejecutar los comandos desde la rama vieja divergente y atribuirlos a esta revisión.
2. En navegador real: F01 con siete valores de actividad, F02 con modal, cambios de contexto y alternativa sin IA, F03 con horario y permiso; verificar 360, 768 y 1280 px, navegación por teclado y reducción de movimiento.
3. Reportar evidencia por commit, navegador, viewport, resultado y capturas sin datos personales; para lectura asistiva, usar la Accessibility Tree y, cuando sea posible, NVDA/VoiceOver.
4. No confundir la validación estática de contraste o de modelos con validación clínica o comercial. Los gates G06/G07/G08 de release son independientes.

## Resultado del piloto
**ITERATE / PARTIAL.** Se verificaron dos defectos del código fuente y se propusieron dos fixes mínimos con tests. La calidad visual real, el ahorro de tiempo y la adopción en producción siguen UNKNOWN. La rama es candidata de revisión, no GO de release. El PR del piloto anterior se debe cerrar como sustituido tras rebase/reconciliación sobre este HEAD.

## Validación local segura sin alterar la rama divergente
```powershell
git status --short
git fetch origin
git switch -c verify/cs04-final-20261019 --track origin/pilot/cs04-final-reconciled-2026-10-19
node --test app/tests/service-worker.test.js
npm run check
npm start
```
La transición a `verify/cs04-final-20261019` requiere árbol de trabajo limpio. `git switch` conserva la rama anterior y sus commits, sin `reset --hard`, `rebase` ni `push --force`.


## Actualización de la evidencia e integración al release — 2026-10-19
- El propietario verificó en Windows el **HEAD `dcf760b5d112549ac2f851ea9a69e5f7e48ee4ec`**, obtenido al crear una rama de verificación desde `origin/pilot/cs04-final-reconciled-2026-10-19`. `node --test app/tests/service-worker.test.js` **6/6 PASS** y `npm run check` **69/69 PASS**, seguidos de `check:repository` PASS (293 inventario, 48 documentos, 93 enlaces, 112 GIF, 112 PNG).
- [PR #4](https://github.com/Em3rc0d/pausa/pull/4) fusionado a release mediante squash `18f6cf901a6450fad66c601ef75edd115db7ba76`, antes de la [PR #5](https://github.com/Em3rc0d/pausa/pull/5), squash `67bc70be03c7294bc83c4f54b7a7daf18ee9b970`. No hay conflictos ni modificaciones en el Service Worker productivo procedentes de CS-04.
- Los resultados 69/69 anteriores se mantienen como evidencia del commit ensayado, **no** como certificación de los commits posteriores de integración. Las referencias anteriores a “pendiente de suite nativa” corresponden a la historia previa de este piloto y no invalidan la prueba realizada después.
- Veredicto del método CS-04: dos hallazgos fuente corregidos y cubiertos por tests. **PARTIAL** hasta validar accesibilidad y UX realmente en Chromium/NVDA con viewports y estados de interés, y medir beneficios antes de elevarlo a modelo general de trabajo.
