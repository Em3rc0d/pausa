# MK3 · Límites de datos, seguridad y gobierno del piloto

## Arquitectura del producto bajo estudio
La PWA v1.12 sigue local-first: `localStorage` para historial, preferencias y check-ins voluntarios; no existe un backend de cuentas ni un pipeline de telemetría remota. Los controles de seguridad de la app son orientativos y no sustituyen valoración profesional.

## Arquitectura del estudio — separada de la app
**No modificar la aplicación ni introducir trackers.** Mantener dos ámbitos:

- **A. Directorio de contacto**: alias/código aleatorio y canal privado voluntario de seguimiento; bajo custodia del responsable del estudio, en almacenamiento privado con acceso limitado. Nunca GitHub, issues o PR.
- **B. Registro de investigación**: código anónimo tipo `P001`, consentimiento (sí/no y fecha), dispositivo por categoría, eventos agregados informados voluntariamente (D0/D7/D14), incidencias y respuestas textuales desidentificadas. Sin nombres ni datos médicos. Conservar vínculo entre A y B **solo** fuera del repositorio público para retiradas.
- **C. Informe público**: números agregados de cohorte, citas parafraseadas sin identidad y conclusiones con límites. No publicar registros fila-por-fila que permitan reidentificar con cohortes pequeñas.

## Datos mínimos de la investigación
| Campo | Por qué | Tratamiento |
|---|---|---|
| `participant_id` | seguimiento D0, D7, D14 | pseudoaleatorio, separado de contacto |
| `consent_at`, `withdrawn_at` | prueba de consentimiento/retiro | privado |
| `device_class` | incompatibilidades | `desktop`, `android`, `ios`, `other` |
| `activated_d0` | primera rutina terminada sin ayuda | booleano / no respuesta |
| `return_d7`, `return_d14` | repetición en ventanas definidas | booleano, missing separado |
| `notifications_choice` | fricción de avisos | sí/no/no compatible |
| `issue_type`, `severity` | riesgo UX/técnico | sin contenido médico identificable |
| `value_rating` | valor cualitativo | 1–5 opcional + explicación desidentificada |

No pedir JSON de exportación completo, horarios exactos, historial granular, puntuaciones de dolor, geolocalización, empresa, supervisor ni diagnóstico. Contacto solo si imprescindible para seguir el estudio.

## Controles obligatorios antes de reclutar
1. Identificar responsable y medio de contacto; definir fin del tratamiento de datos, base habilitante, derechos, mecanismo de baja y acceso.
2. Entregar explicación en lenguaje claro y consentimiento específico, explícito, voluntario, documentado; consentimiento al estudio **separado** de cualquier formulario de la PWA. No asumir que el checkbox del prechequeo médico otorga consentimiento de investigación.
3. Derecho a retirarse sin motivo, pedir eliminación y no participar en preguntas opcionales, sin repercusiones. Registros individuales se suprimen tras retiro salvo evidencia que deba conservarse legalmente, documentando la base.
4. Política operativa propuesta: eliminar datos identificables y vínculo de contacto dentro de **30 días posteriores al cierre** del piloto, salvo obligación documentada; avisarlo antes del reclutamiento. Las métricas agregadas irreversibles pueden conservarse.
5. Evitar canales laborales jerárquicos y capturas que expongan notificaciones o datos personales. Registrar incidentes de privacidad y detener tratamiento si aparece un problema de alto riesgo.
6. Revisar aplicabilidad del Reglamento de la Ley N.º 29733 (D.S. 016-2024-JUS, vigente desde 31-03-2025). Esta guía **no es un dictamen legal**: si se manejan datos sensibles o se institucionaliza el estudio, solicitar evaluación legal especializada.

## Modelo de amenaza mínimo
- **Repositorio público:** filtración de identidad ⇒ solo plantillas y agregados anonimizados.
- **Pérdida de dispositivo:** dato local sin cifrado ⇒ advertencia y no uso en equipos compartidos.
- **Retiro:** contacto residual ⇒ mapa privado de consentimientos y procedimiento de borrado.
- **Cohorte pequeña:** riesgo de identificación por combinación ⇒ publicar solo resúmenes y categorías amplias.
- **Correos/mensajería:** mensajes reenviados con información personal ⇒ comunicaciones individuales, sin grupos que expongan contactos.

Referencias oficiales en [mining-site](../mining-site/EXTERNAL-REFERENCES.md). El piloto no se activa hasta que estos controles tengan responsable asignado.
