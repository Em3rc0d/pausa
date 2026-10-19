# Seguridad y privacidad

Pausa no ofrece cuentas, backend de datos ni sincronización remota. Preferencias, actividad y sesión estática pueden persistir en localStorage bajo `pausa.local.v1`, sin cifrado. La descripción, descartes y propuestas recientes de Mi guía viven en memoria de la pestaña. Borrar datos del navegador elimina información local.

La inferencia corre en un Worker del navegador. Hugging Face y el CDN reciben solicitudes de descarga y metadatos normales de conexión, no la descripción como petición de inferencia. El runtime/modelo son dependencias externas; la versión y revisión están fijadas en el código.

Las reglas de alarma son patrones de software, no una evaluación médica. No confundir validación de JSON, catálogo o posiciones con garantía de seguridad clínica. Las ilustraciones siguen pendientes de revisión profesional.

No publiques credenciales, datos clínicos personales, copias de localStorage ni capturas privadas al reportar un problema. Para defectos sin datos sensibles, aporta pasos de reproducción, versión, navegador, resultado esperado y observado mediante un issue. Si GitHub ofrece una vía privada de reporte, úsala para información sensible; este documento no afirma que dicha función esté habilitada ni promete un plazo de respuesta.

Áreas a revisar ante cambios: interpolación de HTML y escape, mensajes del Worker, índices/IDs, cancelación y estado obsoleto, permisos de notificación, cuota de almacenamiento, caché de código y dependencia del modelo/runtime.
