# MK3 · Preflight de seguridad, acceso y PWA — pendientes verificables

**Baseline:** v1.12.0; pruebas técnicas anteriores en [reporte MK2](../../mk2/test/BROWSER-SMOKE-2026-10-22.md). **Estado P1: HOLD.** No marcar PASS sin ejecutar y adjuntar recibo con fecha, versión, dispositivo y responsable.

## Datos obligatorios de cada ejecución
`case_id | datetime_zone | commit | deployment_id | browser_version | OS/device | steps | expected | actual | PASS/FAIL/BLOCKED | evidence_path | tester | severity`. Nunca compartir registros personales. Capturas desidentificadas. Un paso no ejecutado = **NOT RUN**, nunca PASS.

## Matriz reproducible

| ID | Escenario (pasos resumidos) | Aceptación | Estado |
|---|---|---|---|
| Q01 | Win/Chrome 360-1280: portada → seguridad → rutina sentado → actividad, con uso real | flujo comprensible, movimiento y tiempo correctos | **PASS parcial** solo Chromium remoto / QA previo Windows |
| Q02 | Chrome y Firefox, teclado físico Tab/Shift+Tab/Enter/Escape en portada, filtros, ajustes | sin trampa, foco visible, funcionamiento equivalente | NOT RUN |
| Q03 | Modal de seguridad, rutina, finalización: foco inicial, Tab cíclico, Escape, retorno al activador | foco permanece dentro y retorna correctamente, lectores anuncian título y pasos | NOT RUN |
| Q04 | NVDA+Chrome/Firefox (o lector equivalente) en 6 secciones, formularios y actividad | nombres/roles/estados y semana comprensibles sin imagen | NOT RUN |
| Q05 | 320 px, zoom 200% y 400%; texto espaciado, reducido movimiento | sin pérdida de información ni controles imposibles de usar | NOT RUN |
| Q06 | Contraste **calculado en navegador** sobre texto esencial, errores, foco, estados deshabilitados | criterios WCAG 2.2 pertinentes; no generalizar CSS token | NOT RUN |
| Q07 | Instalar PWA en Windows + Android real; habilitar/salir/volver/recargar | instalación y preferencias conservadas donde sea compatible | **PASS parcial** Windows previo; Android NOT RUN |
| Q08 | Service Worker v1.11 → v1.12 en **mismo origen controlado** (prueba segura local/preview) | actualización predecible sin pantalla en blanco ni datos perdidos | NOT RUN |
| Q09 | Offline con shell y GIF precargados; red ausente; después recuperación tras error/almacenamiento insuficiente | degradación explicada sin bloquear funciones esenciales ni corromper historial | **PASS parcial** offline básico Windows; cuota/recovery NOT RUN |
| Q10 | Permiso denegado, después revocado; app sigue permitiendo sesiones | sin error fatal ni prometer aviso garantizado | NOT RUN |
| Q11 | Aviso al vencimiento verdadero en 2 pestañas con horario activo | una sola reclamación de vencimiento donde soportado; estado consistente | NOT RUN |
| Q12 | Suspender PC/app al vencer horario, reanudar y volver a foco | comportamiento real registrado; copy no promete notificación garantizada | NOT RUN |
| Q13 | Cambiar zona/DST/horario; revisar próximo aviso y límites | sin duplicados críticos, sin afirmaciones temporales falsas | NOT RUN |
| Q14 | QA en Android/iOS: responsive, acceso sin IA y notificaciones según capacidades | funciones esenciales y límites visibles; diferencias documentadas | NOT RUN |
| Q15 | Profesional de rehabilitación revisa **todos** los movimientos, secuencias y claims accesibles | autorización por unidad, correcciones/retiradas y firma | **BLOCKED: no reviewer** |
| Q16 | Consentimiento independiente, baja, custodio privado y mecanismo de borrado ensayado | no se filtra contacto ni respuestas individuales en GitHub | **BLOCKED: sin responsable/canal** |
| Q17 | Smoke privacidad/servicios: ningún tracker de estudio añadido a app | arquitectura local-first intacta; no recolectar por defecto | PASS de diseño; verificación de ejecución de piloto pendiente |

## Cómo probar G04 sin contaminar producción
Un alias de Cloudflare Pages con diferente hostname **no prueba un upgrade del mismo Service Worker**, por la separación de origen/scope. Usar ambiente efímero HTTPS **en un solo origen** sirviendo secuencialmente v1.11 y v1.12, o localhost aislado con los dos árboles; preservar copia de configuración y probar histórico. No degradar la PWA pública para ensayar. No usar GitHub Actions.

## Evaluación profesional Q15
Proveer listado de los cinco recorridos guiados **y** de los 112 medios/instrucciones exploratorios que un participante pueda abrir, más prechequeo, avisos, escalas y frases que podrían interpretarse como médicas. El profesional documenta por ítem `approve | change | remove` y recomendación sobre accesibilidad a la población voluntaria. Si no alcanza a revisar todo, **P1 es HOLD** o hay que limitar de verdad el acceso en un build de piloto, con nuevos tests. Nunca sustituir por una advertencia general.

## Severidad y manejo
- **S0:** daño potencial urgente por indicación errónea, brecha de datos, riesgo grave → STOP, detener reclutamiento y evaluar retirar/deshabilitar funcionalidad afectada.
- **S1:** imposibilidad de finalizar/salir, control imprescindible inaccesible, corrupción de historial, contenido no autorizado → HOLD + corrección mínima.
- **S2:** fricción de uso significativa o defecto funcional recuperable → decidir bloqueo según flujo afectado, documentar.
- **S3:** detalles cosméticos sin daño ni bloqueo → backlog sin inflar alcance.

## Conocido, NO volver a exigir sin cambio de código
- `npm run check` **69/69 PASS** sobre baseline de código combinado `2b70b65`; documentación posterior no exige repetir suite hasta modificación de `app/`.
- Notificación inmediata, sincronización en dos pestañas, instalación/offline Chrome Windows básico ya observadas en MK2.
- 18 rutas responsive en Chromium remoto, 6 botones navegación móvil y flujo sentado→actividad ya probados en MK2.

**Decisión actual:** **NO GO** para reclutamiento hasta Q02–Q06 y Q08–Q16 pertinentes, revisión de contenido y aprobación P1. Referencia: [ejecución y gates](../plan/EXECUTION-AND-GATES.md).
