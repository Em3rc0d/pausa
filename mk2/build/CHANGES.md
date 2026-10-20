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

## Ajuste de exactitud del historial tras QA manual (2026-10-19)

Una captura del usuario, confirmada sobre el commit d411187, demostró que una sesión de 145 segundos figuraba como «2 min» en el resumen y «3 min» en la actividad. El origen era Math.round en sumMinutes frente a Math.ceil en duration. La UI de actividad y el modal de finalización muestran ahora el **tiempo realmente registrado** (minutos y segundos), sin mutar los logs originales; la duración de rutina planificada sigue siendo aproximada. El gráfico semanal utiliza segundos exactos y conserva el valor antiguo minutes para compatibilidad. Se ajustó también el singular «1 sesión completada»/«1 día» y se añadieron pruebas de regresión.

## G04/G05 — endurecimiento de avisos y PWA

Se coordina reclamación de vencimientos mediante Web Locks cuando el navegador lo soporta; los demás navegadores usan un fallback best-effort, sin garantizar ausencia absoluta de duplicados. La sincronización de storage respeta las sesiones activas de otra pestaña, y las notificaciones pueden abrir/enfocar Inicio. Nuevas pruebas SW de instalación, GIF precargados y uso offline; pendiente navegador real. Se corrigió además el estado de horarios al instalar desde cero y se añadieron validaciones de rango invertido. No incorpora push remoto ni notificaciones cuando Pausa está cerrada.
