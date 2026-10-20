# Evidencia técnica y faltantes

**Observado al preparar el RC:** análisis de sintaxis con motor V8 sobre core.js, app.js, agent-ui.js, sw.js y data.js. Prueba aislada real de nextAllowedReminder/normalize: domingo 18-10-2026 → lunes a las 09:00 y compatibilidad de estructura previa.

**Pruebas añadidas inicialmente (actualizadas por QA posterior):** rutina 100 % sentada sin exigir pie, normalización y calendario horario, presencia del CTA sin IA. Deben pasar npm run check en un checkout completo.

**Bloqueo del entorno:** la máquina local de trabajo no resuelve github.com; el acceso al código se realizó por conector GitHub. No inventar que la suite, las pruebas Chromium o la integridad de recursos se ejecutaron. No crear GitHub Actions como sustituto.

**Pruebas físicas pendientes:** Chrome/Firefox móviles y escritorio, permisos, suspensión/reinicio, recordatorios duplicados en pestañas múltiples, horario en cambio de zona, app cerrada, instalación/offline, navegación accesible y revisión de indicaciones.

**Comercial:** pago real confirmado, beneficio/entrega, reembolso, política fiscal y soporte no existen todavía. NO GO comercial.

**Regresión visual HQ pendiente de validación manual:** Pausa sentado debe mostrar una persona sentada en sus tres movimientos HQ y sus GIF deben corresponder a alcance de brazos, elevación de talones e inclinación lateral, tanto en tarjeta como en sesión. Se añadieron tests de mapeo del catálogo, archivos locales y precarga. La verificación de hashes de todos los archivos multimedia sigue bajo npm run check.

**QA manual de usuario recibida (2026-10-19, commit d411187):** una captura de «Mi actividad» prueba que una sesión «Pausa sentado» se guardó localmente, con 1 sesión y racha de 1 día. Se detectaron inconsistencias visibles de redondeo (2 min versus 3 min) y plural. El parche de exactitud se aplica después de aquella evidencia; su suite y visual deben repetirse y no se declaran aprobadas anticipadamente. Esta captura no demuestra todavía que los tres GIF HQ se hayan comprobado dentro de la sesión.

**Validación local reproducida por el usuario (19-10-2026):** Node v24.11.1, npm 11.6.2. Sobre `d41118751a60d5c529ebe249274cd066567a4d70`, `npm run check` mostró **52/52 tests aprobados, 0 fallos**, además de `check:repository` status passed y 112 GIF/112 PNG íntegros. Esto certifica ese árbol para las comprobaciones existentes, no el comportamiento en segundo plano ni los flujos de pago. El parche posterior de tiempos exactos (efbb877) añade dos casos; **suite del HEAD posterior pendiente de nueva ejecución**.

**Prueba de notificación sin esperar 25 minutos:** en Preferencias se agregó «Probar aviso», habilitado solo tras permiso; envía notificación con etiqueta de prueba y no adelanta el siguiente vencimiento. Este control comprueba permiso/presentación y apertura desde el sistema, **no demuestra entrega programada con la app suspendida**.

**Incidente y resolución de suite G04/G05 (2026-10-19):** la ejecución del usuario sobre `5925df43507ef5f8c0d2acf3641a8773075d73b2` arrojó 61 tests / 59 PASS / 2 FAIL, y por ello no alcanzó `check:repository`. Ambos fallos fueron en `tests/service-worker.test.js`: `addAll` del mock almacenaba rutas relativas y `match` buscaba URLs absolutas, simulando falsamente un cache miss. Se normalizaron las claves en la inserción del mock, sin cambiar `app/sw.js` ni los archivos multimedia. **Pendiente: reejecutar `npm run check` contra el commit posterior**. No se declara G04 cerrado sin Chrome real.

**G02 APROBADO (evidencia aportada por el usuario el 19-10-2026):** en Windows, con repositorio sin cambios locales antes del `pull --ff-only`, ejecutó `npm run check` sobre `4faee29712d53d751208a1e68e2982b60f0cfdca`: 61 tests, 61 PASS, 0 FAIL. `npm run check:repository` terminó `status: passed`, `snapshotFiles: 293`, `documents: 44`, `localLinks: 90`, `gifs: 112`, `posters: 112`. Esto valida únicamente la suite automatizada para ese SHA. El resto de G03 (plataformas/accesibilidad), G04–G05 reales, G06–G09 permanece abierto.

