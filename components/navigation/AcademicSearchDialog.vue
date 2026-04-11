<!-- components/navigation/AcademicSearchDialog.vue -->
<template>
  <v-dialog 
    v-model="internalValue" 
    max-width="700"
    scrollable
    transition="fade-transition"
    class="academic-search-dialog"
  >
    <v-card class="rounded-xl overflow-hidden shadow-2xl bg-cream">
      <v-card-title class="pa-0">
        <v-text-field
          v-model="searchQuery"
          placeholder="Buscar en el archivo académico..."
          variant="solo"
          flat
          hide-details
          prepend-inner-icon="mdi-magnify"
          class="search-input"
          autofocus
          @keyup.enter="performSearch"
        >
          <template #append-inner>
            <v-btn icon="mdi-close" variant="text" size="small" @click="internalValue = false"></v-btn>
          </template>
        </v-text-field>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pa-4 pa-md-6" style="height: 450px;">
        <!-- Seccion de resultados -->
        <div v-if="results.length > 0" class="results-list">
          <div class="text-caption font-weight-bold text-secondary mb-4 opacity-60 letter-spacing-1">
            RESULTADOS ENCONTRADOS ({{ results.length }})
          </div>
          
          <v-hover v-for="item in results" :key="item.id">
            <template v-slot:default="{ isHovering, props }">
              <v-card
                v-bind="props"
                class="mb-4 rounded-lg result-item transition-all"
                :class="isHovering ? 'elevation-4 bg-white' : 'elevation-0 bg-transparent'"
                @click="goToArticle(item.id)"
              >
                <div class="d-flex pa-3">
                  <v-avatar size="60" rounded="lg" class="mr-4">
                    <v-img :src="item.fotoUrl || '/images/hero.png'" cover></v-img>
                  </v-avatar>
                  <div class="flex-grow-1">
                    <div class="d-flex align-center justify-space-between mb-1">
                      <span class="text-caption font-weight-black text-primary letter-spacing-1 uppercase">{{ item.anio }}</span>
                    </div>
                    <h4 class="text-subtitle-1 font-weight-bold text-secondary leading-tight mb-1">{{ item.titulo }}</h4>
                    <p class="text-caption text-secondary opacity-70 line-clamp-2">
                      {{ item.contenido }}
                    </p>
                  </div>
                  <v-icon size="20" class="mt-1 opacity-40">mdi-arrow-right</v-icon>
                </div>
              </v-card>
            </template>
          </v-hover>
        </div>

        <!-- Estado vacío o inicial -->
        <div v-else-if="searchQuery" class="d-flex flex-column align-center justify-center fill-height py-12 opacity-60">
          <v-icon size="64" color="secondary" class="mb-4">mdi-book-search-outline</v-icon>
          <p class="text-h6 font-display">No encontramos coincidencias</p>
          <p class="text-body-2">Intenta con otros términos académicos</p>
        </div>

        <div v-else class="d-flex flex-column align-center justify-center fill-height py-12 opacity-40">
          <v-icon size="64" color="secondary" class="mb-4">mdi-library-outline</v-icon>
          <p class="text-h6 font-display">Biblio-Busca</p>
          <p class="text-body-2 text-center px-8">Escribe el título, contenido o palabras clave del artículo que buscas</p>
        </div>
      </v-card-text>

      <v-divider></v-divider>
      
      <v-card-actions class="bg-primary px-6 py-3">
        <span class="text-caption text-white opacity-60 italic">HidroBiblio Archival Search System v1.0</span>
        <v-spacer></v-spacer>
        <span class="text-caption text-white font-weight-bold letter-spacing-1">ESC para cerrar</span>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useArticulosStore } from '~/stores/articles'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])
const router = useRouter()
const store = useArticulosStore()

const searchQuery = ref('')
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const results = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return []
  
  const query = searchQuery.value.toLowerCase()
  return store.articulos.filter(articulo => {
    return (
      articulo.titulo.toLowerCase().includes(query) ||
      articulo.contenido.toLowerCase().includes(query) ||
      articulo.anio.toLowerCase().includes(query)
    )
  }).slice(0, 8) // Limit results for performance and UI
})

const goToArticle = (id?: string) => {
  if (!id) return
  internalValue.value = false
  router.push(`/articulos/${id}`)
}

const performSearch = () => {
  // Aceptamos la búsqueda o simplemente cerramos el teclado en móvil
  if (results.value.length > 0) {
    // Podríamos ir al primer resultado si quisiéramos
  }
}

// Reset search when dialog opens
watch(internalValue, async (val) => {
  if (val) {
    searchQuery.value = ''
    console.log('Academic Search Dialog opened')
  }
})
</script>

<style scoped>
.bg-cream {
  background-color: #F8F1E7 !important;
}

.search-input :deep(.v-field) {
  border-radius: 0 !important;
  background-color: white !important;
  padding: 12px 16px !important;
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
}

.font-display {
  font-family: 'Playfair Display', serif;
}

.letter-spacing-1 {
  letter-spacing: 1px !important;
}

.uppercase {
  text-transform: uppercase;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.result-item {
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.05);
}

.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.leading-tight {
  line-height: 1.25 !important;
}
</style>
