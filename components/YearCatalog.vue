<!-- components/YearCatalog.vue -->
<template>
  <v-container fluid class="px-0 py-0">
    <h1 :class="['font-weight-black text-primary mb-2 font-display', mobile ? 'text-h5' : 'text-h3']">Bienvenido, {{ store.profile.name }}</h1>
    <p :class="['text-secondary mb-8 font-weight-light', mobile ? 'text-body-2' : 'text-subtitle-1']">
      Explora la colección de conocimientos sobre hidrocarburos seleccionada para tu nivel.
    </p>

    <v-row>
      <v-col
        v-for="year in years"
        :key="year.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            @click="selectYear(year.id)"
            class="year-card transition-swing w-100 d-flex flex-column"
            :class="{ 'on-hover': isHovering }"
            :elevation="isHovering ? 6 : 1"
            color="surface"
            border="accent"
          >
            <!-- Badge de Nivel -->
            <div class="position-absolute top-0 right-0 ma-2 z-1">
              <v-chip size="small" :color="year.color" variant="flat" label class="font-weight-bold">
                {{ year.badge }}
              </v-chip>
            </div>

            <!-- Icono Central -->
            <div class="d-flex justify-center align-center flex-grow-1 py-8" :style="{ backgroundColor: year.bgLight }">
              <v-icon size="64" :color="year.color" class="opacity-80">{{ year.icon }}</v-icon>
            </div>

            <!-- Contenido Texto -->
            <v-card-text class="flex-grow-0 pt-4 pb-2">
              <div class="text-overline text-uppercase text-medium-emphasis mb-1">{{ year.subtitle }}</div>
              <h3 class="text-h5 font-weight-bold text-primary mb-1">{{ year.title }}</h3>
              <p class="text-body-2 text-secondary text-truncate-2">
                {{ year.description }}
              </p>
            </v-card-text>

            <!-- Footer: Meta info -->
            <v-card-actions class="px-4 pb-4 pt-0">
              <v-icon size="small" color="accent" class="mr-1">mdi-book-multiple-outline</v-icon>
              <span class="text-caption text-secondary">{{ year.resourceCount }} Recursos</span>
              <v-spacer></v-spacer>
              <v-btn
                variant="text"
                color="secondary"
                size="small"
                append-icon="mdi-arrow-right"
              >
                Explorar
              </v-btn>
            </v-card-actions>
            
            <!-- Barra de progreso simulada abajo (gamificación sutil) -->
            <v-progress-linear
              :model-value="year.progress"
              :color="year.color"
              height="4"
              absolute
              bottom
            ></v-progress-linear>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useStudentStore } from '@/stores/student'
const { mobile } = useDisplay()
const store = useStudentStore()

const years = [
  { id: 1, title: '1er Año', subtitle: 'Fundamentos', description: 'Introducción a la geología y origen del petróleo.', icon: 'mdi-earth', color: 'primary', bgLight: '#fcebef', badge: 'Básico', resourceCount: 12, progress: 30 },
  { id: 2, title: '2do Año', subtitle: 'Exploración', description: 'Técnicas sísmicas y métodos de prospección.', icon: 'mdi-compass-outline', color: 'secondary', bgLight: '#f5ebe0', badge: 'Intermedio', resourceCount: 18, progress: 0 },
  { id: 3, title: '3er Año', subtitle: 'Perforación', description: 'Ingeniería de pozos y sistemas de extracción.', icon: 'mdi-oil-well', color: 'brown', bgLight: '#efebe9', badge: 'Avanzado', resourceCount: 24, progress: 0 },
  { id: 4, title: '4to Año', subtitle: 'Producción', description: 'Procesamiento, transporte y almacenamiento.', icon: 'mdi-factory', color: 'orange-darken-4', bgLight: '#fff3e0', badge: 'Experto', resourceCount: 15, progress: 0 },
  { id: 5, title: '5to Año', subtitle: 'Refinación', description: 'Petroquímica y derivados finales.', icon: 'mdi-flask-outline', color: 'teal-darken-3', bgLight: '#e0f2f1', badge: 'Master', resourceCount: 20, progress: 0 },
]

const selectYear = (id: number) => {
  // Lógica de navegación pendiente
  store.addNotification(`Seleccionaste el año ${id}`)
}
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}

.year-card {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  cursor: pointer;
  border: 1px solid rgba(var(--v-theme-accent), 0.3);
}

.year-card.on-hover {
  transform: translateY(-8px);
  border-color: rgb(var(--v-theme-primary));
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
