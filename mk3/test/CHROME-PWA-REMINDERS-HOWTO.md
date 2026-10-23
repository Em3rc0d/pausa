# MK3 · Guía práctica G04/G05 para probar Pausa en Chrome Windows

**Fecha:** 22-10-2026. **Versión del sitio:** https://pausa-homeoffice.pages.dev/ (v1.12.0). **Perfil personal:** no borrar datos.  
**Objetivo:** ayudar al propietario a obtener recibos adicionales sin repetir QA ya aprobado. No constituye nueva ejecución ni gate PASS por sí mismo.

## Evidencia ya obtenida — no repetir por rutina
- PASS por autorreporte, sin problemas: teclado Chrome (Tab, Shift+Tab, Escape), NVDA en prechequeo/rutinas/historial, zoom 200/400. [Recibo](OWNER-QA-SELF-REPORT-2026-10-22.md).
- PWA instalada y offline básico en Windows ya se verificaron previamente (MK2), igual que aviso inmediato y sincronización de preferencias en dos pestañas. Si no cambió el código, sus pruebas originales sirven como evidencia histórica; no presentar nueva guía como ejecución adicional.

## G05-1 · Notificaciones bloqueadas (Q10, 3–5 minutos)
1. Abrir Pausa en Chrome Windows, ventana **normal** (no incógnito).
2. Abrir **Preferencias**. Revisar bloque «Notificaciones del navegador» y botón «Probar aviso».
3. En Chrome, a la izquierda de la URL, pulsar icono de **información del sitio** (controles/deslizadores) → **Configuración del sitio** → **Notificaciones** → **Bloquear**. Alternativa: `chrome://settings/content/notifications` y excepción para el origen exacto.
4. Volver a Pausa, actualizar `F5` y abrir Preferencias. Debe mostrar «Bloqueadas en el navegador»; «Probar aviso» aparece inhabilitado y abrir «Pausa sentado» continúa disponible. El sistema no debe bloquear la guía por falta de permiso.
5. **Restaurar la preferencia anterior** en Chrome (Permitir si antes estaba permitida), recargar y anotar qué muestra Pausa. No usar la configuración de *borrar datos del sitio*.

**Recibo:** Q10 PASS si la aplicación sobrevive a bloqueo/restauración, no promete avisos y no muestra errores. Anotar Chrome/Windows, valor anterior y restaurado.

## G05-2 · Recordatorio al vencimiento real en dos pestañas (Q11, mínimo 25 min)
1. En **Preferencias → Frecuencia de las pausas**, escoger **Cada 25 minutos** (mínimo configurado por el producto); anotar valor original para restaurar luego.
2. Para que el horario no desplace el vencimiento, desactivar temporalmente «Respetar mi horario laboral» y «Solo lunes a viernes», dejando anotados los valores originales.
3. Permitir notificaciones en Chrome. Activar **Jornada con recordatorios**; comprobar en Inicio que aparece cuenta atrás alrededor de 25:00.
4. Duplicar la pestaña (clic derecho en tab → **Duplicar**), **sin activar la jornada por segunda vez**.
5. Mantener Chrome abierto y una pestaña Pausa visible (puedes usar el equipo normalmente sin suspenderlo; deja el navegador abierto). Al vencimiento observar si el estado pasa a pendiente en ambos tabs y si aparece **como máximo una notificación de sistema para ese vencimiento**. Notas sobre toasts entre tabs según foco.
6. Documentar si hubo duplicados, desajuste de estado, tiempo real, avisos no mostrados y permisos del SO; evitar deducir una garantía universal por un solo caso.
7. **Restaurar** el intervalo, switches del horario, permiso y estado de jornada anterior. Si configuraste una sesión, anota si quedó activada o detenida.

**Recibo:** Q11 PASS acotado si no hay doble reclamación/aviso y las pestañas mantienen estado coherente; si no se emite notificación, registrar permisos y circunstancias: no declarar PASS del aviso, pero examinar estado visual. Pruebas de suspensión (Q12) y DST (Q13) son distintas, pendientes.

## G04 · PWA e historial (opcional; básico ya aprobado)
- La opción **Instalar** de Chrome (icono junto a barra de direcciones o menú de Chrome) instala el sitio como app. **No desinstalar la app existente para repetirlo**.
- Inspeccionar sin borrar: abrir Pausa, `F12` → pestaña **Application** (si no aparece, usar `>>`) → **Service workers** → comprobar que hay registro de `sw.js` para el origen `https://pausa-homeoffice.pages.dev/`.
- Si necesitas una verificación puntual offline adicional: con sitio y rutina `Pausa sentado` ya cargados, `F12` → **Network** → menú de limitación de red **Offline**; recargar con F5; comprobar que Inicio, detalles de rutina sentada y Actividad siguen accesibles. **Devolver Network a `No throttling`** inmediatamente y recargar.
- **NO activar** `Bypass for network`, `Unregister`, `Clear storage`, `Update on reload` ni `Disable cache`; podrían invalidar la prueba/caché o borrar datos.
- **No** descargar 224 recursos de Biblioteca solo para esta prueba si no es necesario; el offline de toda la biblioteca tiene un flujo diferente y depende de la cuota.

## G04 avanzado — exclusivamente en laboratorio, NO tocar producción
- **Q08:** servir v1.11 y luego v1.12 en *un mismo origen controlado* para verificar ciclo de vida de Service Worker/caché y persistencia, sin modificar el origen de Cloudflare de uso real.
- **Q09 recuperación/cuota:** perfil de pruebas limpio/efímero y simulación controlada de falla; no llenar el disco ni borrar cachés del navegador principal.
- No marcar PASS hasta tener observaciones y entorno inequívocos.

## Cómo enviar resultados
Formato sin datos personales:
```text
Chrome/Windows: [versión si se conoce]
G05-Q10 permiso denegado: PASS / FAIL
  Resultado visual:
  ¿La rutina continuó funcionando?: sí/no
  ¿Restauré el permiso?: sí/no
G05-Q11 vencimiento 2 pestañas: PASS / FAIL / INCONCLUSO
  ¿Aviso del sistema?: sí/no
  ¿Avisos duplicados?: sí/no
  ¿Ambas pestañas quedaron coherentes?: sí/no
G04 offline opcional: NO REPETIDO / PASS / FAIL
  ¿Volví a No throttling?: sí/no
Notas: ...
```
**No enviar capturas con datos médicos, contactos, correos o registros personales.** El piloto continúa HOLD sin Q15 profesional y demás QA.
