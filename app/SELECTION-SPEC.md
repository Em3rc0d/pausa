# Pausa 1.11 · Cantidad decidida por el modelo

## Contrato vigente (18-10-2026)

Sustituye las reglas de cantidad de 1.10 descritas abajo. La opción predeterminada es «Propuesta del modelo»: el Transformer elige cantidad, IDs y orden, sin un máximo universal de tres ni obligación de llenar el catálogo. El límite técnico se deriva de las familias disponibles (sin duplicarlas), posiciones y exclusiones, no de una longitud prescrita por reglas. Una selección de tres sigue siendo válida si el modelo la elige; no se etiqueta automáticamente como ágil.

«Pausa ágil» es una opción explícita con hasta tres movimientos. El límite aparece antes de generar y en el resultado. Los tiempos siguen procediendo del catálogo: con cansancio alto son 20 s por movimiento; la puntuación no fija su cantidad. La interfaz dice «El modelo eligió N movimientos» y muestra la modalidad y duración real.

Los complementos lumbares son opcionales, conservan su región real y no sustituyen cobertura directa. Máximo uno por región complementaria; no se exige añadirlos para llenar tres puestos. Se mantienen las comprobaciones de objetivo, familia, posición, exclusión, señales explícitas de alarma y variación. Una propuesta general debe incluir los grupos corporales disponibles, sin exigir todas las regiones del catálogo.

El mismo Transformer actúa en dos pasos locales: primero elige una cantidad entre las longitudes viables; después elige y ordena exactamente esa cantidad de IDs. La primera decisión considera modalidad, objetivo, cansancio y preferencias del texto; no se deriva de un máximo fijo ni obliga a usar todos los patrones. El segundo paso no puede añadir ejercicios por el mero hecho de continuar una lista. El resultado se contrasta contra la cantidad elegida por el modelo.

La gramática de cantidad enumera solo números viables; la selección usa fragmentos incrementales, sin enumerar todas las permutaciones completas. Una comprobación de completabilidad memoizada evita ramas sin salida. Las dos decisiones provienen de inferencia real del mismo modelo, no de una cantidad heurística presentada como IA. La salida sigue siendo exclusivamente estructurada; las instrucciones y tiempos son del catálogo.

## Reglas que permanecen

- Propuesta general de movilidad, sin diagnosticar ni prescribir un tratamiento. Aviso visible antes del formulario y participación voluntaria.
- Las descripciones habituales de dolor no se bloquean por esa palabra ni por un perfil previo de precaución. Las señales explícitas de alarma y síntomas graves mantienen interrupción y orientación profesional.
- La zona específica seleccionada prevalece. La selección genérica permite usar la región reconocida en la descripción. Texto sin región reconocible produce una propuesta de cuerpo completo, identificada como general.
- Se respetan posición, superficie, exclusiones por zona y movimientos descartados. Si falta cobertura directa para un objetivo, se informa sin sustituirlo por complementos.
- La IA elige exclusivamente IDs y orden del catálogo elegible. Instrucciones y tiempos son fijos del catálogo; no se inventan ejercicios, movimientos gráficos ni dosis clínicas.
- Los 112 GIF y 112 pósteres originales se mantienen; 25 IDs tienen anotaciones para selección automática. Las variantes de una familia no cuentan como movimientos distintos dentro de una misma propuesta.
- Descripción, descartes y selecciones recientes permanecen en memoria de la pestaña. Inferencia local WASM, sin API de inferencia remota. Descarga inicial y limitaciones de caché/memoria sin cambios.
- Cancelación, cambios de contexto/modalidad y comprobación antes de empezar impiden mostrar o iniciar una propuesta incompatible. Si falla la inferencia, se informa sin presentar un sustituto prefijado como generado por IA.

El contrato de 1.10 queda conservado como histórico en SELECTION-SPEC-1.10.md.
