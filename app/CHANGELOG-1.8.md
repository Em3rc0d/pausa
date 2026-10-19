# 1.8.0 · Cansancio y rigidez, con alcance explícito

- La guía se centra en cansancio o rigidez por estar sentado, según decisión expresa del usuario.
- Cambia `intensity` por `fatigue` en el estado de la guía. La escala 0–10 ya no se presenta ni interpreta como dolor.
- Retira los bloqueos numéricos de 6–10 para esta escala. Con cansancio alto se compone una pausa más breve para la misma zona: hasta dos movimientos de 20 s.
- El modelo recibe la puntuación con su significado correcto. Las reglas limitan duración y elegibilidad; el Transformer elige y ordena los IDs.
- Las pausas generales breves conservan cobertura superior e inferior cuando ambas están disponibles.
- El dolor descrito mantiene un aviso separado, junto con lesiones y señales de alarma. Se reconocen negaciones comunes como «sin dolor».
- Muestra la duración exacta (20/40 s cuando corresponde).
- No convierte ni renombra registros históricos de molestias/dolor.

Modelo, privacidad, 112 GIF/póster originales y diseño conservados. Las anotaciones siguen pendientes de revisión clínica.
