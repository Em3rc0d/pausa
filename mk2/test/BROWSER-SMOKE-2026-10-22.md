# PAUSA — Smoke test remoto en producción (2026-10-22)

## Identidad de la ejecución

- **URL examinada:** https://pausa-homeoffice.pages.dev/
- **Artefacto publicado:** Cloudflare Pages deployment `e4568010-190c-4ee5-a66b-40c657e21808`, `status=success`, asociado al commit `6d4031805d28c2edf5a8b30a07d248af3126a659`.
- **Método:** API de Cloudflare Browser Rendering `/browser-rendering/content`, Chromium remoto, navegación DOM con JavaScript en sesiones efímeras sin cookies ni cuentas de clientes. No se ejecutó navegador local conectado a producción.
- **Responsable:** comprobación técnica asistida en ChatGPT; fuentes de verificación: respuestas del navegador y metadatos de Cloudflare.
- **Nota importante:** no confundir «script ejecutado en Chromium» con teclado humano/NVDA, WCAG o ensayo en un teléfono físico.

## Responsive: rutas principales

Se navegó, mediante el control `data-nav`, entre Inicio, Mi guía, Rutinas, Biblioteca, Actividad y Ajustes, esperando el render de cada vista. Se comprobó ancho del documento respecto del viewport, existencia del encabezado, y enlaces/botones visibles sin texto, título ni `aria-label` mediante una inspección DOM básica.

| Ruta | 360 × 800 (móvil emulado) | 768 × 1024 | 1280 × 800 |
|---|---|---|---|
| Inicio | PASS | PASS | PASS |
| Mi guía | PASS | PASS | PASS |
| Rutinas | PASS | PASS | PASS |
| Biblioteca | PASS | PASS | PASS |
| Mi actividad | PASS | PASS | PASS |
| Ajustes | PASS | PASS | PASS |

**Resultado 18/18:** encabezados presentes; `documentElement.scrollWidth <= documentElement.clientWidth`; cero botones/enlaces visibles sin nombre simple en la vista principal.

En la portada móvil 360 también se observaron 6 elementos `img` sin fallos de carga en el momento de captura. **No** se han descargado ni revisado visualmente los 112 medios de Biblioteca en este ensayo. Los controles de tipo radio/range visibles pueden tener dimensiones nativas pequeñas; este script no califica por sí solo el tamaño táctil efectivo de sus etiquetas.

## Recorrido funcional guiado (móvil emulado 360 px)

1. Pulsar la CTA `Hacer una pausa` de `Pausa sentado` en un contexto limpio.
2. Aparece la pantalla de seguridad **«Primero, tu seguridad.»**. En este ensayo se marcó la opción de ausencia de señales de alarma y la casilla de aceptación, exclusivamente con fines de prueba; no representa evaluación médica de una persona.
3. Continuar: se abre el detalle **Pausa sentado**.
4. Comenzar: aparece «Movimiento 1 de 3», con temporizador `00:45`.
5. Tras aproximadamente 11 segundos de ejecución simulada por tiempo de navegador, el temporizador mostraba `00:34`.
6. Pulsar `Siguiente` para recorrer los restantes movimientos y `Finalizar`: aparece **«¡Bien hecho, te moviste!»**.
7. Abrir `Mi actividad`: pantalla muestra **1 sesión completada** y **11 s** de movimiento registrado en la sesión de QA.

**Resultado:** PASS para la transición de consentimiento, detalle, sesión, avance, finalización y persistencia dentro de esa sesión remota. Se confirma que no se contabilizó automáticamente el tiempo omitido al usar Siguiente. El navegador de test no es el navegador personal del propietario.

## Observaciones y límites

- Primer intento sin responder el prechequeo de seguridad **no** inició la sesión: comportamiento esperado, no fallo.
- No se ejecutó **Service Worker upgrade** desde una versión antigua ni simulación de cuota agotada.
- No se completó un recordatorio **programado** en dos pestañas ni pruebas de suspensión, reinicio, zona horaria u OS notifications.
- No se verificaron con lector real la Accessibility Tree, navegación efectiva por Tab/Shift+Tab/Escape, foco de modales, zoom 200%/400% ni todos los contrastes computados.
- No se probó la descarga/inferencia del Transformer de ~512 MB durante este smoke.
- No hubo revisión clínica ni participantes humanos; el registro de actividad mostrado es únicamente dato sintético de prueba en sesión aislada.
- El laboratorio de Chromium remoto no equivale a Android/iOS/Windows físico.

**Veredicto:** smoke de navegación responsive y flujo guiado **PASS en los casos descritos**, G03 reforzado sin declararlo E2E exhaustivo. G04/G05/G06 conservan sus estados **PARCIALES**.

Ver [acta de cierre](../../PROJECT-CLOSURE-2026-10-22.md) y [gates canónicos](../plan/RELEASE-GATES.md).
