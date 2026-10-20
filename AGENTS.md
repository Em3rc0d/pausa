# Trabajo en Pausa

Lee README.md, mk1/design/SRS.md, mk1/arch/ARCHITECTURE.md y app/SELECTION-SPEC.md antes de cambiar comportamiento.

- El contrato vigente es v1.11.0: el mismo Transformer decide la cantidad y después compone exactamente esa selección. Solo Pausa ágil impone hasta tres movimientos. No reintroducir cuotas universales ni listas prefijadas atribuidas a IA.
- La app propone movilidad general. No presentar sus patrones o comprobaciones como diagnóstico, tratamiento o validación clínica. Conservar las interrupciones por señales explícitas de alarma.
- Posición, exclusiones, familias y cobertura se validan fuera del modelo. No inventar IDs, medios, instrucciones ni dosis. Conservar los 112 GIF/pósteres originales y sus hashes.
- La descripción y los descartes permanecen en memoria de la pestaña. No añadir inferencia remota, claves, telemetría, persistencia de descripción o backend sin una decisión explícita de producto.
- Antes de una funcionalidad nueva: brainstorming → design → arch → plan; cerrar decisiones relevantes y criterios de aceptación antes de build. Documentar test y límites reales al terminar.
- Evidencia histórica, reejecuciones actuales y trabajo futuro se distinguen. No marcar como validado un experimento comercial o clínico pendiente.
- Una nueva etapa se crea como siguiente MK sin sobrescribir la historia. mining-site registra extracción y quarries conserva síntesis/provenance.
- Ejecutar npm run check desde la raíz. Las pruebas de navegador/modelo se ejecutan cuando el cambio las justifique; no afirmar que los tests unitarios certifican calidad clínica.
- Las verificaciones y compilaciones se realizan localmente. No crear GitHub Actions para este repositorio sin autorización explícita.
- No publicar credenciales, pesos del modelo, cachés, ZIP duplicados ni capturas privadas. El directorio de publicación estática es app/.

## MK2 release candidate

Los cambios 1.12 están en mk2/ y NO sustituyen la validación clínica/comercial ni el método generativo de MK1. La rutina estática sentado no debe etiquetarse como IA. El verificador del repositorio preserva los hashes originales v1.11 de los archivos no modificados y registra explícitamente los archivos del release candidate. No declarar GO sin npm run check y pruebas reales.
