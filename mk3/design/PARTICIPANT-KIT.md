# MK3 · Kit del investigador y del participante — plantillas, NO enviado

**Estado: BORRADOR OPERATIVO. NO RECLUTAR hasta P1 GO**. Personas adultas voluntarias; no solicitar experiencias médicas o síntomas. Sin incentivos condicionados al uso de ejercicios.

## 1. Invitación breve
> Estamos evaluando Pausa, una aplicación web gratuita que ayuda a interrumpir jornadas frente a pantallas con pausas voluntarias. Es un prototipo de bienestar general, **no** una herramienta médica ni un tratamiento. Si se autoriza el piloto, buscamos personas adultas que quieran probar voluntariamente la experiencia durante 14 días y contarnos qué les resulta útil o incómodo. Puedes no utilizar ninguna rutina, retirar el consentimiento y dejar de participar en cualquier momento. Los contactos y resultados individuales no se publicarán. Antes de inscribirte recibirás la explicación completa de datos y el contacto de la persona responsable.

**No usar invitación** hasta completar revisión del material, QA accesibilidad, consentimiento final, canal del responsable y plan de custodia de datos.

## 2. Hoja de información / consentimiento separado de la app
Campos obligatorios que el responsable debe completar *antes* de uso real: nombre o denominación del responsable, medio directo de contacto, propósito, datos mínimos, dónde se custodian, personas autorizadas, plazo de conservación, procedimiento de acceso/retiro/borrado, eventual difusión solo agregada y mecanismo para reportar incidentes.

Texto sugerido para adaptar:
> Entiendo que este estudio evalúa **usabilidad y hábitos de uso reportados** de una aplicación experimental. No ofrece diagnóstico, tratamiento ni garantía de mejorar mi salud. Mi participación es voluntaria; puedo omitir ejercicios, preguntas y contactos, o retirarme sin perjuicio. Pausa guarda datos localmente en mi dispositivo y, si participo, el investigador solo solicitará datos mínimos opcionales de uso y opinión por un canal acordado. No se pedirá mi historial íntegro ni registros médicos. Conozco la persona responsable, el fin de los datos y el procedimiento de eliminación. Puedo reportar incidencias y detener la actividad ante molestias.

Casilla **independiente**: «Acepto participar en esta evaluación de uso y que se traten exclusivamente los datos explicados». Fecha, versión del texto y trazabilidad del acto: **solo registro privado**. Ninguna casilla preseleccionada.

## 3. Guion D0 (sin dirigir respuesta)
1. ¿Cómo haces pausas normalmente cuando llevas tiempo en pantalla? ¿Qué usaste la última semana?
2. ¿Qué esperas que haga esta aplicación? (mostrar portada; no explicar funcionalidad primero).
3. Encuentra una rutina que puedas realizar sentado. Narra qué buscas; el facilitador observa sin guiar.
4. Completa el prechequeo orientativo y decide libremente si deseas continuar; la persona puede abstenerse sin dar motivos.
5. Si decide y es apropiado, completa un movimiento y la rutina; observa la comprensión del temporizador y cómo volver a Inicio.
6. Busca tu actividad registrada, si hubo sesión. ¿Qué significa este número?
7. ¿Dejarías avisos activos? ¿Por qué? ¿Qué esperas con el navegador cerrado?
8. ¿Qué alternativa gratuita elegirías si Pausa no existiera?

La observación de interacción **no** autoriza sugerir esfuerzo físico, diagnosticar ni pedir que comparta molestias. Si aparece algo preocupante, parar y recomendar consulta adecuada, sin documentar detalles sensibles en repositorio.

## 4. Guion D7 / abandono
- ¿Cuántas pausas realizaste aproximadamente en esta ventana? «No sé» es una respuesta válida.
- ¿En qué momentos te sirvió más o menos? ¿Quién inició la pausa: tú o el aviso?
- ¿Qué paso fue frustrante o confuso? ¿Apagaste avisos o dejaste de usarla? ¿Por qué?
- ¿Qué usaste en su lugar? ¿Regresarías sin que te escribamos nosotros?

## 5. Guion D14
- ¿Cuándo fue tu última pausa efectivamente realizada? ¿Qué impediría que continuases?
- Si Pausa desapareciera, ¿qué harías mañana? ¿Volverías a tu alternativa anterior?
- Del 1 al 5, ¿qué tan valioso es repetir este hábito con Pausa? Explica la puntuación.
- ¿Qué cosa deberíamos quitar, no añadir? ¿Qué información esperabas que fuera privada?
- Pregunta comercial **opcional y separada**: para una oferta descrita con precio real, ¿qué acción harías hoy? Sin prometer que ya existe checkout.

No interrogar por diagnósticos, dolor ni empresa/empleador. Quien rehúse responder se registra como no respuesta, no como adhesión.

## 6. Plantilla de acta privada (NO subir rellena a GitHub)
```text
participant_id: P###
consent_version: MK3-v1
consent_at: [private]
device_class: desktop | android | ios | other
D0_flow: completed | blocked | declined | missing
D0_movement_self_report: yes | no | unknown
D7_actual_break: yes | no | unknown
D14_actual_break: yes | no | unknown
reminders: useful | intrusive | not_tried | unknown
value_1_to_5: integer | skipped
observed_issue_ids: [technical references only]
withdrawal: yes | no
```

No incorporar alias, correo, números de teléfono, capturas o datos persona-específicos en commits o issues. Este kit es un punto de partida para revisión ética/legal, **no** un consentimiento final ya aprobado.
