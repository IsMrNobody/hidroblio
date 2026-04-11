<template>
  <div class="glosario-page">
    <!-- Header de Sección -->
    <header class="mb-10 text-center text-md-left">
      <div class="d-flex align-center mb-2 justify-center justify-md-start">
        <v-icon color="primary" size="32" class="mr-3">mdi-book-alphabet</v-icon>
        <h1 class="text-h3 font-weight-bold text-primary font-display">Glosario Petrolero</h1>
      </div>
      <p class="text-body-1 text-secondary opacity-80 max-width-600">
        Diccionario técnico especializado en la industria de los hidrocarburos, desde la exploración hasta la refinación.
      </p>
    </header>

    <!-- Barra de Búsqueda y Filtros -->
    <section class="search-section mb-12">
      <v-row align="center">
        <v-col cols="12" md="7">
          <v-text-field
            v-model="searchQuery"
            prepend-inner-icon="mdi-magnify"
            label="Buscar término técnico..."
            variant="solo"
            flat
            density="comfortable"
            class="search-input rounded-xl"
            bg-color="white"
            hide-details
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <div class="d-flex flex-wrap gap-2 justify-center justify-md-end">
            <v-chip
              v-for="cat in categorias"
              :key="cat"
              :color="selectedCategory === cat ? 'primary' : 'secondary'"
              :variant="selectedCategory === cat ? 'flat' : 'outlined'"
              @click="selectedCategory = cat"
              size="small"
              class="font-weight-bold px-4"
              style="transition: all 0.3s ease"
            >
              {{ cat }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
    </section>

    <!-- Grid de Términos -->
    <v-row v-if="filteredTerminos.length > 0">
      <v-col 
        v-for="(termino, index) in filteredTerminos" 
        :key="termino.id" 
        cols="12" 
        sm="6" 
        lg="4"
        class="d-flex"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            class="termino-card rounded-xl pa-6 border-accent w-100 flex-column d-flex elevation-0"
            :class="{ 'elevation-4 border-primary': isHovering }"
            style="transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer;"
          >
            <div class="d-flex justify-space-between align-start mb-4">
              <v-chip size="x-small" color="accent" variant="tonal" class="text-uppercase font-weight-black">
                {{ termino.categoria }}
              </v-chip>
            <!--  <v-icon color="secondary" size="20" class="opacity-30">mdi-bookmark-outline</v-icon>-->
            </div>
            
            <h3 class="text-h6 font-weight-bold text-primary mb-3 font-display">
              {{ termino.palabra }}
            </h3>
            
            <p class="text-body-2 text-secondary mb-4 line-height-relaxed flex-grow-1">
              {{ termino.definicion }}
            </p>

            <v-divider class="mb-4 opacity-10"></v-divider>
            
            <div class="d-flex align-center text-caption font-weight-bold text-secondary opacity-60">
              <v-icon size="14" class="mr-1">mdi-clock-outline</v-icon>
              Actualizado: {{ termino.fecha }}
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <v-icon size="64" color="secondary" class="opacity-20 mb-4">mdi-book-search-outline</v-icon>
      <h3 class="text-h5 text-secondary opacity-50">No se encontraron términos similares</h3>
      <v-btn variant="text" color="primary" class="mt-4" @click="resetFilters">Ver todos los términos</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGlossaryStore } from '~/stores/glossary'

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

const store = useGlossaryStore()

onMounted(() => {
  store.cargarTerminos()
})
const searchQuery = ref('')
const selectedCategory = ref('Todos')

const categorias = ['Todos', 'Upstream', 'Midstream', 'Downstream', 'Geología', 'Equipos', 'General']

const filteredTerminos = computed(() => {
  return store.terminos.filter(t => {
    const matchesSearch = t.palabra.toLowerCase().includes(searchQuery.value?.toLowerCase() || '') ||
                         t.definicion.toLowerCase().includes(searchQuery.value?.toLowerCase() || '')
    const matchesCategory = selectedCategory.value === 'Todos' || t.categoria === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'Todos'
}
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}

.max-width-600 {
  max-width: 600px;
}

.border-accent {
  border: 1px solid rgba(199, 183, 163, 0.4) !important;
}

.border-primary {
  border: 1px solid var(--v-theme-primary) !important;
}

.line-height-relaxed {
  line-height: 1.6;
}

.search-input {
  box-shadow: 0 4px 20px rgba(0,0,0,0.05) !important;
}

.termino-card {
  background-color: #ffffff;
}

.gap-2 {
  gap: 8px;
}
</style>
