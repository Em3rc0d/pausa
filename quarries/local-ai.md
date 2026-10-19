# Quarry · IA local

## Extracción

La implementación generativa se apoya en Transformers.js 3.8.1 y el modelo Qwen2.5-0.5B-Instruct convertido a ONNX q8, con revisión fijada. El clasificador anterior de similitud se retiró porque no compone cantidades ni secuencias. Un Worker ejecuta inferencia y mantiene explícitos cancelación/fallo.

## Conclusión soportada

El código puede restringir formato/compatibilidad y exigir que la selección coincida con la cantidad elegida por el modelo. La evidencia histórica incluye inferencia real para los casos registrados. El verificador de combinaciones demuestra existencia; no debe atribuirse su testigo al modelo.

## Conclusión no soportada

No se deduce idoneidad clínica, calidad universal de recomendaciones, rendimiento aceptable en cualquier teléfono ni disponibilidad offline garantizada. Los 512 MB de pesos son un coste material de experiencia, aunque no haya pago por inferencia.

Fuentes: SRC-001 a SRC-004 del [registro](sources.csv), [AI-LOCAL](../app/AI-LOCAL.md), Worker y planner del snapshot.
