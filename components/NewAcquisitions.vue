<!-- components/NewAcquisitions.vue -->
<template>
  <v-container fluid class="bg-accent-light py-16">
    <v-container class="px-md-12">
      <div :class="['d-flex align-center justify-space-between mb-12', mobile ? 'flex-column align-start gap-3' : '']">
        <div>
          <h2 class="text-h4 font-weight-bold text-primary font-display mb-2">Nuevas Adquisiciones</h2>
          <p class="text-secondary text-subtitle-2 italic">Recientemente añadidos al repositorio digital</p>
        </div>
        <div class="d-flex gap-2">
          <v-btn icon="mdi-arrow-left" variant="outlined" color="primary" class="rounded-pill" size="small"></v-btn>
          <v-btn icon="mdi-arrow-right" variant="flat" color="primary" class="rounded-pill" size="small"></v-btn>
        </div>
      </div>

      <v-row>
        <v-col v-for="(item, i) in books" :key="i" cols="12" sm="6" md="3">
          <v-card class="book-card rounded-lg pa-4 elevation-1 d-flex flex-column" color="white">
            <v-img :src="item.image" height="240" cover class="rounded mb-4 position-relative">
              <v-chip v-if="item.new" size="x-small" color="primary" class="position-absolute top-0 right-0 ma-2 font-weight-bold" rounded="sm">NEW</v-chip>
            </v-img>
            
            <h4 class="text-subtitle-1 font-weight-bold text-primary mb-1 line-clamp-2 leading-tight">{{ item.title }}</h4>
            <p class="text-caption text-secondary font-weight-medium mb-4">Por {{ item.author }}</p>
            
            <div class="mt-auto d-flex align-center justify-space-between pt-2">
              <span class="text-overline text-accent font-weight-black">ARCHIVO #{{ item.id }}</span>
              <v-btn icon="mdi-bookmark-outline" variant="text" size="x-small" color="primary"></v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()

const books = [
  {
    title: 'Dinámica de Fluidos en Tuberías',
    author: 'Dra. Elena Vance',
    id: '8493',
    new: true,
    image: '/images/book_1.png'
  },
  {
    title: 'Geoquímica de Hidrocarburos',
    author: 'Marcus Thorne',
    id: '7285',
    image: '/images/book_1.png' // Compartido para demo
  },
  {
    title: 'Estructuras Marinas',
    author: 'Sarah J. Cohen',
    id: '9653',
    image: '/images/book_1.png'
  },
  {
    title: 'Simulación de Yacimientos',
    author: 'Informe Técnico 2023',
    id: '4491',
    image: '/images/book_1.png'
  }
]
</script>

<style scoped>
.bg-accent-light {
  background-color: rgba(199, 183, 163, 0.15) !important;
}

.book-card {
  transition: transform 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(var(--v-theme-accent), 0.2);
}

.book-card:hover {
  transform: translateY(-5px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.leading-tight {
  line-height: 1.25 !important;
}

.gap-2 {
  gap: 8px;
}
</style>
