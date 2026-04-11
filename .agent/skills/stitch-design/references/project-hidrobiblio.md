# HidroBiblio Project Design Reference

This document contains the specific design tokens, visual atmosphere, and hydrocarbon-themed context for the **HidroBiblio** project.

## Core Visual Identity: "Modern Academic" 
A sophisticated blend of classic library elegance (authority, knowledge) and modern SaaS cleanliness (efficiency, clarity).

### Color Palette (Mandatory)
| Role | Hex Code | Description |
|:---|:---|:---|
| **Primary Accent / Headers** | `#561C24` | Deep Wine (Vino profundo). Used for primary CTAs and brand identity. |
| **Secondary Accent** | `#6D2932` | Darker Wine. Used for hover states and emphasis. |
| **Borders / Separators** | `#C7B7A3` | Sand (Arena). Used for subtle grouping and card borders. |
| **Page Background** | `#E8D8C4` | Cream (Crema). Reduces eye strain and adds a "paper-like" academic feel. |

### Typography
- **Headings (H1-H4)**: `Playfair Display` (Serif). High-contrast, elegant, authoritative.
- **Body Text / UI Elements**: `Inter` or `Montserrat` (Sans-Serif). Geometric, highly legible on all devices.

### Hydrocarbon Theme Elements
Incorporate these visual metaphors where appropriate:
- **Refinement**: Clean lines and polished surfaces.
- **Structure**: Technical grids and clear hierarchy.
- **Organic Tech**: Fluid micro-interactions that feel "viscous" or smooth, like oil movement on hover.

## HidroBiblio Specific UI Components
- **Library Cards**: `v-card` with `border-radius: 16px`, subtle elevation, and `#C7B7A3` borders.
- **Academic Sidebar**: Asymmetric layout (25% profile/gamification).
- **Gamified Progress**: Visual indicators for reading progress.
- **Floating Academic Tools**: FABs for highlighters and sticky notes.

## Prompt Enhancement for HidroBiblio
When generating or editing screens for HidroBiblio, always append these project-specific constraints to the prompt:
- **Vibe**: "Modern Academic, sophisticated, technical but welcoming."
- **Theme**: "Hydrocarbon digital library."
- **Layout**: "Mobile-first, asymmetric desktop layout."
