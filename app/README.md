# Pausa 1.11.0 · Composición generativa local

Consulta [AI-LOCAL.md](AI-LOCAL.md), [SELECTION-SPEC.md](SELECTION-SPEC.md), [CHANGELOG-1.11.md](CHANGELOG-1.11.md) y [VERIFICATION.md](VERIFICATION.md). La guía propone movilidad general con un aviso inicial. Las descripciones habituales de dolor no bloquean la propuesta ni se convierten en tratamiento médico. La escala 0–10 mide cansancio/rigidez. En «Propuesta del modelo», la IA elige la cantidad y el orden, sin un máximo universal de tres. «Pausa ágil» es una opción explícita con hasta tres movimientos. Con cansancio alto duran 20 s cada uno. Para lumbar sentado, los complementos de cadera/piernas y brazos mantienen su región y etiqueta propias. El modelo puede cerrar la selección cuando la considere completa dentro de los límites del catálogo. El modelo compone combinaciones del catálogo, no crea ejercicios nuevos ni valida tratamientos. La primera descarga local es de aproximadamente 512 MB más runtime y tokenizador.

# Pausa ✳

**Pequeñas pausas. Grandes diferencias.** Aplicación web progresiva (PWA) gratuita y de código abierto para quienes trabajan muchas horas sentados, incluidos trabajadores de home office y desarrolladores.

## Funcionalidades

- Recordatorios configurables cada 25, 30, 45, 60 o 90 minutos.
- Cuatro rutinas guiadas: Pausa express, Reset de escritorio, Movilidad lumbar, Espalda y cadera.
- 11 movimientos seleccionados para rutinas guiadas, más **112 GIF y 112 PNG adicionales de cuerpo completo** (incluidos en el proyecto, disponibles sin conexión tras su carga o descarga opcional) e instrucciones en español. Se pueden pausar las animaciones y se respeta la preferencia del sistema por movimiento reducido.
- Temporizador por ejercicio (pausa, reanudación y siguiente); reanuda una sesión interrumpida desde el punto guardado.
- Registro local de sesiones, minutos, racha y actividad de los últimos siete días.
- Registro **opcional** de molestias antes/después (escala subjetiva 0–10; no es diagnóstico).
- Control de señales de alarma antes de iniciar; bloquea rutinas ante signos urgentes.
- Exportación de historial a JSON. Sin cuenta, trackers, publicidad, servidor ni APIs pagadas.
- Instalable como PWA y disponible sin conexión tras la primera carga.

## Ejecutar

No requiere npm install, claves ni backend.

```sh
cd pausa-app
python -m http.server 4173
```

Visita <http://localhost:4173>. Para usarla en producción, publícala en cualquier hosting estático HTTPS (GitHub Pages, Netlify, Vercel, etc.). Instálala con la opción **Instalar aplicación** del navegador, cuando esté disponible. Si abres directamente `index.html` los recordatorios y la interfaz básica funcionarán, pero no se instalará ni se habilitará el service worker.

Pruebas:

```sh
npm test
npm run check
```

## Galería de imágenes y animaciones

Cada movimiento del catálogo adicional tiene su PNG y GIF animado propios, con búsqueda, filtros por zona y lado y controles de reproducción. Cinco ejercicios de suelo reemplazan también los medios de sus homólogos dentro de las rutinas guiadas. Los 11 medios anteriores se conservan como recursos originales, sin perder funcionalidades. Están en `assets/exercises/`, sin CDNs ni peticiones externas. Los dibujos y las animaciones se generan mediante `scripts_generate_media.py` (Pillow + CairoSVG). Son **esquemas originales creados para Pausa**, no son tomas reales ni instrucciones clínicas validadas. Los GIF son cíclicos y **no están sincronizados con el temporizador** de la sesión. Se debe seguir el texto, detenerse ante dolor y consultar a un profesional si los síntomas persisten.

Para regenerar los recursos gráficos (opcional, no necesario para ejecutar):

```sh
python -m pip install pillow cairosvg
python scripts_generate_media.py
```

El código, los gráficos estáticos y animados originales están distribuidos bajo la licencia MIT del proyecto. No se incluyen imágenes ni GIF de Gym visual.

