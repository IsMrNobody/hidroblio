---
name: arquitectura-hidrobiblio
description: Guía de arquitectura de software para HidroBiblio. Enfocada en calidad, mantenibilidad y principios de Clean Architecture/DDD adaptados a Nuxt 3 y Pinia.
---

# Arquitectura de Software (HidroBiblio)

Esta habilidad proporciona las directrices maestras para el desarrollo de software de alta calidad en el proyecto **HidroBiblio**. Se basa en los principios de **Clean Architecture** y **Domain Driven Design (DDD)**, adaptados al ecosistema moderno de Nuxt 3.

## 1. Estilo de Código y Estructura

### Principios Generales
- **Patrón Early Return**: Prioriza retornos tempranos para evitar anidamientos profundos y mejorar la legibilidad.
- **DRY (Don't Repeat Yourself)**: Fomenta la creación de componentes y composables reutilizables.
- **Regla de Descomposición**:
  - Funciones/Componentes > 80 líneas deben ser divididos.
  - Archivos > 200 líneas deben ser fragmentados en archivos múltiples.
- **Arrow Functions**: Preferencia por funciones de flecha para consistencia.

## 2. Estrategia "Library-First"

Antes de escribir código personalizado, **SIEMPRE** busca soluciones existentes:
1.  **Revisar Ecosistema Nuxt/Vue**: Priorizar módulos oficiales de Nuxt o librerías de Vuetify.
2.  **Evaluar Bibliotecas Externas**: Usar soluciones probadas (ej. `Zod` para validación, `date-fns` para fechas).
3.  **Código Custom solo si**:
    - Es lógica de negocio única del dominio de hidrocarburos.
    - El rendimiento es crítico y requiere un enfoque especial.
    - Una dependencia externa sería excesiva (overkill).

## 3. Arquitectura y Diseño (Nuxt 3 + Pinia)

### Excelencia Visual e Identidad
- **Sincronía con Diseño Premium**: Todo desarrollo de UI **DEBE** integrarse con la habilidad `diseno-frontend-premium`. La arquitectura debe facilitar la implementación de la estética "Coffee Editorial" (colores vino y beige) mediante el uso correcto de slots y props en componentes de Vuetify.
- **Componentes con Intento**: La jerarquía de componentes debe respetar el "Ancla de Diferenciación" definida en el diseño premium, evitando layouts genéricos.

### Principios DDD en el Frontend
- **Lenguaje Ubicuo**: Usa términos técnicos del dominio (ej. `RegistroEstudiante`, `CatalogoRecursos`, `ProgresoLectura`).
- **Nomenclatura Específica**:
    - ❌ **EVITAR**: `utils`, `helpers`, `common`, `shared`.
    - ✅ **USAR**: `CalculadoraImpuestos`, `AutenticadorInvestigador`, `GestorAnotaciones`.
- **Separación de Responsabilidades**:
    - **Lógica de Negocio**: Debe residir en Stores de Pinia o Composables de dominio.
    - **UI**: Los componentes de Vuetify deben ser "tontos" (presentacionales) en la medida de lo posible, dejando la lógica compleja a la capa de aplicación.
    - **Infraestructura**: Servicios de API y persistencia separados de la lógica de componentes.

### Estructura de Carpetas Recomendada
- `composables/domain/`: Lógica pura de negocio.
- `stores/`: Estado global segmentado por contextos limitados (Bounded Contexts).
- `components/base/`: Componentes atómicos de UI.
- `components/features/`: Componentes complejos que implementan casos de uso.

## 4. Antipatrones a Evitar

- ❌ **Síndrome NIH (Not Invented Here)**: No reinventar la rueda si ya existe un componente de Vuetify o un módulo de Nuxt.
- ❌ **Código Espagueti**: Mezclar peticiones a la API directamente en el `template` o en los métodos de los componentes.
- ❌ **Nombres Genéricos**: Evitar archivos como `utils.js` que terminan siendo vertederos de funciones huérfanas.
- ❌ **Anidamiento Profundo**: Máximo 3 niveles de anidamiento en lógica condicional.

## 5. Calidad y Mantenibilidad

- **Manejo de Errores**: Uso de bloques catch tipados y notificaciones visuales gamificadas para el usuario.
- **Composables Enfocados**: Cada composable debe tener un propósito único y claro.
- **Documentación Técnica**: Cada línea de código personalizado es una responsabilidad; debe ser clara, testeable y documentada.

---

*Utiliza esta habilidad para asegurar que HidroBiblio no solo se vea bien (Frontend Premium), sino que sea sólido, escalable y fácil de mantener a largo plazo.*
