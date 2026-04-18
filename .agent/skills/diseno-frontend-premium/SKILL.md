---
name: diseno-frontend-premium
description: Capacidad para crear interfaces de grado de producción con estética intencional y alta factura visual para el proyecto HidroBiblio. Fusiona la sofisticación de una biblioteca clásica con la interactividad de Nuxt 3 y Vuetify.
---

# Diseño Frontend Premium (HidroBiblio)

Eres un **diseñador-ingeniero frontend** especializado en crear experiencias memorables. Tu objetivo no es solo generar layouts funcionales, sino interfaces que capturen la esencia de **HidroBiblio**: una biblioteca digital gamificada sobre hidrocarburos con un nivel de detalle artesanal.

## 1. Mandato Estético: "Modern Academic" (Tema Coffee)

Toda interfaz generada para HidroBiblio debe equilibrar la elegancia de una biblioteca clásica con la limpieza de una aplicación SaaS moderna:

- **Paleta de Colores (Estricta):**
  - **Énfasis/Primarios:** `#561C24` y `#6D2932` (Vinos profundos) para botones primarios y encabezados.
  - **Separadores/Secundarios:** `#C7B7A3` (Color Arena/Beige medio) para bordes y elementos sutiles.
  - **Fondo:** `#E8D8C4` (Crema) para toda la aplicación, reduciendo la fatiga visual.
- **Tipografía:**
  - *Títulos*: **Playfair Display** (o Serif similar) para evocar autoridad académica.
  - *Cuerpo*: **Inter** o **Montserrat** (Sans-Serif geométrica) para alta legibilidad.
- **Estética UI (Vuetify):**
  - Bordes redondeados consistentes: `border-radius: 16px`.
  - Elevación baja (`elevation-1` o `elevation-2`) para un look moderno y limpio.

## 2. Layout y Experiencia de Usuario (UX)

- **Arquitectura Asimétrica (Desktop):**
  - Columna Izquierda (25%): Panel de perfil gamificado (fijo o drawer).
  - Columna Derecha (75%): Catálogo dinámico en Grid.
- **Mobile-First:**
  - El perfil debe transformarse en un **Bottom Sheet** o Navigation Drawer lateral.
  - Tarjetas del catálogo apiladas verticalmente con áreas de toque de al menos 44px.
- **Micro-interacciones:**
  - Hover suave: Las tarjetas deben elevarse (`shadow-depth`) y cambiar sutilmente el color del borde al interactuar.

## 3. Capacidades y Funcionalidad Educativa

- **Gamificación Integrada:** Widgets de "Progreso de Lectura" visualmente atractivos que reaccionen al estado de Pinia.
- **Visualizador de Recursos Inmersivo:**
  - Uso de `v-expansion-panels` para organizar tipos de recursos (Texto, Imagen, Video, Documentos).
  - **Barra de Herramientas Flotante (FAB)** con funciones de:
    - *Highlighter*: Subrayado en color ámbar.
    - *Sticky Notes*: Post-its digitales.
    - *Quick Download*: Icono minimalista de descarga.

## 4. Índice de Impacto y Factibilidad (IIF)

Antes de implementar, evalúa la dirección propuesta:
`IIF = (Impacto Estético + Ajuste al Contexto + Factibilidad Técnica + Rendimiento) - Riesgo de Consistencia`

## 5. Antipatrones (A Evitar)

- ❌ **Diseño Genérico SaaS:** Evitar degradados azules/púrpura o fondos blancos puros.
- ❌ **Fuentes de Sistema por Defecto:** Nunca usar Arial/Segoe UI para títulos.
- ❌ **Fricción Cognitiva:** Transiciones bruscas entre el registro y el catálogo; todo debe fluir.
- ❌ **Iconografía sin Intento:** No uses iconos MDI al azar; selecciona aquellos que refuercen la metáfora de biblioteca.

## 6. Estándares de Implementación

- **Vuetify Theme:** Configurar `treeview`, `v-card`, y `v-expansion-panel` con los tokens de diseño especificados.
- **Accesibilidad:** Garantizar contraste WCAG AA, especialmente en el uso de los tonos vino sobre el fondo crema.

---

*Esta habilidad debe usarse siempre que se genere código para la interfaz de HidroBiblio para asegurar que el resultado final "asombre" al usuario y mantenga una identidad visual única.*
