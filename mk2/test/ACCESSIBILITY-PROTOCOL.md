# G06 — Protocolo de revisión de accesibilidad, seguridad de uso y contenido

**Estado:** NO EJECUTADO en dispositivos por el agente. Controles estáticos de semántica/contraste NO equivalen a conformidad WCAG.

## Teclado y foco (Chrome y Firefox escritorio)
- Tab desde barra del navegador muestra «Saltar al contenido»; Enter lleva al `main`.
- Menú lateral, menú móvil, preferencias, campos de hora, «Probar aviso» y selección de rutina: Tab y Shift+Tab funcionan sin trampa.
- Modal de seguridad / detalle / sesión: foco permanece dentro, Escape sale según estado, al cerrar vuelve al control original. Al cambiar de movimiento, título e instrucciones son legibles con lector.
- Los radios de escalas 0–10 se anuncian con su pregunta agrupada y el valor seleccionado.
- Los avisos y toasts no toman el foco ni interrumpen una sesión involuntariamente.

## Visual
- Zoom 200 % y ancho 360/768/1280px: contenido y botones accesibles sin desplazamiento horizontal; comprobar 400 %/320px como prueba adicional si el entorno permite.
- Texto secundario importante con contraste al menos 4.5:1. No afirmar que todos los estados/tokens ya están auditados.
- Bajo `prefers-reduced-motion`, no reproducir animación automáticamente; existe un modo estático entendible con instrucciones de texto.
- Todos los GIF tienen alternativa textual y ninguna animación es imprescindible para completar el movimiento.

## Casos de bienestar y contenido
- Comprobar que un aviso no afirma «llevas sentado X» sin sensores ni medición real.
- Verificar que las instrucciones no prometen tratar ni prevenir una lesión específica.
- Revisar señales de alarma, límites de alcance y libertad de omitir/abandonar ante molestias.
- Hacer revisión profesional del catálogo y declaraciones sanitarias antes de comercializar. Una sesión exitosa y un test de catálogo no prueban idoneidad clínica.

## Evidencia que debe guardarse
Navegador/versión, dispositivo, entorno, commit SHA, pasos, resultado PASS/FAIL, capturas sin datos personales, prioridad, fecha y responsable. Falla de seguridad de usuario o imposibilidad de operar con teclado implica NO GO.
