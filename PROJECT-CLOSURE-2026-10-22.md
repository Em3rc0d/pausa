# PAUSA — Acta de cierre de ingeniería v1.12.0

**Fecha de decisión:** 22 de octubre de 2026 (America/Lima)  
**Decisión:** **CERRAR LA ITERACIÓN TÉCNICA Y CONGELAR ALCANCE** de la PWA gratuita v1.12.0, conservando la aplicación publicada. **NO-GO para beta validada, certificación clínica y comercialización**.  
**Repositorio:** https://github.com/Em3rc0d/pausa  
**Aplicación:** https://pausa-homeoffice.pages.dev/

## 1. Qué se entrega

- PWA gratuita, estática, sin cuentas ni backend obligatorio.
- Cinco rutinas, incluida **Pausa sentado** (145 s) disponible sin descargar IA.
- Biblioteca de 112 GIF y 112 pósteres originales; funcionamiento local/offline sujeto a recursos ya cacheados y cuota del navegador.
- Historial y preferencias locales; temporizador; exportación de historial; avisos configurables **mientras la aplicación permanezca abierta**.
- Guía opcional con IA local: primera descarga aproximada de 512 MB de pesos q8 más runtime/tokenizador, sin garantía de disponibilidad en cada dispositivo.
- Mensajes de alcance y prechequeo orientativo de señales de alarma. El contenido de movimiento **no está certificado clínicamente**.

## 2. Evidencia reproducible del cierre

| Evidencia | Resultado | Límite |
|---|---|---|
| Integración GitHub | PR #6 fusionado en main; PR #4 (CS-04) y PR #5 (G06) incluidos | Integración no es certificación |
| Suite del código integrado | **69/69 PASS**, 0 fallos en `main@2b70b650` (Windows, 19-10-2026) | Recibo de ejecución del propietario; los cambios posteriores hasta `6d403180` son documentales |
| Integridad de medios | 112 GIF y 112 PNG, verificador de repositorio PASS | Hash/inventario no validan médicamente los movimientos |
| Cloudflare Pages | Despliegue de producción **success**: `e4568010-190c-4ee5-a66b-40c657e21808`, del 19-10-2026 22:31 (Lima), commit `6d403180` | API confirma publicación; no certifica todos los flujos |
| Chromium remoto, sitio de producción | 6 rutas × 3 viewports (360, 768, 1280) **18/18 sin desbordamiento horizontal** ni botones/enlaces visibles sin nombre simple; encabezado visible en todas | Inspección DOM automatizada, no auditoría WCAG |
| Recorrido funcional de producción | Consentimiento de seguridad → rutina sentada → temporizador → 3 movimientos → finalización → actividad con **1 sesión / 11 s** | Emulación móvil Chromium; no dispositivo físico ni evaluación clínica |

La evidencia de navegador se detalla en [`mk2/test/BROWSER-SMOKE-2026-10-22.md`](mk2/test/BROWSER-SMOKE-2026-10-22.md). La fuente canónica para la matriz de bloqueos sigue siendo [`mk2/plan/RELEASE-GATES.md`](mk2/plan/RELEASE-GATES.md).

## 3. Disposición de gates — NO falsear aprobaciones

| Gate | Estado al cierre | Decisión |
|---|---|---|
| G01 integración | **PASS** | Incluido |
| G02 suite e integridad | **PASS** en baseline de código aprobada | Incluido |
| G03 uso básico | **PARCIAL**; pruebas de UI/producto adicionales aportan evidencia | No declarar E2E exhaustivo |
| G04 PWA | **PARCIAL**; instalación y offline observados en Windows | Upgrade del SW y recuperación de cuota no certificados |
| G05 recordatorios | **PARCIAL**; notificación inmediata y sincronización manual observadas | No prometer avisos con app cerrada; vencimiento/suspensión no certificados |
| G06 accesibilidad/contenido | **PARCIAL**; correcciones CSS/semántica y smoke Chromium | Faltan NVDA/VoiceOver, teclado real, zoom efectivo, contraste calculado exhaustivo y revisión profesional |
| G07 piloto 14 días | **NO EJECUTADO** | No inferir usuarios/retención |
| G08 cobro/obligaciones | **NO IMPLEMENTADO** | No hay producto de pago habilitado |
| G09 operaciones comerciales | **NO CERRADO** | No hay readiness comercial/rollback probado |
| G10 Android | **FUERA DEL ALCANCE** | No hay APK ni Play Store |

**No se declara GO beta ni GO comercial.** El cierre es del desarrollo entregado, no de los controles de validación que requieren terceros, transcurso de tiempo o decisiones comerciales.

## 4. Decisión explícita de producto

**Estado final de esta iteración:** MVP/PWA gratuita funcional y publicada como demostración exploratoria, **sin lanzamiento comercial ni afirmaciones de prevención/tratamiento**. La versión técnica se congela en v1.12.0. Publicar la demo no implica que una beta validada o un servicio de bienestar certificado haya pasado los criterios de `RELEASE-GATES.md`.

**No ampliar scope por inercia.** Fuera de esta entrega: monetización, Teams, cuentas, backend/push garantizado, publicación Android, nuevas bibliotecas/modelos y nuevas rutinas. No se añade CI/GitHub Actions. Conservar la documentación histórica del proceso MK0→MK2.

**Excepciones para reabrir el desarrollo:** un defecto reproducible que afecte seguridad, privacidad o funciones esenciales; una revisión profesional que exija retirar/corregir contenido; o una nueva decisión explícita respaldada por evidencia de uso y viabilidad. En ese caso abrir un nuevo MK/alcance y volver a validar, sin presentar esta acta como autorización anticipada.

## 5. Riesgos residuales que NO se eliminan con esta acta

1. Los movimientos, indicaciones y representaciones no han recibido evaluación profesional documentada; detenerse si provocan o agravan molestias.
2. Una PWA abierta puede ser suspendida por el navegador. **No** se garantizan avisos exactos con app cerrada o suspendida.
3. Persistencia local susceptible de borrado, sin sincronización; modelo local pesado y recursos offline condicionados a memoria/caché/cuota.
4. La exploración automatizada no sustituye pruebas de lectores de pantalla, navegación por teclado real ni pruebas físicas en móviles.
5. No existe validación de retención de usuarios, pago, facturación, soporte ni titularidad comercial de marca/dominio.

## 6. Procedimiento de cierre operativo

- Conservar operativa la URL de Cloudflare con v1.12.0 sin hacer cambios innecesarios.
- Mantener GitHub público y documentado como repositorio del artefacto, no archivarlo ni borrar el despliegue; «cerrar proyecto» aquí significa **cierre de iteración** y congelación del alcance, no apagar una app ya publicada.
- No afirmar que un commit posterior **solo documental** cambió el ejecutable verificado: preservar SHA de baseline y SHA del despliegue por separado.
- Para una eventual comercialización, iniciar una evaluación nueva y cumplir G06–G09 con evidencia real y autorización expresa, nunca mediante aprobación retrospectiva.

**Resultado administrativo:** CIERRE TÉCNICO DE ALCANCE · ENTREGADO COMO DEMOSTRACIÓN GRATUITA · VALIDACIONES EXTERNAS NO APROBADAS.
