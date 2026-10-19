# Evidencia técnica y faltantes

**Observado al preparar el RC:** análisis de sintaxis con motor V8 sobre core.js, app.js, agent-ui.js, sw.js y data.js. Prueba aislada real de nextAllowedReminder/normalize: domingo 18-10-2026 → lunes a las 09:00 y compatibilidad de estructura previa.

**Tests añadidos (NO ejecutados en suite):** rutina 100 % sentada sin exigir pie, normalización y calendario horario, presencia del CTA sin IA. Deben pasar npm run check en un checkout completo.

**Bloqueo del entorno:** la máquina local de trabajo no resuelve github.com; el acceso al código se realizó por conector GitHub. No inventar que la suite, las pruebas Chromium o la integridad de recursos se ejecutaron. No crear GitHub Actions como sustituto.

**Pruebas físicas pendientes:** Chrome/Firefox móviles y escritorio, permisos, suspensión/reinicio, recordatorios duplicados en pestañas múltiples, horario en cambio de zona, app cerrada, instalación/offline, navegación accesible y revisión de indicaciones.

**Comercial:** pago real confirmado, beneficio/entrega, reembolso, política fiscal y soporte no existen todavía. NO GO comercial.

**Regresión visual HQ pendiente de validación manual:** Pausa sentado debe mostrar una persona sentada en sus tres movimientos HQ y sus GIF deben corresponder a alcance de brazos, elevación de talones e inclinación lateral, tanto en tarjeta como en sesión. Se añadieron tests de mapeo del catálogo, archivos locales y precarga. La verificación de hashes de todos los archivos multimedia sigue bajo npm run check.
