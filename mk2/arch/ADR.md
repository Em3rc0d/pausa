# Arquitectura y tradeoffs de RC 1.12

1. Mantener aplicación estática local-first; ningún backend de cuentas ni inferencia obligatoria.
2. Crear ruta sin IA usando únicamente movimientos del catálogo previo; no fabricar contenido clínico.
3. Horarios locales optativos. Las pestañas suspendidas, cierre de navegador y políticas de sistema operativo impiden recordatorios garantizados.
4. Si existe permiso, preferir ServiceWorkerRegistration.showNotification cuando haya registro, con fallback tradicional. Clic enfoca/abre la app; no inicia ejercicio de forma automática.
5. No implementar checkout falso: producto pagado necesita precio/beneficio verificables, proveedor, validación del pago, facturación, reembolso y soporte.
6. Diferenciar Pausa Individual de Teams; cualquier supervisión empresarial debe proteger información personal, ser voluntaria y restringirse a estadísticas agregadas.
7. Android nativo es una investigación futura; Native SDK de Railly no se promueve como solución móvil.
8. Despliegue independiente después de pruebas; el sitio v1.11 de Cloudflare Pages permanece intacto durante review.

## G05: coordinación de notificaciones entre pestañas (2026-10-19)

El recordatorio utiliza ahora una reclamación idempotente del estado pendiente: antes de notificar lee el estado compartido y marca `pending`. En navegadores con Web Locks se serializa la reclamación mediante un lock de origen; en navegadores sin Web Locks permanece un fallback best-effort mediante localStorage, **sin garantía absoluta de exclusión simultánea**. Los cambios de otra pestaña no fuerzan a pausar una sesión ya activa. La notificación del SW envía un mensaje a la pestaña recuperada para llevar la UI a Inicio. Ninguna de estas medidas crea notificaciones con la app cerrada.
