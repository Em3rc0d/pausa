# 1.7.0 · Composición real y objetivo preservado

- Sustituye el clasificador de similitud por un Transformer generativo local que elige y ordena IDs existentes.
- Separa candidatos, composición y validación; elimina el selector de ternas predeterminadas de la guía.
- Restringe la salida a combinaciones estructuralmente válidas y revalida antes de mostrarlas/iniciarlas.
- Elimina la ruta que sustituía la zona dolorida por una pausa de otras zonas. Molestia importante pide valoración profesional.
- Añade cancelación, control de cambios durante inferencia y fallo explícito sin falsa atribución a IA.
- Mantiene los 112 GIF/poster originales y el diseño existente.
- Modelo local considerablemente mayor: aproximadamente 512 MB de pesos q8 más runtime/tokenizador. No hay servicio de inferencia ni claves nuevas.

Las comprobaciones no sustituyen una evaluación clínica. Ver VERIFICATION.md para evidencia y límites.
