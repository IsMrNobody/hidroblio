<!-- components/DigitalLibraryRecentlyAdded.vue -->
<template>
  <div class="mb-16">
    <div :class="['d-flex align-center justify-space-between mb-8 border-b-accent pb-2', mobile ? 'flex-column align-start gap-3' : '']">
      <div class="d-flex align-center">
        <v-icon color="primary" class="mr-3">mdi-book-open-page-variant-outline</v-icon>
        <h2 class="text-h5 font-weight-bold text-primary font-display">Añadidos Recientemente</h2>
      </div>
      <v-btn variant="text" color="primary" class="text-caption font-weight-black letter-spacing-1">
        VER TODO EL ARCHIVO
      </v-btn>
    </div>

    <v-row class="horizontal-scroll-row">
      <v-col v-for="(book, i) in recentBooks" :key="i" cols="12" sm="6" md="4" lg="3">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            class="book-dashboard-card rounded-xl overflow-hidden elevation-0"
            :class="{ 'card-hover': isHovering }"
          >
            <v-img :src="book.image" height="340" cover class="align-end">
              <div class="card-gradient"></div>
              <div class="pa-6 position-relative z-1">
                <span class="text-overline font-weight-black text-accent-light d-block mb-1">{{ book.type }}</span>
                <h3 class="text-h6 font-weight-bold text-white leading-tight">{{ book.title }}</h3>
              </div>
            </v-img>
            
            <div class="pa-4 d-flex align-center justify-space-between">
              <span class="text-caption font-weight-black text-secondary opacity-60 uppercase">{{ book.module }}</span>
              <v-chip v-if="book.isNew" color="success" size="x-small" label class="font-weight-black">NEW</v-chip>
              <span v-else class="text-caption font-weight-black text-secondary opacity-60 uppercase">{{ book.dept }}</span>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()

const recentBooks = [
  { 
    title: 'Técnicas Avanzadas de Perforación', 
    type: 'LIBRO DE TEXTO', 
    module: 'MÓDULO 4.2', 
    isNew: true, 
    image: '/images/featured_1.png' 
  },
  { 
    title: 'Guía de Mapeo Subsuperficial', 
    type: 'DOCUMENTO BLANCO', 
    module: 'DEPTO. GEOLOGÍA', 
    isNew: false, 
    dept: 'DEPTO. GEOLOGÍA',
    image: '/images/featured_2.png' 
  },
  { 
    title: 'Procedimientos Operativos Estándar de Mantenimiento de Plataformas', 
    type: 'MANUAL TÉCNICO', 
    module: 'MANUAL TÉCNICO', 
    isNew: false, 
    dept: 'MANTENIMIENTO',
    image: '/images/featured_3.png' 
  },
  { 
    title: 'Simulación de Yacimientos 2024', 
    type: 'ARCHIVO', 
    module: 'MÓDULO 5.1', 
    isNew: false, 
    dept: 'INGENIERÍA',
    image: '/images/hero.png' 
  }
]
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}

.border-b-accent {
  border-bottom: 1px solid rgba(var(--v-theme-accent), 0.3);
}

.book-dashboard-card {
  border: 1px solid rgba(var(--v-theme-accent), 0.2);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: transparent !important;
}

.card-hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(86, 28, 36, 0.1) !important;
  border-color: rgb(var(--v-theme-primary));
}

.card-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(86, 28, 36, 0) 50%, rgba(86, 28, 36, 0.9) 100%);
}

.leading-tight {
  line-height: 1.2 !important;
}

.uppercase {
  text-transform: uppercase;
}

.text-accent-light {
  color: #C7B7A3;
}
</style>
