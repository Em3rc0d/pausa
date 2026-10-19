# Viabilidad y alternativas

| Alternativa | Ventaja | Restricción | Situación |
|---|---|---|---|
| PWA estática y datos locales | Fácil de alojar, sin backend obligatorio | Temporizadores/caché sujetos al navegador | Implementada |
| Rutinas fijas existentes | Inicio rápido, funciona sin inferencia | Selección menos contextual | Implementadas como flujo independiente |
| Clasificador semántico | Menor descarga que el generador actual | Similaridad no compone una rutina | Sustituido en la evolución |
| Transformer generativo local | Elige cantidad, IDs y orden sin API de inferencia | Descarga q8 de unos 512 MB, latencia y memoria | Implementado, límites documentados |
| Servicio de inferencia remoto | Puede ampliar capacidad del modelo | Coste, red y cambio de privacidad | Fuera del alcance autorizado |
| App nativa | Posibles capacidades de recordatorios del sistema | Otra implementación, permisos y validación | Hipótesis pendiente |

Viabilidad técnica observada en navegador no prueba uso sostenido, adecuación clínica, soporte universal de teléfonos ni rentabilidad. El mayor riesgo técnico actual es la experiencia en dispositivos modestos y primer uso del modelo. El mayor riesgo de producto es confundir movilidad general con una recomendación clínica.

La revisión médica del contenido, medición reproducible en móviles y validación externa del problema son trabajos pendientes. No hay evidencia suficiente para declarar cerrado un GO comercial.
