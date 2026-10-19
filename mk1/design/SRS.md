# SRS · Pausa v1.11.0

## 1. Propósito y alcance

Contrato del producto existente: PWA de movilidad general para trabajo sedentario, accesible en español y con datos locales. Este SRS consolida el comportamiento importado; no representa una validación clínica ni un estudio comercial retrospectivamente aprobado.

Actores: persona usuaria, navegador y sus permisos/almacenamiento, proveedores de descarga de runtime/modelo, hosting estático. No hay usuario autenticado, administrador remoto, base de datos del producto ni motor de diagnóstico.

## 2. Requisitos funcionales

| ID | Requisito y aceptación observable |
|---|---|
| RF-001 | Navegar a Inicio, Mi guía, Rutinas, Ejercicios, Actividad y Ajustes mediante rutas hash y estado activo. |
| RF-002 | Configurar recordatorios en los intervalos existentes (25/30/45/60/90 min), activarlos, detenerlos y posponerlos; advertir que dependen de la app abierta. |
| RF-003 | Solicitar permiso de notificaciones por acción explícita; manejar ausencia/denegación sin prometer entrega con navegador cerrado. |
| RF-004 | Mostrar las cuatro rutinas existentes con sus movimientos e instrucciones; conservar los 11 medios originales. |
| RF-005 | Iniciar, pausar, reanudar, avanzar y terminar una sesión, computando tiempo realmente transcurrido en vez del tiempo omitido. |
| RF-006 | Mostrar la biblioteca de 112 pares GIF/PNG, buscar/filtrar y paginar; permitir reproducir o detener animaciones. |
| RF-007 | Ofrecer selección de zona o descripción, cansancio/rigidez 0–10, posición sentada/de pie, permiso de suelo y exclusiones por zona. La escala no es dolor ni esfuerzo del ejercicio. |
| RF-008 | Elegir Propuesta del modelo por defecto; exponer Pausa ágil como modalidad con hasta tres movimientos antes de generar y en el resultado. |
| RF-009 | Preparar candidatos existentes compatibles, sin producir una rutina en ese paso. Una zona específica seleccionada prevalece; texto sin región reconocible permite una propuesta general identificada. |
| RF-010 | Ejecutar en el dispositivo una primera inferencia para cantidad viable y otra para seleccionar/ordenar exactamente esa cantidad. No imponer un máximo universal de tres. |
| RF-011 | Validar IDs/índices, cantidad elegida, familias distintas, cobertura directa, complementos permitidos y orden de posiciones. Rechazar íntegramente salidas inválidas. |
| RF-012 | Mostrar aviso previo de alcance general; no vetar toda mención habitual de dolor. Mantener interrupción para patrones explícitos de alarma/precaución grave. |
| RF-013 | Mostrar duración real, instrucciones del catálogo, GIF/póster, región/motivo y procedencia de referencia sin afirmar validación clínica. |
| RF-014 | Omitir movimientos y generar una alternativa compatible; no reintroducir descartados durante la pestaña. Otra combinación evita el conjunto inmediatamente anterior cuando existe alternativa. |
| RF-015 | Cancelar composición; invalidar resultados al cambiar datos/modalidad; descartar respuestas obsoletas y revalidar antes de empezar. |
| RF-016 | Ante falta de candidatos, fallo de carga/inferencia, conexión limitada o tiempo excedido, informar; no mostrar un sustituto prefijado como generado por IA. |
| RF-017 | Persistir preferencias/historial local y restaurar sesión estática según normalización; mantener descripción/descartes recientes en memoria de pestaña. |
| RF-018 | Mostrar sesiones, minutos y rachas calculados desde registros reales; permitir exportar JSON y eliminar historial mediante confirmación. |
| RF-019 | Servir shell PWA y cachear medios usados/descarga opcional, tratando cuota y conectividad como condiciones; usar red primero para código cuando existe conexión. |
| RF-020 | Respetar reducción de movimiento, controles de animación y navegación por teclado; mantener legibilidad móvil. |

## 3. Reglas de negocio y excepciones

