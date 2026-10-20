# Evidencia técnica y faltantes

**Observado al preparar el RC:** análisis de sintaxis con motor V8 sobre core.js, app.js, agent-ui.js, sw.js y data.js. Prueba aislada real de nextAllowedReminder/normalize: domingo 18-10-2026 → lunes a las 09:00 y compatibilidad de estructura previa.

**Pruebas añadidas inicialmente (actualizadas por QA posterior):** rutina 100 % sentada sin exigir pie, normalización y calendario horario, presencia del CTA sin IA. Deben pasar npm run check en un checkout completo.

**Bloqueo del entorno:** la máquina local de trabajo no resuelve github.com; el acceso al código se realizó por conector GitHub. No inventar que la suite, las pruebas Chromium o la integridad de recursos se ejecutaron. No crear GitHub Actions como sustituto.

**Pruebas físicas pendientes:** Chrome/Firefox móviles y escritorio, permisos, suspensión/reinicio, recordatorios duplicados en pestañas múltiples, horario en cambio de zona, app cerrada, instalación/offline, navegación accesible y revisión de indicaciones.

**Comercial:** pago real confirmado, beneficio/entrega, reembolso, política fiscal y soporte no existen todavía. NO GO comercial.

**Regresión visual HQ pendiente de validación manual:** Pausa sentado debe mostrar una persona sentada en sus tres movimientos HQ y sus GIF deben corresponder a alcance de brazos, elevación de talones e inclinación lateral, tanto en tarjeta como en sesión. Se añadieron tests de mapeo del catálogo, archivos locales y precarga. La verificación de hashes de todos los archivos multimedia sigue bajo npm run check.

**QA manual de usuario recibida (2026-10-19, commit d411187):** una captura de «Mi actividad» prueba que una sesión «Pausa sentado» se guardó localmente, con 1 sesión y racha de 1 día. Se detectaron inconsistencias visibles de redondeo (2 min versus 3 min) y plural. El parche de exactitud se aplica después de aquella evidencia; su suite y visual deben repetirse y no se declaran aprobadas anticipadamente. Esta captura no demuestra todavía que los tres GIF HQ se hayan comprobado dentro de la sesión.

**Validación local reproducida por el usuario (19-10-2026):** Node v24.11.1, npm 11.6.2. Sobre `d41118751a60d5c529ebe249274cd066567a4d70`, `npm run check` mostró **52/52 tests aprobados, 0 fallos**, además de `check:repository` status passed y 112 GIF/112 PNG íntegros. Esto certifica ese árbol para las comprobaciones existentes, no el comportamiento en segundo plano ni los flujos de pago. El parche posterior de tiempos exactos (efbb877) añade dos casos; **suite del HEAD posterior pendiente de nueva ejecución**.

**Prueba de notificación sin esperar 25 minutos:** en Preferencias se agregó «Probar aviso», habilitado solo tras permiso; envía notificación con etiqueta de prueba y no adelanta el siguiente vencimiento. Este control comprueba permiso/presentación y apertura desde el sistema, **no demuestra entrega programada con la app suspendida**.