**G04/G05 — comprobación manual informada por el usuario, 19-10-2026, código `4faee29`:** 4/4 CORRECTO en Chrome/Windows (notificación del sistema y retorno, navegación y rutina HQ offline, preferencias sincronizadas entre dos pestañas, instalación PWA y conservación de rutinas). Pruebas informadas por el usuario, no instrumentadas. Los escenarios de **actualización desde SW antiguo, almacenamiento/cuota, temporizador vencido simultáneamente en varias pestañas, suspensión prolongada, permiso denegado y horario/DST** no quedan certificados. G04 y G05 permanecen PARCIALES.

**G06 — remediaciones de accesibilidad posteriores al QA:** se asociaron escalas opcionales de valoración de molestias a `fieldset/legend`, se elevaron contrastes de algunos textos secundarios y se agregaron comprobaciones estáticas de contraste/navegación/semántica. No equivale a evaluación WCAG completa ni sustituye una prueba real de teclado, lector y zoom. Reejecutar suite para el nuevo commit.


## Consolidación de CS-04 y G06 hacia main — 2026-10-19
- **Origen:** release v1.12.0 + Pausa PR #4 (`18f6cf901a6450fad66c601ef75edd115db7ba76`) + PR #5 (`67bc70be03c7294bc83c4f54b7a7daf18ee9b970`).
- **Suite completa nativa del propietario, verificada en la rama CS-04:** `dcf760b5d112549ac2f851ea9a69e5f7e48ee4ec`, **69/69 PASS** y `check:repository` PASS: 293 archivos del inventario; 48 documentos; 93 enlaces locales; 112 GIF y 112 pósteres. Esa prueba ocurrió **antes** de la fusión de contraste G06 y de los cambios documentales de integración.
- **G06 PR #5:** cambio de regla secundaria CSS a `#536b62`, ampliación de la prueba de contraste y reporte `G06-CONTRAST-REVIEW-2026-10-19.md`. Los **3 tests específicos** de `a11y-contract.test.js` pasaron en V8 con acceso a las fuentes candidatas (no fue una ejecución nativa de Node de la versión combinada). Contraste calculado para cinco superficies, no inspección de cascada real.
- **Pendiente sobre la versión integrada:** `npm run check` nativo, navegación/render móvil 360 px, tableta 768 px, escritorio 1280 px, teclado, Accessibility Tree y lector, zoom y preferencia de movimiento reducido. La instalación offline/aviso inmediato y sincronización de preferencias ya se observaron manualmente antes: G04 y G05 siguen **PARCIALES**, no volver a repetirlos sin cambios o evidencia contradictoria.
- **Decisión:** este registro habilita integración de código/documentación en `main` a petición del propietario; **NO constituye G06 GO, beta GO, validación clínica o activación comercial**. Ni la prueba aislada de CSS ni los tests de Service Worker simulado certifican el funcionamiento en un navegador real.


## Cierre de G02 en `main` — evidencia nativa del propietario, 19-10-2026

**Baseline exacta probada:** `main@2b70b650d9dfcc54bb610b1d4e21b795d8bb2b64`, que ya incluía la fusión de MK2, CS-04 (PR #4) y el contraste G06 (PR #5) mediante PR #6. El usuario confirmó `git status --short` limpio, `git fetch origin`, `git switch main`, y `git pull --ff-only origin main` exitoso (`433e00b..2b70b65`), antes de ejecutar las pruebas en PowerShell/Windows.

- `npm run check` → **69 tests, 69 PASS, 0 FAIL, 0 skipped**, comprobaciones de sintaxis incluidas.
- `npm run check:repository` → `status: passed`; `snapshotFiles: 293`, `documents: 49`, `localLinks: 101`, `gifs: 112`, `posters: 112`, `currentVersion: 1.12.0`.
- Los tres contratos de `a11y-contract.test.js` están entre los 69 PASS, incluidos contraste sobre los cinco fondos, `fieldset/legend` y navegación accesible estructural. El fix CS-04 y los seis casos de Service Worker también constan como PASS en esa suite.
- **Veredicto G02: PASS en ese SHA, con correcciones CS-04 y G06 ya integradas.** Las actualizaciones documentales de este recibo no cambian `app/`. No reutilizar esta evidencia automáticamente después de mutaciones de código.
- **Límite de evidencia:** pruebas automáticas de código y assets no demuestran accesibilidad calculada en navegador, operación real ante suspensión, cuotas del Service Worker, validez profesional de contenido o uso de terceros. G04/G05 permanecen PARCIALES; G06 (teclado, lector, zoom, contrastes efectivos y contenido profesional), G07–G09 siguen abiertos. No hay GO beta ni comercial.
