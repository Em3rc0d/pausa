# Pausa ✳

Pausas de movilidad para quienes pasan horas frente a una pantalla. Puedes moverte sentado, permitir movimientos de pie o habilitar una superficie de suelo, según tu espacio y tus preferencias.

[**Abrir Pausa**](https://pausa-homeoffice.pages.dev/) · [Documentación MK1](mk1/README.md) · [Arquitectura](mk1/arch/ARCHITECTURE.md) · [Contrato de selección](app/SELECTION-SPEC.md)

## Qué incluye

- Aplicación web estática/PWA en español: Inicio, Mi guía, Rutinas, Ejercicios, Actividad y Ajustes.
- Recordatorios configurables mientras Pausa permanece abierta; reproductor con pausa, siguiente y salida.
- Cuatro rutinas existentes, catálogo inicial de 11 movimientos y biblioteca adicional de **112 GIF con sus 112 pósteres originales**.
- Guía con inferencia local: el Transformer decide primero la cantidad y después selecciona y ordena exactamente esos movimientos del catálogo.
- **Propuesta del modelo:** cantidad variable, sin una cuota universal de tres. **Pausa ágil:** hasta tres movimientos, indicado antes de generar y en el resultado.
- Posición, exclusiones, familias, cobertura y formato comprobados fuera del modelo. Puedes omitir movimientos y pedir otra combinación.
- Historial y preferencias locales. La descripción de la guía permanece en memoria de la pestaña; no se envía a un servicio de inferencia.

Pausa ofrece movilidad general. No diagnostica ni prescribe tratamiento. Sus ilustraciones y anotaciones están pendientes de revisión clínica; las comprobaciones de software no certifican idoneidad médica.

## Ejecutar y comprobar

Requiere Python 3 para servir archivos y Node.js con su ejecutor de pruebas incorporado; la importación se comprobó con Node 24 y Python 3.12. No requiere instalar paquetes npm, configurar una base de datos ni introducir claves.

```bash
git clone https://github.com/Em3rc0d/pausa.git
cd pausa
npm run check
npm start
```

Abre http://localhost:4173. Para instalación PWA usa HTTPS o localhost. El directorio de publicación es **`app/`**: no publiques la raíz documental como directorio web. Consulta [ejecución y despliegue](mk1/build/RUNBOOK.md).

La primera composición descarga aproximadamente **512 MB de pesos q8**, además de runtime/tokenizador. La caché, memoria y conectividad condicionan su disponibilidad. El modelo no está incluido en Git. Las rutinas existentes y la biblioteca tienen sus propios flujos sin inferencia. Los recordatorios no se garantizan con la aplicación cerrada.

## Organización por MKs

| Ruta | Contenido |
|---|---|
| [mk0/](mk0/README.md) | Problema, alternativas, viabilidad, decisiones y límites. Reconstrucción documental de la fase inicial; validación comercial pendiente. |
| [mk1/](mk1/README.md) | Contrato de la PWA v1.11.0, UX, arquitectura, plan, código y evidencia. |
| [app/](app/README.md) | Única copia ejecutable del código, medios, pruebas y documentación histórica del producto. |
| [quarries/](quarries/README.md) | Síntesis de fuentes, procedencia y qué conclusión permite cada fuente. |
| [mining-site/](mining-site/README.md) | Registro de investigación/extracción y límites de evidencia. |
| [scripts/](scripts/README.md) | Comprobación local de estructura, enlaces, importación e integridad. |

Cada MK conserva `brainstorming`, `design`, `arch`, `plan`, `build`, `test`, `quarries` y `mining-site`. Los índices enlazan contenido real y fuentes comunes. El código y los medios no se duplican por etapa.

## Estado verificable

Base importada: **v1.11.0**, publicada el 18-10-2026. La [evidencia histórica](app/VERIFICATION.md) describe 46 comprobaciones y pruebas reales en Chromium con inferencia WASM, incluidas selecciones de cuatro y cinco movimientos. La [verificación de importación](mk1/test/IMPORT-VERIFICATION.md) separa esa evidencia de lo reejecutado al crear este repositorio.

La siguiente etapa debe validar uso real, memoria/latencia en teléfonos, instalación/offline y revisión profesional del contenido antes de ampliar promesas. Android, publicación en tiendas y monetización son opciones del [backlog](mk1/brainstorming/BACKLOG.md), no funciones ya construidas ni negocio validado.

## Contribuir

Lee [CONTRIBUTING.md](CONTRIBUTING.md), [AGENTS.md](AGENTS.md) y [SECURITY.md](SECURITY.md). Las comprobaciones se ejecutan localmente; esta importación no añade GitHub Actions. Código y medios locales conservan las licencias declaradas del proyecto; consulta [LICENSE](LICENSE) y [procedencia y dependencias](THIRD_PARTY_NOTICES.md).

## MK2: preparación de lanzamiento 1.12.0

La rama de desarrollo incluye una rutina inmediata de **Pausa sentado** (145 s; alcance de brazos, talones, inclinación lateral del tronco), sin descarga de IA, y ventanas de horario laboral opcionales para los recordatorios. La guía avanzada sigue utilizando un modelo descargable de aproximadamente 512 MB. Los avisos **no están garantizados con Pausa cerrada**.

Consulta [MK2](mk2/README.md) y sus [gates de salida](mk2/plan/RELEASE-GATES.md). El sitio publicado continúa con v1.11.0 hasta un despliegue autorizado y verificado. **No hay cobros, suscripciones, Play Store ni validación clínica o comercial cerrados.**