## Alcance y limitaciones

Los recordatorios funcionan **solo mientras el documento sigue abierto** (incluida una pestaña abierta, sujeta a las restricciones del navegador). Una PWA web estática no puede garantizar notificaciones a horas exactas con el navegador cerrado: para ello se requeriría una implementación de sistema operativo o notificaciones push con backend. `Notification` requiere permiso explícito y un contexto seguro (HTTPS/localhost), y puede no estar disponible en todos los móviles. Las pausas se configuran como intervalos de tiempo transcurrido, no como detección real de teclado ni tiempo sentado.

El tiempo registrado se aproxima a los segundos transcurridos durante ejercicios no pausados, pero **no es una medición de actividad física real** (no usamos sensores, acelerómetro ni medimos gasto calórico). Si saltas toda una rutina, no cuenta como sesión completada. Un botón Siguiente prematuro no registra el tiempo restante como ejercicio realizado. La aplicación no ofrece diagnóstico, tratamiento o predicción clínica. Los ejercicios no son personalizados por un profesional; solo deben realizarse cuando resulten cómodos, deteniéndose ante empeoramiento del dolor. Si aparecen alteraciones de vejiga/intestino, adormecimiento genital/perineal o debilidad progresiva de piernas, debe buscarse atención médica urgente. Consulte con un profesional si el dolor irradia hacia una pierna, es persistente o limita sus actividades.

No almacenar información sensible en equipos compartidos. El historial se guarda en `localStorage` sin cifrar; borrar los datos del sitio lo elimina. No existe sincronización ni recuperación remota.

## Seguridad y accesibilidad

- Enfoque en teclado, controles semánticos y diseño responsive.
- Respeto de `prefers-reduced-motion`.
- Ninguna conexión a analítica ni servicios externos.
- La aplicación usa HTML interpolado únicamente a partir de una biblioteca local curada; el historial renderizado escapa caracteres especiales.
- El contenido deberá someterse a revisión clínica profesional antes de promocionarse como intervención para dolor lumbar.

## Fuentes de referencia (no redistribuidas)

Se estudiaron repositorios GitHub compartidos por el usuario, **sin incorporar código ni medios de los repositorios originales**:

