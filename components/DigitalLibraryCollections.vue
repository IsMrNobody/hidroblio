<!-- components/DigitalLibraryCollections.vue -->
<template>
  <div>
    <div :class="['d-flex align-center justify-space-between mb-8', mobile ? 'flex-column align-start gap-3' : '']">
      <div class="d-flex align-center">
        <v-icon color="primary" class="mr-3">mdi-folder-multiple-outline</v-icon>
        <h2 class="text-h5 font-weight-bold text-primary font-display">Mis Colecciones</h2>
      </div>
      <v-btn variant="flat" color="accent" size="small" rounded="lg" class="px-4 font-weight-black text-caption" prepend-icon="mdi-plus">
        NUEVA CARPETA
      </v-btn>
    </div>

    <v-row>
      <v-col v-for="(collection, i) in collections" :key="i" cols="12" md="4">
        <v-card class="collection-mini-card pa-4 rounded-xl elevation-0" color="rgba(255,255,255,0.4)" border="accent">
          <div class="d-flex align-center">
            <v-avatar rounded="lg" size="64" :color="collection.color" class="mr-6 elevation-1">
              <v-icon color="white" size="32">{{ collection.icon }}</v-icon>
            </v-avatar>
            
            <div class="flex-grow-1 overflow-hidden">
              <h4 class="text-h6 font-weight-bold text-primary mb-1 text-truncate">{{ collection.title }}</h4>
              <p class="text-caption text-secondary font-weight-medium mb-2 italic">
                {{ collection.count }} documentos • Última lectura {{ collection.lastRead }}
              </p>
              
              <div class="d-flex gap-2">
                <v-btn icon="mdi-share-variant-outline" variant="text" size="x-small" color="secondary"></v-btn>
                <v-btn icon="mdi-download-outline" variant="text" size="x-small" color="secondary"></v-btn>
                <v-btn v-if="collection.locked" icon="mdi-lock-outline" variant="text" size="x-small" color="secondary"></v-btn>
                <v-btn v-else icon="mdi-pencil-outline" variant="text" size="x-small" color="secondary"></v-btn>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()

const collections = [
  { 
    title: 'Preparación Campo Geológico', 
    count: 14, 
    lastRead: 'hace 2h', 
    icon: 'mdi-image-outline', 
    color: 'secondary',
    locked: false
  },
  { 
    title: 'Informes Lab Sem. II', 
    count: 8, 
    lastRead: 'Ayer', 
    icon: 'mdi-microscope', 
    color: 'accent',
    locked: true
  },
  { 
    title: 'Recursos para Tesis', 
    count: 32, 
    lastRead: 'Compartido (4)', 
    icon: 'mdi-account-group-outline', 
    color: 'primary',
    locked: false
  }
]
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}

.collection-mini-card {
  border: 1px solid rgba(var(--v-theme-accent), 0.3) !important;
  transition: all 0.3s ease;
}

.collection-mini-card:hover {
  background-color: rgba(255, 255, 255, 0.8) !important;
  transform: scale(1.02);
}

.gap-2 {
  gap: 8px;
}

.italic {
  font-style: italic;
}
</style>
