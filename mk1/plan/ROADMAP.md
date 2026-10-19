# Plan y continuidad

## Importación MK1

- Recuperar snapshot v1.11.0 completo y preservar sus bytes, medios, tests y documentos históricos.
- Añadir estructura MK0/MK1 con requisitos, UX, arquitectura, decisiones, runbook y trazabilidad.
- Comprobar sintaxis/suite existente, integridad de importación, enlaces documentales y ausencia de archivos ajenos al producto.
- Publicar en el repositorio indicado y comprobar árbol/commit contra el inventario local.

La importación no introduce otra versión del producto, modifica reglas clínicas ni vuelve a desplegar el sitio. El historial Git empieza con hechos actuales; los cambios anteriores quedan en changelogs y verificaciones conservadas.

## Próximos hitos propuestos

| Hito | Entrada | Salida exigida |
|---|---|---|
| H-01 · Evidencia móvil | Dispositivos físicos y protocolo de medición | Matriz de primer uso, RAM/latencia/fallos y recomendación de soporte real |
| H-02 · Contenido | Catálogo y revisión profesional | Revisión identificable por patrón/ilustración, sin generalizar aprobación |
| H-03 · Offline/PWA | Versiones instaladas y cachés controladas | Resultados de instalación, actualización, red perdida y cuota agotada |
| H-04 · Uso externo | Piloto consentido y objetivos previos | Fricciones, resultados y decisión de continuidad |
| H-05 · Canal/producto | Resultados de uso y alternativas | Evaluación Android/tiendas/monetización y GO/PIVOT/KILL con evidencia |

Los hitos son pendientes/propuestos. No se sustituyen por más features ni se declaran completos por publicar código abierto.
