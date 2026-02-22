<!-- components/FeaturedCollections.vue -->
<template>
  <v-container class="py-16 px-md-12">
    <div :class="['d-flex align-center justify-space-between mb-12', mobile ? 'flex-column align-start gap-3' : '']">
      <div>
        <h2 class="text-h4 font-weight-bold text-primary font-display mb-2">Colecciones Destacadas</h2>
        <p class="text-secondary text-subtitle-2 italic">Recursos seleccionados por expertos docentes</p>
      </div>
      <v-btn variant="text" color="primary" class="text-caption font-weight-bold letter-spacing-1 border-b-primary pb-1 rounded-0 px-0">
        VER TODAS LAS COLECCIONES
      </v-btn>
    </div>

    <v-row>
      <v-col v-for="(item, i) in collections" :key="i" cols="12" md="4">
        <v-card height="500" class="collection-card rounded-xl overflow-hidden elevation-2 d-flex flex-column" border="accent">
          <v-img :src="item.image" cover class="align-end fill-height">
            <div class="card-overlay"></div>
            
            <div class="pa-8 position-relative z-1">
              <span class="text-caption font-weight-black text-accent letter-spacing-1 d-block mb-2">{{ item.tag }}</span>
              <h3 class="text-h4 font-weight-bold text-white font-display mb-4">{{ item.title }}</h3>
              <p class="text-body-2 text-white opacity-80 mb-6 font-weight-light line-clamp-2">
                {{ item.description }}
              </p>
              
              <div class="d-flex align-center gap-4">
                <div class="d-flex align-center">
                  <v-icon size="xs" color="white" class="mr-2">mdi-book-multiple</v-icon>
                  <span class="text-caption text-white font-weight-bold">{{ item.volumes }} VOLÚMENES</span>
                </div>
                <div class="d-flex align-center">
                  <v-icon size="xs" color="white" class="mr-2">mdi-eye</v-icon>
                  <span class="text-caption text-white font-weight-bold">{{ item.views }} VISTAS</span>
                </div>
              </div>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()

const collections = [
  {
    tag: 'INGENIERÍA',
    title: 'Operaciones de Perforación y Seguridad',
    description: 'Protocolos esenciales y manuales técnicos para entornos de perforación en alta mar.',
    volumes: '42',
    views: '1.2K',
    image: '/images/featured_1.png'
  },
  {
    tag: 'GEOLOGÍA',
    title: 'Mapeo Subsuperficial',
    description: 'Guías avanzadas de datos sísmicos e interpretación estructural para estudios de campo.',
    volumes: '18',
    views: '850',
    image: '/images/featured_2.png'
  },
  {
    tag: 'MEDIO AMBIENTE',
    title: 'Transición hacia la Energía Sostenible',
    description: 'Integración de la experiencia en hidrocarburos en la revolución de la energía verde.',
    volumes: '31',
    views: '2.4K',
    image: '/images/featured_3.png'
  }
]
</script>

<style scoped>
.collection-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  cursor: pointer;
}

.collection-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(86, 28, 36, 0.2) !important;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(86, 28, 36, 0) 40%, rgba(86, 28, 36, 0.95) 100%);
}

.italic {
  font-style: italic;
}

.border-b-primary {
  border-bottom: 2px solid rgb(var(--v-theme-primary));
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.gap-4 {
  gap: 16px;
}
</style>
