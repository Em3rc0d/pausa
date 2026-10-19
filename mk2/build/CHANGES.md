# Implementación de RC 1.12.0

- Se añadió Pausa sentado con movimientos ya presentes: seatedReach, seatedHeels, seatedSideBend (145 s), vinculados a los GIF HQ seated-overhead-bilateral, seated-heels-bilateral y seated-side-bend-bilateral.
- Las CTA principales y avisos priorizan esta ruta rápida; las cuatro rutinas antiguas permanecen.
- Estado de recordatorio normalizado incluye ventana laboral opcional y lunes-viernes.
- Los avisos intentan usar service worker en navegadores compatibles y el clic devuelve a la app.
- Mi guía informa el costo aproximado de descarga del modelo y enlaza rutinas inmediatas.
- Cabeceras HTTP adicionales y estilos de agenda responsive.
- Actualización de identificadores de recursos estáticos y tests unitarios/contractuales.

No se ha implementado un sistema de pago, backend, clínica, telemetría remota ni Play Store. El contenido multimedia no se sustituyó.

## Corrección media HQ tras prueba manual

El usuario detectó en el RC que Pausa sentado mostraba imágenes legadas. El catálogo de 112 contiene animaciones HQ de movimientos sentados, pero no equivalentes exactos para el giro torácico y la movilidad pélvica en silla. Por tanto **no se reasignan GIF incorrectos a las instrucciones anteriores**: Pausa sentado usa tres movimientos explícitos compatibles con los recursos HQ reales, con títulos e instrucciones actualizados. app.js centraliza la resolución de media (tarjeta, diálogo, sesión y toggle); sw.js precarga sus seis recursos para uso offline. No se reescriben ni regeneran medios originales.
