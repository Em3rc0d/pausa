# Scripts del repositorio

`node scripts/check-repository.mjs` comprueba la estructura MK0/MK1, enlaces locales de la documentación nueva, versión base, archivos del snapshot e integridad de medios. También detecta formatos evidentes de credenciales en archivos de texto del árbol publicable.

No hace peticiones de inferencia, no ejecuta un despliegue y no sustituye las pruebas de app/. `npm run check` ejecuta ambas comprobaciones. El reporte de importación registra la reejecución de tests; no se añaden workflows de GitHub Actions.
