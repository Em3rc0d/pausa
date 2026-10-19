# Procedencia de medios y dependencias

| Material | Distribución en este repositorio | Procedencia/documentación |
|---|---|---|
| Código PWA y medios iniciales | app/ | Snapshot Pausa v1.11.0; licencia MIT del proyecto conservada. |
| 112 GIF y 112 PNG adicionales | app/assets/fullbody/ | Paquete original suministrado para Pausa; declara ilustraciones originales y licencia MIT en [LICENSE-MEDIA](app/assets/fullbody/LICENSE-MEDIA.txt). |
| Modelo Qwen2.5-0.5B-Instruct q8 | No se incluyen pesos | Descarga de la revisión fijada de onnx-community en Hugging Face; ver [AI-LOCAL](app/AI-LOCAL.md). Revisar la licencia del upstream al redistribuir un modelo. |
| Transformers.js y runtime WASM | No se incluyen binarios | Importación desde CDN fijada a 3.8.1. Sus licencias pertenecen a los respectivos upstream. |
| Fuentes sanitarias y proyectos de referencia | Enlaces y síntesis propias | [Registro de fuentes](quarries/sources.csv). No se incorporan artículos completos ni recursos de Gym visual. |

Las declaraciones de autoría/licencia del paquete de medios se conservan como procedencia suministrada; no constituyen una auditoría independiente de derechos. El estado `clinical_review: pending` permanece en el catálogo y no se sustituye por el hecho de publicar en GitHub.
