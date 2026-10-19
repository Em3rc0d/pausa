# Verificación de importación · 19-10-2026

## Base y alcance

Snapshot completo v1.11.0, conservado en app/. Se incorporan documentos y estructura Git; no se modifica el comportamiento de la aplicación ni se repiten pruebas de modelo innecesariamente por un cambio de organización.

## Evidencia histórica

[app/VERIFICATION.md](../../app/VERIFICATION.md) registra 46 comprobaciones de código, inferencia real Chromium 153/WASM con el modelo público, cantidades de cuatro y cinco, modalidad ágil, variación/omisión, escenarios lumbares, responsive y Axe. Son resultados del 18-10-2026. No se presentan como una nueva ejecución de navegador del día de importación ni como certificación clínica o de accesibilidad.

## Reejecución actual

El [resultado local](import-checks.json) registra comando, entorno, fecha, conteo de pruebas y salida de la suite reejecutada. La comprobación adicional del repositorio valida enlaces locales nuevos, estructura de fases, hashes del snapshot y conservación de medios. El resultado Git se verifica mediante árbol y SHA de blobs contra el inventario local.

## Límites

No se han reejecutado aquí pruebas de dispositivo físico, memoria de móvil, instalación/migración PWA, modo offline exhaustivo, revisión clínica ni estudios de uso/mercado. La publicación del código no cierra esos pendientes.
