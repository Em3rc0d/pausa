# MK3 · Protocolo cuantitativo y criterio de decisión del piloto

**Estado:** umbrales **pre-registrados, aún sin participantes ni observaciones**. Versión de plan 1 (22-10-2026). Referencia histórica [MK2 14 días](../../mk2/plan/BETA-PILOT.md). No se ajustan criterios post hoc para forzar GO.

## Cohorte y cronología
- **N objetivo = 12–20 adultos consentidos**, diversas plataformas y familiaridad; mínima diversidad esperada: al menos 4 con móvil principal y 4 con escritorio principal, sin inventar representatividad.
- No reclutar solo amigos/colegas del desarrollador; registrar sesgo de conveniencia si no se evita. No muestrear pacientes para evaluar efectos terapéuticos.
- **D0** = fecha local del primer onboarding consentido de cada participante. **D7** = ventana D6–D8 (inclusiva). **D14** = D13–D15 (inclusiva). Registrar zonas si difieren.
- Cada persona puede abandonar cuando quiera. No borrar del denominador histórico a quien abandona o no responde.
- No empezar cronómetro D0 antes de P1 GO. Una prueba del fundador o una sesión de QA **no** cuenta como participante.

## Definiciones y denominadores
| Métrica | Numerador | Denominador fijo | Regla |
|---|---|---|---|
| Activation D0 | participantes que completan flujo inicial y declaran voluntariamente haber realizado al menos un movimiento | todos los N enrolados/consentidos | no basta hacer click en Finalizar |
| R7 | activados que reportan >=1 pausa **realizada** en D6–D8 | todos los activados D0 | no inferir presencia a partir de recordatorios |
| R14 | activados que reportan >=1 pausa **realizada** en D13–D15 | todos los activados D0 | no contar `missing` como evidencia positiva |
| Valor 4–5 | respondientes que marcan 4–5/5 a «Me aporta valor repetirlo» | respondientes con esa pregunta | informar también tasa de respuesta |
| Fricción | participantes con fallo crítico/abandono atribuible a producto | todos los enrolados | registrar problema y si fue reproducido |
| Avisos útiles | usuarios que eligieron activarlos y los consideran útiles | usuarios que probaron avisos y respondieron | no confundir con permiso concedido |
| Intención comercial | personas con aceptación de una oferta definida | personas efectivamente expuestas a esa oferta | **no** equivale a venta |

Con privacidad local, los conteos dependen de **autorreporte voluntario**, no telemetría; explicitar sesgo de memoria. Para `missing`, reportar intervalo de sensibilidad: límite inferior (no respuesta=sin evidencia) y superior (todos los missing regresaron) más tasa de respuesta; no etiquetarlo automáticamente como abandono confirmado.

## Umbrales orientativos de decisión — no validación estadística
**Considerar GO para iteración de producto/beta ampliada**, *solo* si simultáneamente:
1. N >= 12 con seguimiento y métricas identificables por alias privado; si N < 12 → **INCONCLUSIVE**, no fabricar éxito.
2. Activación D0 **>=70%** de N; R7 **>=50%** de activados; R14 **>=35%** de activados, usando **límite inferior conservador** de cada medición.
3. >= 60% de quienes respondan valor lo puntúan 4–5 **y** la respuesta a esa pregunta cubre >= 70% de N.
4. Ningún incidente grave de seguridad/privacidad ni problema crítico de accesibilidad sin solución, y todas las bajas quedan contabilizadas.
5. En entrevistas se identifica un problema concreto resuelto, diferenciación respecto a al menos una alternativa y evidencia cualitativa convergente. Revisión humana escrita obligatoria.

**PIVOT** si el uso existe pero se concentra en otro segmento/formato o los avisos molestan. **KILL hipótesis comercial** si la retención no cumple y entrevistas no muestran valor diferencial; la demo gratuita puede seguir disponible. **HOLD/INCONCLUSIVE** por falta de seguimiento, muestra insuficiente, sesgos severos o fallos de seguridad. Si el pilot se cancela por riesgo, STOP, no KILL de toda utilidad.

Estos umbrales son **decisiones internas exploratorias**, no estimadores poblacionales ni garantía de rentabilidad. No afirmar causalidad clínica ni disposición real a pagar.

## Rutina de contactos
- **D0:** consentimiento separado, prueba sin ayuda de seguridad → pausa sentada → actividad; elegir avisos opcionales; detectar fricciones.
- **D3:** pulso opcional de dificultades técnicas, sin presionar uso.
- **D7:** conteo autorreportado mínimo, preferencias/alternativa, pregunta abierta sobre no uso.
- **D14:** repetición, valor 1–5, utilidad recordatorios, por qué continuaría/no continuaría, alternativa preferida; ofrecer encuesta de pago separada y **sin transacciones**.
- Registrar retiradas y no respuestas en fecha real. No solicitar datos de molestias físicas ni diagnósticos.

## Resultado y custodia
Plantilla: [RESULT-TEMPLATE](RESULT-TEMPLATE.md), kit de entrevistas: [PARTICIPANT-KIT](../design/PARTICIPANT-KIT.md); datos reales **nunca** en el repositorio público. El propietario autoriza por escrito el inicio y cualquier ampliación comercial.
