---
name: creador-de-habilidades
description: Capacidad para crear y organizar nuevas habilidades (skills) en español dentro del workspace, siguiendo la estructura oficial.
---

# Creador de Habilidades

Esta habilidad te permite sistematizar la creación de nuevas capacidades para el asistente. Úsala para estructurar, documentar y desplegar nuevas habilidades en el sistema.

## Estructura Requerida

Cualquier habilidad creada debe seguir este esquema:

1.  **Directorio**: `.agent/skills/<nombre-habilidad>/`
2.  **Archivo Principal**: `SKILL.md` (debe contener el frontmatter YAML).
3.  **Directorios de Apoyo** (según sea necesario):
    - `scripts/`: Scripts que extienden tus capacidades.
    - `examples/`: Referencias de implementación.
    - `resources/`: Archivos adicionales o plantillas.

## Guía de Creación en Español

Al crear habilidades en español, sigue estas reglas:

- **Nomenclatura**: El `name` en el YAML debe ser en minúsculas y usar guiones (ej. `gestion-de-datos`).
- **Descripción**: Debe ser concisa y explicar claramente el "qué" y el "para qué".
- **Contenido**:
    - Usa un lenguaje técnico preciso pero accesible.
    - Incluye una sección de **Capacidades** (qué puede hacer la habilidad).
    - Incluye una sección de **Instrucciones** (cómo debe comportarse el asistente cuando la habilidad está activa).
    - Proporciona **Patrones** (buenas prácticas) y **Anti-patrones** (qué evitar).

## Flujo de Trabajo

1.  **Definición**: Entender la necesidad del usuario para la nueva capacidad.
2.  **Diseño**: Esbozar las instrucciones y herramientas que la habilidad proporcionará.
3.  **Implementación**: Crear la carpeta y el archivo `SKILL.md`.
4.  **Validación**: Comprobar que la estructura es correcta y el contenido es coherente.

## Ejemplo de Frontmatter

```yaml
---
name: nombre-de-la-habilidad
description: Breve descripción de la habilidad en español.
---
```

# [Título de la Habilidad]

[Instrucciones detalladas aquí...]
