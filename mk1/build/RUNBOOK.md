# Ejecución, publicación y recuperación

## Desarrollo local

Desde la raíz:

```bash
npm run check
npm start
```

Abre http://localhost:4173. Python sirve app/; Node ejecuta verificaciones. La PWA requiere localhost o HTTPS para sus capacidades del navegador. Abrir index.html mediante file:// no reproduce instalación, Worker/cachés y permisos correctamente.

La reproducción de ilustraciones y rutinas estáticas no necesita una API de IA. La primera composición sí requiere descargar el modelo/runtime y memoria suficiente. Las bibliotecas se cargan desde CDN/Hugging Face según app/AI-LOCAL.md; no hay una clave secreta que configurar.

## Publicación estática

Publicar únicamente el contenido de **app/**. Mantener _headers, manifest, sw.js y rutas relativas de assets. Si se conecta GitHub con Pages en el futuro, configurar app como directorio de salida o raíz apropiada y probar una preview; esta importación no cambia la configuración actual de Cloudflare ni añade automatismos.

No se crea un workflow de GitHub Actions. La versión y query de recursos deben actualizarse coherentemente al modificar la aplicación, junto con shell del Service Worker y pruebas de versión. Los medios originales no se regeneran para un cambio de documentación.

## Comprobaciones antes/después

Antes: npm run check, contrato de cantidad vigente, integridad de medios, ausencia de secretos y pruebas de navegador proporcionales al cambio. Después: versión visible, seis secciones, modalidades, recursos sin 404, Worker, inicio/pausa/salida y actualización de caché cuando corresponda. Registrar lo ejecutado; una comprobación de hashes no se llama prueba de inferencia.

## Estado previo documentado

La verificación del 18-10-2026 registra Cloudflare deployment e5324495-ecf9-4f3b-8ec7-4e9a0fdcf3f9 y el sitio https://pausa-homeoffice.pages.dev/. Es evidencia histórica del paquete, no una revalidación del servicio durante esta importación.

## Recuperación y datos

Ante una regresión de despliegue, conservar evidencia y usar una versión conocida del hosting/código mediante su procedimiento de rollback autorizado. No borrar historial de usuarios ni cambiar el formato local para ocultar el fallo. El historial se puede exportar como JSON desde la app; no existe respaldo remoto garantizado ni importación universal prometida.

En actualización offline o caché dañada, distinguir shell, medios y modelo. Vaciar todos los datos elimina también información local: nunca presentarlo como una operación sin consecuencias. Los escenarios de migración de PWA instalada siguen pendientes de una matriz específica.