- [`hasaneyldrm/exercises-dataset`](https://github.com/hasaneyldrm/exercises-dataset): estructura y texto MIT; **material gráfico de Gym visual con restricciones propias y licencia independiente**. No incluido.
- [`DuarteSantos8/openGym`](https://github.com/DuarteSantos8/openGym): AGPL-3.0; referencia de producto, sin código incorporado.
- [`wger-project/wger`](https://github.com/wger-project/wger): AGPL-3.0 para aplicación; licencias de contenido por entrada, no incluido.
- [`yuhonas/free-exercise-db`](https://github.com/yuhonas/free-exercise-db): Unlicense, revisado como referencia de estructura (no se redistribuyen sus imágenes).

Referencias sanitarias orientativas para la redacción original:

- [NHS — Back pain](https://www.nhs.uk/conditions/back-pain/) (recomendaciones generales, actividad y señales de alerta).
- [CDC — Adding physical activity as an adult](https://www.cdc.gov/physical-activity-basics/adding-adults/) (beneficios de aumentar el movimiento).
- [CDC — Physical activity breaks at work](https://stacks.cdc.gov/view/cdc/81144).

## Contribuir

Se agradecen issues, mejoras de accesibilidad, pruebas entre navegadores, traducciones y revisión profesional del catálogo. No envíes datos clínicos personales en issues. Las propuestas de rutinas deben incluir riesgos, adaptaciones, contraindicaciones y fuentes de calidad. Ve [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Licencia

Código, imágenes PNG y animaciones GIF creados para este proyecto: MIT, ver [`LICENSE`](LICENSE). Marcas y recursos externos enlazados son de sus respectivos titulares; no forman parte de la distribución. El código puede publicarse en un repositorio nuevo sin copiar código de proyectos AGPL.

## Biblioteca de cuerpo completo (v1.2)

- La pestaña **Biblioteca** contiene **exactamente 112 GIF y 112 imágenes PNG** suministrados en el archivo `Pausa-112-GIFs-Cuerpo-Completo.zip`, incluidos como archivos reales en `assets/fullbody/gifs/` y `assets/fullbody/posters/`. Se ha comprobado la integridad SHA-256 contra `catalog.json` del paquete recibido.
- Las fichas se muestran mediante PNG ligero por defecto. El usuario puede pulsar **Ver GIF** en cada tarjeta, abrir el detalle, buscar por título y filtrar por grupo o lateralidad. Hay paginación de 24 tarjetas para limitar carga y memoria.
- Los archivos se distribuyen con el proyecto; bajo HTTPS/localhost el service worker guarda en caché lo que se abre y el botón **Guardar todos** intenta guardar las 224 imágenes localmente, con progreso y cancelación. El almacenamiento disponible depende del navegador y dispositivo; puede fallar por espacio insuficiente.
- Para evitar afirmar seguridad no demostrada, las 112 secuencias adicionales se presentan como **biblioteca visual exploratoria**, no como 112 ejercicios clínicamente evaluados ni como prescripción personalizada. El paquete original marca las 112 con `clinical_review: pending`.
- El paquete de origen omite el número 063 de forma **intencional** por una secuencia excluida; contiene 112 animaciones aunque el último número sea 113. Ningún GIF existente ha sido excluido.
- `assets/fullbody/catalog.json` incluye rutas relativas a la raíz del sitio. `fullbody.js` es una versión compacta para la interfaz sin petición AJAX; no es una segunda copia binaria de los GIF.
- Se conservaron las 4 rutinas, los 11 ejercicios guiados, las preferencias, registros y exportación. Las cinco animaciones de suelo reemplazan las ilustraciones homólogas anteriores en rutinas. No se reemplazan otros medios si la secuencia disponible no representa exactamente el mismo movimiento.
- No se redistribuyeron los originales `sheets/`, `jobs.json`, `generation.json`, `plan.json` ni el ensamblador; esos materiales de edición del paquete fuente no son necesarios para utilizar o alojar la PWA y el ZIP original queda intacto.

### Derechos y atribución del material suministrado

El paquete de animaciones declara origen ilustrativo propio y licencia MIT (`pausa-fullbody/LICENSE`); Pausa conserva esta información en `assets/fullbody/LICENSE-MEDIA.txt`. Verifica que los permisos de los autores y colaboradores sean correctos antes de distribución pública. Las animaciones no tienen revisión médica, aunque sean originales y técnicamente reproducibles.

## Histórico v1.4 (sustituido por el contrato actual): guía contextual con IA local opcional

Abre **Mi guía** y describe cómo te sientes tras trabajar sentado. Pausa propone cuatro ejercicios usando exclusivamente los GIF de la biblioteca original. La clasificación local se utiliza automáticamente solo cuando aporta valor y nunca bloquea la creación de una pausa. No hay una casilla para elegir modelos. Si no está disponible, se aplican reglas locales. La selección de movimientos siempre pasa por reglas de seguridad independientes del modelo; el modelo externo no se incorpora al ZIP.

Más información técnica, limitaciones y precauciones: [AI-LOCAL.md](AI-LOCAL.md).

## Histórico del ajuste v1.4 (sustituido) — molestia 6–7/10 y descargo responsable

La guía puede **mostrar tres movimientos opcionales de muy baja exigencia** al introducir 6 o 7/10, **solo** si el cuestionario no indica señales de riesgo adicionales. Se exige confirmación explícita antes de comenzar. No se recomienda trabajo lumbar de suelo ni fortalecimiento en ese nivel; no se promete beneficio clínico. La aplicación aconseja consulta médica. Para 8–10/10, síntomas con irradiación u otras alertas, la guía automatizada continúa restringida; las señales de alarma urgentes se bloquean. La evaluación médica es prioritaria ante dolor importante o persistente.

**Un aviso y una casilla de conformidad no eliminan la responsabilidad legal ni convierten a Pausa en un producto clínicamente validado.** Antes de promocionarla como ayuda para dolor o tratamiento, hace falta revisión médica/rehabilitadora del contenido y asesoría legal sobre el mercado de distribución.
