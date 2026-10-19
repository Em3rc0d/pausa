# Pausa 1.11 · Composición generativa local

## Cambio de responsabilidad

Se retira MiniLM/feature-extraction: era un modelo de similitud, no un generador de rutinas. No hay listas predeterminadas presentadas como inferencia.

- `agent-core.js` prepara exclusivamente candidatos del catálogo que cubren el objetivo y sus complementos explícitos, y cumplen posición, exclusiones y comprobaciones de síntomas. Devuelve `items: []`; no elige una rutina.
- `agent-planner.js` construye el contexto y el catálogo, restringe la decodificación y valida el resultado.
- `agent-worker.js` ejecuta `text-generation` con Transformers.js **3.8.1**, `onnx-community/Qwen2.5-0.5B-Instruct`, revisión **cc5cc01a65cc3ff17bdb73a7de33d879f62599b0**, WASM q8 en un worker. La salida elige índices y su orden. No genera instrucciones, tiempos, dosis, diagnósticos ni ejercicios nuevos.
- La interfaz solo muestra `source: transformer` tras una inferencia real aceptada. Si falla la carga, el formato o la validación, informa del fallo; no atribuye una lista de reglas a la IA.

## Decodificación y validación

La composición usa dos llamadas al mismo pipeline local ya cargado. Primero se calculan las longitudes estructuralmente viables; el modelo elige una mediante JSON `{"count":N}`, condicionado por objetivo, modalidad, cansancio y contexto. Después el mismo modelo selecciona los índices y su orden mediante `{"pick":[...]}`, con una gramática que exige esa cantidad. Se valida que la longitud final coincida con la decisión del modelo. El paso de cantidad admite hasta 20 tokens y la selección hasta 128.

Esta separación evita el sesgo observado en una prueba exploratoria: al decidir si cerrar o continuar la lista token a token, el modelo recorrió casi todo el catálogo general pese a pedir cinco movimientos. La corrección evita atribuir ese recorrido a una decisión previa de cantidad. La gramática de cantidad solo enumera números viables; la de selección crea fragmentos incrementales. Los prefijos numéricos ambiguos se mantienen en paralelo hasta distinguirlos. La comprobación de completabilidad memoiza conjuntos y grupos de posición, sin enumerar todas las permutaciones completas. Su testigo no se presenta como selección del modelo.

Se prohíben familias repetidas, regiones ajenas al objetivo o sus complementos explícitos, pérdida de cobertura directa, transiciones de posición redundantes y pérdida de cobertura superior/inferior disponible en una propuesta general. «Otra combinación» excluye el conjunto anterior; una cantidad diferente es válida. Se admite como máximo un movimiento por familia. El límite técnico deriva de las familias elegibles y, solo en Pausa ágil, se acota además a tres. La generación no produce instrucciones médicas.

Las comprobaciones estructurales no establecen idoneidad clínica. No existe un mecanismo validado de confianza médica. El modelo no tiene autoridad para levantar restricciones. Las descripciones siguen siendo contexto necesario; el cambio evita que activen una terna prefijada, no pretende ignorar lo que indica la persona.

## Alcance: propuesta general de movilidad

El usuario pidió presentar una rutina general con aviso inicial, sin bloquear automáticamente palabras como «me duele». El generador ya no requiere un cuestionario obligatorio adicional ni usa cualquier mención de dolor como veto. El texto identifica una región, no un diagnóstico ni una terapia. El aviso recomienda orientación profesional ante problemas frecuentes, persistentes o que empeoran; la participación es voluntaria.

Las señales de alarma explícitas y los patrones de síntomas neurológicos, traumatismo relevante, lesión o limitación funcional grave conservan sus interrupciones. El aviso no se interpreta como autorización médica. Un perfil previo de precaución por molestias persistentes mantiene el aviso pero no bloquea por sí solo; un perfil de alarma urgente sí interrumpe.

«Parte baja de la columna» se reconoce como lumbar. La inclinación lateral sentado original se incorpora al conjunto elegible con anotación de ingeniería, pendiente de revisión clínica. Hay 25 IDs anotados; los 112 originales siguen disponibles. La asociación regional y la referencia general no validan la adecuación para un dolor concreto.

La escala `fatigue` sigue significando cansancio/rigidez, no dolor. Con valores de 6 a 10 cada movimiento dura 20 s; ese valor no fija el número de ejercicios. La modalidad predeterminada «Propuesta del modelo» delega cantidad, IDs y orden al modelo. Se eliminan la longitud exacta, el máximo universal de tres y la obligación de llenar puestos de 1.10. La opción explícita «Pausa ágil» admite hasta tres movimientos. La interfaz identifica la modalidad, dice cuántos movimientos eligió el modelo y calcula la duración con los tiempos del catálogo.

Lumbar sentado dispone de una familia directa de tronco. Sus complementos explícitos de piernas/cadera y hombros mantienen su región real y son opcionales, con máximo uno por región complementaria. Nunca sustituyen toda la cobertura directa ni se exigen para llenar tres puestos. Sus anotaciones y el conjunto del producto siguen pendientes de revisión clínica. La elección de cantidad por un modelo de 0,5B no establece una prescripción profesional ni un número óptimo validado.

Se conservan posiciones, exclusiones y comprobaciones de alarma. Los 112 GIF no son 112 patrones distintos para cualquier zona: incluyen variantes por lateralidad. No se cuentan variantes de una misma familia como ejercicios distintos para alargar una propuesta. Un texto sin región reconocible produce una propuesta general claramente identificada.

## Privacidad, coste de descarga y disponibilidad

No se incorpora servidor de inferencia ni API de pago. La descripción y las selecciones recientes no se envían a Hugging Face ni a un servicio de inferencia; permanecen en memoria de la pestaña. Hugging Face y el CDN reciben solicitudes de descarga y los metadatos normales de conexión.

El archivo q8 pesa **512.096.557 bytes** (aprox. 512 MB decimales), más tokenizador y runtime. Es sustancialmente mayor que el modelo anterior. La caché puede evitar descargas posteriores, según el navegador. Requiere memoria disponible y no se garantiza en móviles de poca capacidad. Save-Data/2G impiden iniciar la composición. Hay cancelación y un límite de 180 s; el fallo no produce una rutina de sustitución. La composición en frío puede ser lenta y depende de red/caché. La biblioteca y las rutinas existentes conservan sus funciones sin IA.

## Fuentes técnicas consultadas 2026-10-18

- https://huggingface.co/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2
- https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct
- https://huggingface.co/onnx-community/Qwen2.5-0.5B-Instruct
- https://huggingface.co/docs/transformers.js/v3.8.1/guides/dtypes
- https://huggingface.co/docs/transformers.js/api/generation/logits_process
