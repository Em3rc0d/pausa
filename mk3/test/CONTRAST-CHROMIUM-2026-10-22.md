# MK3-P1 · Muestreo de contraste calculado en Chromium — 22-10-2026

**Sitio:** https://pausa-homeoffice.pages.dev/ · **Versión visible:** v1.12.0 · **Despliegue Cloudflare:** `e4568010-190c-4ee5-a66b-40c657e21808` (`6d403180`).  
**Entorno:** Cloudflare Browser Rendering, Chromium remoto, viewport **1280 × 800**, sesión aislada.  
**Estado:** **MUESTREO PARCIAL PASS**; NO cierra G06 ni declara conformidad WCAG.

## Método y alcance reproducibles
- Navegar por los controles `data-nav` de Inicio, Rutinas, Actividad y Ajustes, esperando cada render.
- Recolectar elementos visibles de texto mediante `#appContent p/small/label/button/h1/h2/h3/li` y selectores auxiliares `.eyebrow,.subheading,.subtext,.stat-label,.sidebar-footer`.
- Leer `getComputedStyle(element).color`, tamaño y peso de fuente; aproximar fondo visible componiendo `backgroundColor` sólido de ancestros con transparencia sobre blanco. Descartar superficies con `background-image` compleja.
- Calcular luminancia relativa sRGB y ratio WCAG; umbral **4.5:1 para texto normal**, 3:1 para texto suficientemente grande. El método no evalúa imágenes, pseudoelementos, foco, overlays dinámicos ni todos los estados.

## Resultados registrados
| Ruta | Elementos evaluados | Elementos bajo umbral en esta muestra | Ratio mínimo observado |
|---|---:|---:|---:|
| Inicio | 43 | 0 | **4.51:1** |
| Rutinas | 23 | 0 | **5.14:1** |
| Actividad | 20 | 0 | **4.51:1** |
| Ajustes | 27 | 0 | **4.77:1** |
| **TOTAL** | **113** | **0** | **4.51:1** |

**Observación:** etiquetas auxiliares `.stat-label` de Inicio/Actividad mostraron contraste aproximado 4.51:1 sobre blanco (margen mínimo), con tamaño calculado de alrededor de **10 px** en este viewport; notas auxiliares podían llegar a **8–9 px**. Ratio aprobado en este muestreo **no equivale a legibilidad práctica**. Priorizar observación en zoom 200%/400% y usuarios con baja visión antes de G06 GO.

## Límites concretos
- Prueba programática en Chromium; **NO** teclado real, NVDA, VoiceOver ni usuario humano.
- Solo cuatro vistas y elementos muestreados en estados predeterminados; no se ensayaron seis rutas completas, overlays de seguridad/sesión, mensajes de error, controles activos/deshabilitados, tooltips ni todas las superficies.
- Algoritmo de fondo es aproximación que compone fondos sólidos; puede omitir composición compleja, estados con imagen y efectos visuales. No usar resultado como auditoría de contraste exhaustiva.
- No hubo cambios de código ni de publicación, y la evidencia no implica retención, utilidad clínica, pago ni aprobación del piloto.
- **G06 sigue PARCIAL.** Deben ejecutarse Q02–Q06 del [PREFLIGHT-CHECKLIST](PREFLIGHT-CHECKLIST.md) con contraste completo, lectores, foco y zoom; además Q15 revisión profesional.

## Procedencia
Observación directa de API Cloudflare Browser Rendering del 22-10-2026, método inyectado en sesión efímera con DOM/estilos del sitio publicado. Criterio de contraste de WCAG 2.2, https://www.w3.org/TR/WCAG22/#contrast-minimum.

Registro asociado: [GitHub issue G06a](https://github.com/Em3rc0d/pausa/issues/11).