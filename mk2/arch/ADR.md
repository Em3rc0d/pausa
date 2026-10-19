# Arquitectura y tradeoffs de RC 1.12

1. Mantener aplicación estática local-first; ningún backend de cuentas ni inferencia obligatoria.
2. Crear ruta sin IA usando únicamente movimientos del catálogo previo; no fabricar contenido clínico.
3. Horarios locales optativos. Las pestañas suspendidas, cierre de navegador y políticas de sistema operativo impiden recordatorios garantizados.
4. Si existe permiso, preferir ServiceWorkerRegistration.showNotification cuando haya registro, con fallback tradicional. Clic enfoca/abre la app; no inicia ejercicio de forma automática.
5. No implementar checkout falso: producto pagado necesita precio/beneficio verificables, proveedor, validación del pago, facturación, reembolso y soporte.
6. Diferenciar Pausa Individual de Teams; cualquier supervisión empresarial debe proteger información personal, ser voluntaria y restringirse a estadísticas agregadas.
7. Android nativo es una investigación futura; Native SDK de Railly no se promueve como solución móvil.
8. Despliegue independiente después de pruebas; el sitio v1.11 de Cloudflare Pages permanece intacto durante review.
