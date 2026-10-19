# Sistema de diseño vigente

## Procedencia

- OBSERVED: la interfaz y estilos de app/ v1.11.0, sus seis secciones y medios originales.
- GENERATED: consolidación semántica de este documento el 19-10-2026 y decisiones visuales documentadas desde 1.5.
- OFFICIAL: decisiones explícitas de producto recogidas en app/SELECTION-SPEC.md; no implica que existan guías sanitarias oficiales aprobando Pausa.
- INFERRED: criterios de investigación futura indicados como pendientes.
- INSPIRED: principios generales de reducción de carga cognitiva y disclosure; no se atribuye una auditoría formal de Laws of UX ya ejecutada.

El [DESIGN histórico](../../app/DESIGN.md) se conserva. Sus antiguas reglas sobre intensidad/dolor, dos columnas de guía móvil y cantidad se consideran sustituidas por el contrato 1.11 y este índice actual.

## Tokens observados

| Propósito | Valor/base |
|---|---|
| Fondo | #f7f8f4 |
| Superficie | #ffffff |
| Texto principal | #183e34 |
| Acción principal | #285f46 |
| Texto secundario/base final | #586f59; refinamientos posteriores tienen precedencia |
| Selección | #eff4e5 con borde #78975b |
| Separador | #e1e7de |
| Tipografía | Sans-serif del sistema; acento Georgia itálica en títulos cortos |
| Forma | Tarjetas redondeadas y botones de acción legibles |

styles.css conserva capas históricas y overrides; estos tokens son una especificación observada, no una extracción exhaustiva de cada declaración. No existe una librería de componentes externa ni un archivo de tokens separado en la app actual.

## Componentes y estados verificables

- Navegación: sidebar en escritorio; barra inferior y encabezado compacto en móvil. Rutas hash y estado seleccionado.
- Formulario: seis zonas, descripción opcional con selección específica, dos modalidades de pausa y escala textual de cansancio. Nunca una casilla técnica para elegir un Transformer.
- Opciones avanzadas: posición, permiso de suelo y zonas a evitar mediante disclosure.
- Composición: botón ocupado y cancelación visible solo durante petición. Cambio de datos invalida resultados anteriores.
- Resultado: modalidad y cantidad elegida, duración real, tarjeta por movimiento, región directa/complementaria, motivo, omitir, variar y control GIF/póster.
- Estados vacíos/fallo: explicar carencia o fallo real. No llenar con regiones ajenas ni simular éxito de IA.
- Avisos: alcance general antes del formulario, precaución diferenciada de alarma urgente y participación voluntaria.
- Sesión: imagen, instrucciones, tiempo restante, pausa/siguiente/salida y foco de diálogo.

## Responsive, motion y acceso

A 850 px o menos se usa navegación móvil; a 650 px o menos la guía y sus tarjetas de resultado son de una columna, con controles de zona 3×2. El catálogo de biblioteca puede mantener dos columnas y paginación propia. En escritorio los resultados largos se limitan visualmente a hasta tres columnas.

Se conserva `prefers-reduced-motion`, póster en vez de animación según preferencia, foco visible, controles semánticos, textos de estado y protección de fondo en diálogos. La evidencia histórica incluyó anchos 320/390/650/768/1440 y Axe A/AA sin hallazgos para los escenarios registrados; falta evaluación manual amplia con tecnologías de asistencia y dispositivos físicos.

## Evolución

Una revisión visual debe conservar jerarquía de tarea principal, contexto visible, reversibilidad de omitir/detener y distinción entre historial real y propuesta. Cambios de tokens/comportamiento requieren nueva evidencia visual y actualización de esta especificación.
