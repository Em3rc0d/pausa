# G06 — auditoría acotada de contraste secundario (19-10-2026)

**Estado:** corrección propuesta en rama; sin prueba visual/lector de pantalla del HEAD. No equivale a conformidad WCAG ni cierra G06.

## Problema reproducible (criterio WCAG 2.x AA para texto normal: 4.5:1)

La regla común de `app/styles.css` para `.subheading`, `.subtext`, `.routine-card p`, `.stat-label`, `.panel-subtitle` y demás etiquetas secundarias empleaba `#667d71`. La prueba estática incorporada previamente revisaba otros selectores, por lo que esta regla quedó sin cobertura.

| Superficie clara | Antes #667d71 | Propuesto #536b62 |
|---|---:|---:|
| #ffffff | 4.43:1 | 5.76:1 |
| #f7f8f4 | 4.16:1 | 5.40:1 |
| #f0f5ee | 4.01:1 | 5.21:1 |
| #f6f8f5 | 4.15:1 | 5.39:1 |
| #eaf0df | 3.81:1 | 4.94:1 |

Cálculo de luminancia sRGB y ratio (L1 + 0.05)/(L2 + 0.05) conforme a la definición habitual de contraste relativo; redondeado a 2 decimales.

## Cambios y límites

- `app/styles.css`: regla común de textos secundarios de `#667d71` a `#536b62`. Sin tocar colores de marca, ilustraciones, contenido ni navegación.
- `app/tests/a11y-contract.test.js`: afirma el token de esta regla y comprueba los colores contra cinco fondos claros.
- Verificación algebraica y coincidencia de selector realizadas sobre contenido leído del repositorio. **No** se ejecutó `npm run check` del checkout completo ni prueba visual automatizada: este entorno no puede clonar GitHub por DNS.
- Las hojas de estilo pueden sobrescribir propiedades según cascada/especificidad, y hay componentes con colores/fondos distintos: no confundir esta prueba de tokens con medición de contrastes finales computados en navegador.
- Permanecen pruebas físicas de foco, lector, zoom, estados visuales e instrucciones por profesional competente, según `ACCESSIBILITY-PROTOCOL.md`.

## Criterio de integración

1. En checkout completo del HEAD de la rama, ejecutar `npm run check`; documentar commit y resultado.
2. Comprobar visualmente que los textos secundarios en Inicio, Rutinas, Preferencias y Actividad mantienen jerarquía y contraste en Chrome/Firefox, móvil/escritorio y zoom 200 %.
3. Mantener G06 abierto hasta ejecutar protocolo completo y revisión profesional del contenido. No lanzar beta pública desde este cambio aislado.


## Resultado de incorporación de la corrección
El código y el test de contraste de la [PR #5](https://github.com/Em3rc0d/pausa/pull/5) se fusionaron a release en `67bc70be03c7294bc83c4f54b7a7daf18ee9b970`, después del CS-04. Los tres casos del archivo de accesibilidad se ejecutaron en V8 aislado y pasaron; **no** se volvió a ejecutar `npm run check` nativo sobre ese commit combinado. Los números de contraste aplican a los tokens estudiados, no a cada estilo calculado en navegador. El gate G06 continúa **PARCIAL/PENDIENTE**, con teclado, lector de pantalla, zoom, navegación responsive y evaluación profesional por realizar. El merge solicitado no constituye una certificación WCAG.
