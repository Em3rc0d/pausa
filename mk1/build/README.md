# Build · Snapshot ejecutable

La implementación está en [app/](../../app/README.md), versión 1.11.0. Incluye código de navegador, Worker, Service Worker, catálogo, medios reales, tests y documentación histórica. No hay bundler, instalación npm obligatoria ni backend.

El [manifiesto de importación](source-manifest.json) identifica cada archivo original mediante tamaño y SHA-256. Su finalidad es demostrar qué se importó, no sustituir Git. Nuevas versiones deben conservar esta evidencia o registrar un nuevo snapshot, no presentar bytes cambiados como la copia original.

- [Runbook](RUNBOOK.md): ejecución, publicación, actualización y rollback.
- [Pruebas](../test/IMPORT-VERIFICATION.md): qué se reejecutó ahora y qué viene de registros previos.
- [Código original y changelog actual](../../app/CHANGELOG-1.11.md).

Los pesos del modelo, cachés del navegador, ZIP de entrega duplicados y capturas de QA no se agregan al repositorio. Se incluyen todos los medios del producto; no se reemplazan por punteros o enlaces de descarga.
