# MK3-P1 · Registro de ejecución declarada por el propietario (22-10-2026)

**Fuente:** mensaje del propietario en conversación ChatGPT del 22-10-2026.  
**Entorno indicado:** Pausa publicada en Cloudflare Pages (https://pausa-homeoffice.pages.dev/), **Chrome en Windows** para la prueba de teclado. Revisión con **NVDA** y zoom al **200 % y 400 %**.  
**Estado de evidencia actualizado:** **PASS POR AUTORREPORTE DEL PROPIETARIO** en los tres alcances expresamente descritos. El propietario confirmó después: «Sin problema alguno». **No** es auditoría WCAG, ni certificación independiente de todos los subcasos.  
**Producto de referencia publicado:** v1.12.0, deployment `e4568010-190c-4ee5-a66b-40c657e21808` (Cloudflare Pages) asociado al código de artefacto `6d4031805d28c2edf5a8b30a07d248af3126a659`. No se ha certificado que la sesión personal estuviera usando ese deployment sin inspección de DevTools.

## Tres pruebas marcadas como completadas por el propietario
| Registro | Checklist | Alcance que declaró | Estado del recibo |
|---|---|---|---|
| UQ-01 | Q02 (parcial), Q03 por confirmar | «Abrir Pausa en Chrome y comprobar navegación con Tab, Shift+Tab y Escape» | **PASS AUTORREPORTADO:** teclado Chrome (Tab, Shift+Tab, Escape) sin problemas observados. El alcance exacto por sección/modal, versión de Chrome y evidencias adicionales no constan |
| UQ-02 | Q04 (parcial) | «Revisar con NVDA el prechequeo, las rutinas y el historial» | **PASS AUTORREPORTADO:** NVDA en prechequeo, rutinas e historial, sin problemas observados. No consta cobertura de Biblioteca/Guía/Ajustes ni detalle de nombres, estados o títulos anunciados |
| UQ-03 | Q05 (parcial) | «Comprobar zoom al 200 % y 400 % sin pérdida de controles» | **PASS AUTORREPORTADO:** zoom 200 % y 400 % sin problemas observados. No consta prueba de 320 px, ajuste de espaciado de texto o reduced motion |

## Confirmación posterior y límites de PASS
El propietario confirmó explícitamente: **«Sin problema alguno»**. Esto eleva las tres comprobaciones **reportadas** a **PASS de usuario, limitado a su alcance**; no existen capturas ni reportes de consola que ampliarían la prueba. La información de versiones de Chrome/NVDA/Windows, y el alcance detallado del foco en modales, otras secciones, 320 px y movimiento reducido, siguen sin documentarse. No pedir repetir automáticamente las pruebas ya realizadas.

## Implicaciones de gates
- Q02/Q04/Q05 tienen **PASS AUTORREPORTADO en los subcasos realizados**, pero no están aprobados todos los casos de su matriz.
- Q03 **sigue parcialmente pendiente** para retorno de foco/Tab cíclico del modal si no se incluyó realmente en las comprobaciones anteriores.
- Q06 contraste tiene muestreo automatizado separado, [113 elementos y 0 bajo umbral en esa muestra](CONTRAST-CHROMIUM-2026-10-22.md); no cubre todos los estados.
- G06a issue #11 permanece **ABIERTO**.
- **P1 HOLD**; no iniciar todavía el piloto ni equiparar «marqué completado» a aprobación WCAG/seguridad de contenidos.

## Próximo trabajo práctico sin repetir lo ya realizado
- **G05 #10 / Q10**: permiso denegado/revocado, sesiones funcionales y copy honesto.
- **G05 #10 / Q11–Q12**: vencimiento de recordatorio real y dos pestañas; reanudar desde suspensión.
- **G04 #9 / Q08–Q09**: upgrade v1.11→v1.12 y manejo de cuota en **origen de prueba separado de producción**, sin borrar el historial del navegador de uso personal.
- **G06b #12 / Q15**: dictamen de todos los ejercicios y textos accesibles; **bloqueante** para piloto.

**Nota de honestidad:** no se ejecutaron automáticamente estas pruebas en el dispositivo personal desde ChatGPT; se registra lo que el propietario marcó como completado, con el alcance y la incertidumbre reales.
