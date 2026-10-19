# Contribuir a Pausa

## Flujo

1. Revisar el [estado de MK1](mk1/README.md), [SRS](mk1/design/SRS.md) y [contrato vigente](app/SELECTION-SPEC.md).
2. Documentar el problema y criterios de aceptación. Una funcionalidad nueva pasa por brainstorming, design, arch y plan antes de build.
3. Implementar un cambio acotado en app/. No añadir un segundo catálogo binario para otra etapa documental.
4. Ejecutar `npm run check` desde la raíz y pruebas de navegador/modelo cuando el cambio las justifique. Registrar resultados y limitaciones en test.
5. Presentar un PR con comportamiento antes/después, validación realizada y límites. No declarar como comprobado lo no ejecutado.

## Reglas del producto

El modelo propone cantidad y selección; el código comprueba restricciones. No introducir ternas predeterminadas atribuidas a IA ni generar instrucciones médicas. Preservar los medios originales y la privacidad de la descripción. Cambios de persistencia, modelo, costes, telemetría, inferencia remota o reglas de alarma requieren decisión explícita y actualización del contrato.

Las referencias generales no validan las ilustraciones. Revisión profesional y validación de producto deben quedar documentadas con alcance, fecha y responsable cuando existan. No enviar datos clínicos personales en issues.

## Comandos

- `npm start`: servidor estático para app/.
- `npm test`: suite existente de la aplicación.
- `npm run check`: sintaxis, suite y comprobación del repositorio.
- `npm run check:repository`: integridad del snapshot, enlaces documentales y estructura.

No se instalan workflows de GitHub Actions ni se distribuyen pesos del modelo en Git. El historial Git registra cambios reales desde esta importación; los changelogs anteriores se conservan como documentos, sin fabricar commits históricos.
