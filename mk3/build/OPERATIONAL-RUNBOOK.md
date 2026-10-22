# MK3 · Runbook de operación sin desarrollo de nuevas funciones

## Entornos
- **Producción/demostración:** https://pausa-homeoffice.pages.dev/ (v1.12.0, sin cobrar, no llamar «beta validada»).
- **Baseline ingeniería:** `main@2b70b650` 69/69, lanzamiento Cloudflare `6d403180`.
- **Documentación MK3:** nunca desplegar `mk3/` como directorio web; publicación estática sigue siendo `app/`.
- **QA:** probar inicialmente con perfil aislado y sin datos reales; para SW upgrade, mismo origen de prueba con ambos builds y no forzar una versión vieja sobre la URL pública.

## Arranque técnico local para un hotfix justificado
```powershell
git status --short
git fetch origin
git switch main
git pull --ff-only origin main
npm run check
npm start
```
`npm start` expone localhost:4173 según README. Repetir la suite **solo** si hay cambios de código o evidencia contradictoria, no por cambios de Markdown. Antes de actualizar Pages, crear rollback identificable con deployment conocido, verificar encabezados y versión en navegador real; desplegar explícitamente `app/`, no la raíz.

## Eventos que exigen pausar P1/P2/P3
- Seguridad: lesión/malestar severo reportado, instrucciones contraindicadas, contenido no aprobado visible.
- Privacidad: fuga de contactos, historia de salud o capturas identificables.
- Calidad: bloqueo de rutina, pérdida de registro, foco imposible, botones inaccesibles que impidan uso esencial.
- Oferta: sitio solicita pagos o afirma efectos clínicos no demostrados.
Registrar incidente privado con fecha y severidad, **sin detalles médicos en issues públicos**. Si requiere code patch: commit/PR mínimo, QA, nueva baseline y trazabilidad de participantes ya iniciados (no mezclar cohortes).

## Recursos mínimos
- Propietario/product lead: autoriza P1 GO, piloto y respuesta de incidentes.
- QA accesibilidad: dispositivos físicos + lector real; reporta Q02–Q14.
- Profesional en terapia física/rehabilitación: revisa movimientos y claims; emite dictamen Q15.
- Coordinador con responsabilidad de datos: consentimiento, contacto y retiros Q16.
- Analista: consolida denominadores reales y decisión sin compartir datos personales.

No asumir contrataciones ni gastos hechos. Si no se consigue revisión profesional o custodia adecuada, **HOLD / no reclutar**.

## Seguimiento y terminación
Antes de participar: registrar acta P1 firmada. Durante 14 días: check-ins D0/D7/D14 según [medición](../plan/PILOT-MEASURES.md). Después: rellenar [resultado](../plan/RESULT-TEMPLATE.md), documentar decisión y proceder con eliminación de contactos conforme a la política informada.

El piloto no se ejecuta automáticamente por GitHub, Cloudflare ni ChatGPT. Sin participantes realmente reclutados, no hay estadísticas reales.
