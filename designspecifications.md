Rol: Actúa como un Lead UX/UI Designer especializado en plataformas EdTech (Tecnología Educativa) de alto impacto.
Concepto Visual:
Diseña una interfaz para "HidroBiblio", una biblioteca digital de hidrocarburos. El estilo debe ser "Modern Academic": una mezcla entre la elegancia de una biblioteca clásica y la limpieza de una aplicación SaaS moderna.
1. Sistema de Diseño y Estética:
Paleta de Colores (Estricta): Utiliza una armonía cromática basada en:
#561C24 y #6D2932 (Vinos profundos) para elementos de énfasis, botones primarios y encabezados.
#C7B7A3 (Arena) para bordes, separadores y elementos secundarios.
#E8D8C4 (Crema) para fondos de página, reduciendo la fatiga visual en comparación con el blanco puro.
Tipografía:
Títulos en una fuente Serif elegante (ej. Playfair Display) para evocar autoridad y conocimiento académico.
Cuerpo de texto en una fuente Sans-Serif geométrica (ej. Inter o Montserrat) para máxima legibilidad en dispositivos móviles.
2. Experiencia de Usuario (UX) y Layout:
Arquitectura de Información:
Desktop: Layout de doble columna asimétrica. Columna izquierda (25%) para "Mi Perfil" (gamificado con barra de progreso y avatar). Columna derecha (75%) para el catálogo dinámico organizado en una cuadrícula (Grid) de tarjetas interactivas.
Mobile: Diseño Mobile-First. El perfil se convierte en un "Bottom Sheet" o un menú lateral (Drawer) accesible mediante un gesto. Las tarjetas del catálogo se apilan verticalmente con áreas de toque amplias (mínimo 44px).
Micro-interacciones: Implementa efectos de hover suaves en las tarjetas de los años (1ro a 5to "U") que eleven ligeramente la tarjeta (shadow-depth) y cambien el color del borde.
3. Gamificación y Funcionalidad Educativa:
Panel de Usuario: Diseña un widget de "Progreso de Lectura" visualmente atractivo.
Visualizador de Recursos: La interfaz de lectura debe ser limpia. Incluye una barra de herramientas flotante (Floating Action Button - FAB) que permita:
Highlighter tool: (Subrayado en color ámbar).
Sticky Notes: (Post-its digitales en el margen).
Quick Download: Icono minimalista de descarga.
4. Elementos de UI específicos (Vuetify):
Usa v-card con bordes redondeados (border-radius: 16px) y elevación baja para un look moderno.
Usa v-expansion-panels para los tipos de recursos (Texto, Imagen, Video, Documentos) dentro de cada año, con iconos minimalistas de Material Design.
Instrucción Final:
"Crea una interfaz que se sienta profesional y técnica, pero acogedora para un estudiante. La transición entre el registro y el catálogo debe ser fluida, eliminando cualquier fricción cognitiva. Asegúrate de que el contraste sea accesible (WCAG AA)."
