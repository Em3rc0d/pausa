# MK3-P1 · Registro de ejecución declarada por el propietario (22-10-2026)

**Fuente:** mensaje del propietario en conversación ChatGPT del 22-10-2026.  
**Entorno indicado:** Pausa publicada en Cloudflare Pages (https://pausa-homeoffice.pages.dev/), **Chrome en Windows** para la prueba de teclado. Revisión con **NVDA** y zoom al **200 % y 400 %**.  
**Estado de evidencia:** **EJECUTADAS SEGÚN DECLARACIÓN**, resultado de aceptación **PENDIENTE DE CONFIRMACIÓN DE INCIDENCIAS Y DETALLES**, no PASS independiente ni auditoría WCAG.  
**Producto de referencia publicado:** v1.12.0, deployment `e4568010-190c-4ee5-a66b-40c657e21808` (Cloudflare Pages) asociado al código de artefacto `6d4031805d28c2edf5a8b30a07d248af3126a659`. No se ha certificado que la sesión personal estuviera usando ese deployment sin inspección de DevTools.

## Tres pruebas marcadas como completadas por el propietario
| Registro | Checklist | Alcance que declaró | Estado del recibo |
|---|---|---|---|
| UQ-01 | Q02 (parcial), Q03 por confirmar | «Abrir Pausa en Chrome y comprobar navegación con Tab, Shift+Tab y Escape» | **AUTO-REPORTE: REALIZADO**. No indicó secuencia de todos los flujos, si hubo foco atrapado o problemas, navegador/versiones ni capturas |
| UQ-02 | Q04 (parcial) | «Revisar con NVDA el prechequeo, las rutinas y el historial» | **AUTO-REPORTE: REALIZADO**. No consta si lector anunció nombres, estados y título, ni si se cubrió Biblioteca, Guía y Ajustes |
| UQ-03 | Q05 (parcial) | «Comprobar zoom al 200 % y 400 % sin pérdida de controles» | **AUTO-REPORTE: REALIZADO**; casilla sugiere comprobación sin pérdida pero no incluye resultados detallados, evidencia de 320px o reduced motion |

## Evidencia pendiente para elevar a PASS acotado
1. Confirmación explícita del propietario de que las **tres pruebas terminaron sin fallos**, o lista concreta de fallos/rutas/control afectados.
2. Versión de Chrome, versión NVDA y Windows; fecha/hora y confirmación de URL/versión de app empleada.
3. Alcance comprobado por paso: en modales, foco inicial, Escape/confirmación, regreso al control y al menos un botón de completar; en NVDA, lectura de labels y estados y semana de actividad; en zoom, controles navegables y sin solapamientos en pantallas probadas.
4. Se pueden registrar evidencias sin captura si el relato es suficientemente preciso, pero **no** inventar screenshots, vídeos ni dispositivos.

## Implicaciones de gates
- Q02/Q04/Q05 tienen **ejecución autorreportada**, no todos sus subcasos aprobados.
- Q03 **sigue parcialmente pendiente** hasta saber si se ejercitó retorno de foco/Tab cíclico del modal.
- Q06 contraste tiene muestreo automatizado separado, [113 elementos y 0 bajo umbral en esa muestra](CONTRAST-CHROMIUM-2026-10-22.md); no cubre todos los estados.
- G06a issue #11 permanece **ABIERTO**.
- **P1 HOLD**; no iniciar todavía el piloto ni equiparar «marqué completado» a aprobación WCAG/seguridad de contenidos.

## Próximo trabajo práctico sin repetir lo ya realizado
- **G05 #10 / Q10**: permiso denegado/revocado, sesiones funcionales y copy honesto.
- **G05 #10 / Q11–Q12**: vencimiento de recordatorio real y dos pestañas; reanudar desde suspensión.
- **G04 #9 / Q08–Q09**: upgrade v1.11→v1.12 y manejo de cuota en **origen de prueba separado de producción**, sin borrar el historial del navegador de uso personal.
- **G06b #12 / Q15**: dictamen de todos los ejercicios y textos accesibles; **bloqueante** para piloto.

**Nota de honestidad:** no se ejecutaron automáticamente estas pruebas en el dispositivo personal desde ChatGPT; se registra lo que el propietario marcó como completado, con el alcance y la incertidumbre reales.