- La guía compone selecciones del catálogo; no crea nuevos ejercicios, instrucciones, tiempos ni dosis clínicas.
- Las familias evitan contar variantes equivalentes como diversidad. Los 112 GIF no son 112 candidatos distintos para toda zona; el selector tiene 25 IDs anotados.
- Con cansancio de 6 a 10, cada movimiento dura 20 s. La puntuación no determina un número fijo de ejercicios. Los otros tiempos proceden del catálogo.
- La cantidad normal la elige el modelo entre longitudes estructuralmente viables. Pausa ágil añade el máximo explícito de tres. Una selección normal de tres sigue siendo una decisión válida del modelo.
- Los complementos lumbares son opcionales, preservan región real y no reemplazan toda la cobertura directa. Como máximo uno por región complementaria dentro del presupuesto de catálogo.
- Si la zona elegida está excluida, falta cobertura directa o no hay combinación válida, se informa sin inventar sustitutos ni eliminar exclusiones.
- El generador tiene un límite de espera de 180 s, cancelación y fallo explícito. Save-Data/2G evitan iniciar esa composición. La biblioteca conserva su acceso independiente.
- Los campos históricos de molestias de rutinas estáticas no se reinterpretan como cansancio. Una puntuación antigua de intensidad pasada a la nueva API exige aclaración.
- Los registros no se convierten en diagnóstico, porcentaje de salud ni garantía de beneficio.

## 4. Requisitos no funcionales

| ID | Requisito | Criterio/alcance |
|---|---|---|
| RNF-001 | Privacidad de descripción | No se persiste ni se envía a un servicio de inferencia. Descargas externas y sus metadatos se explican. |
| RNF-002 | Integridad de medios | Preservar 112 GIF y 112 pósteres originales y sus SHA-256, además de los medios iniciales. |
| RNF-003 | Despliegue estático | app/ funciona bajo HTTP local y HTTPS de hosting, sin backend/DB/clave obligatorios. |
| RNF-004 | Reproducibilidad | Versión 3.8.1 del runtime, revisión concreta del modelo, tests locales y manifiesto del snapshot. |
| RNF-005 | Accesibilidad | Controles semánticos, foco, estados, texto de escala y motion. Evidencia automatizada no equivale a certificación. |
| RNF-006 | Responsive | Verificación histórica 320–1440 px; tarjetas de guía a una columna en móvil y sin overflow. |
| RNF-007 | Fallo honesto | Ninguna lista determinista se atribuye al modelo cuando la inferencia falla. |
| RNF-008 | Mantenibilidad | Contratos separados entre candidatos, planner, Worker, interfaz y núcleo de actividad. |
| RNF-009 | Datos locales | Normalizar datos corruptos; informar fallo de almacenamiento; no prometer recuperación remota ni cifrado. |
| RNF-010 | Presupuesto explícito de recursos | Pesos q8 de 512.096.557 bytes más runtime/tokenizador; medir rendimiento real antes de prometer soporte universal móvil. |

## 5. Casos de uso y errores principales

| Caso | Flujo principal | Alternativa/estado de error |
|---|---|---|
| CU-01 · Pausa existente | Abrir rutina → revisar → iniciar → pausar/avanzar → terminar → actividad | Precauciones según flujo estático; saltar todo no registra actividad ficticia. |
| CU-02 · Guía normal | Definir objetivo/límites → generar → cantidad por modelo → selección → validar → mostrar → decidir iniciar | Sin candidatos, salida inválida, alarma, cancelación o fallo: estado explícito, sin rutina falsa. |
| CU-03 · Pausa ágil | Seleccionar modalidad → mismo flujo de inferencia con longitudes viables hasta tres | Una petición textual de más no anula el límite visible. |
| CU-04 · Ajustar propuesta | Omitir/variar → candidatos actualizados → nueva cantidad/selección → validar | Si no hay alternativa, informar o conservar propuesta previa compatible según acción. |
| CU-05 · Cambiar contexto | Editar texto, posición, exclusiones o modalidad | Cancelar petición activa e invalidar resultado anterior; no iniciar datos obsoletos. |
| CU-06 · Recordatorios | Elegir intervalo → activar → aviso mientras abierta → hacer/posponer | Permiso denegado, pestaña suspendida o app cerrada: límites del navegador. |
| CU-07 · Biblioteca offline | Abrir medios o guardar todos → caché opcional | Cuota/red insuficiente, caché borrada o modelo ausente: no prometer disponibilidad total. |

## 6. Aceptación y límites pendientes

La [trazabilidad](../plan/TRACEABILITY.csv) vincula requisitos con componentes y pruebas. La [matriz](../test/MATRIX.md) separa automatización, pruebas históricas de navegador y trabajo pendiente. No se declara cerrado el soporte en teléfonos modestos, recordatorios nativos, revisión clínica, retención ni negocio.
