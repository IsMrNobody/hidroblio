<!-- pages/favoritos.vue -->
<template>
  <div class="favorites-page">
    <div class="mb-8">
      <h1 class="text-h3 font-weight-black text-primary font-display mb-2">Mis Guardados</h1>
      <p class="text-subtitle-1 text-secondary italic opacity-80">
        Tu colección personal de recursos y documentos académicos.
      </p>
    </div>

    <v-divider class="mb-10 opacity-10"></v-divider>

    <!-- Loading State -->
    <div v-if="favoritesStore.loading" class="d-flex flex-column align-center justify-center py-16">
      <v-progress-circular indeterminate color="primary" size="64" width="4"></v-progress-circular>
      <p class="mt-4 text-secondary font-weight-bold letter-spacing-1">CONSULTANDO TUS ARCHIVOS...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="favoritesStore.favorites.length === 0" class="text-center py-16 bg-white rounded-xl border-dashed">
      <v-avatar size="120" color="background" class="mb-4">
        <v-icon size="64" color="secondary" class="opacity-30">mdi-bookmark-plus-outline</v-icon>
      </v-avatar>
      <h3 class="text-h5 font-weight-bold text-primary mb-2">Aún no tienes guardados</h3>
      <p class="text-body-1 text-secondary opacity-60 px-6 max-width-500 mx-auto">
        Explora la biblioteca y guarda los artículos que te interesen para acceder a ellos rápidamente en cualquier momento.
      </p>
      <v-btn color="primary" rounded="xl" class="mt-8 px-8" to="/">
        Explorar Biblioteca
      </v-btn>
    </div>

    <!-- Favorites Grid -->
    <v-row v-else>
      <v-col v-for="art in favoritesStore.favorites" :key="art.id" cols="12" md="6" lg="4">
        <v-card 
          class="favorite-card overflow-hidden rounded-xl bg-surface sutil-shadow"
          variant="flat"
        >
          <v-img 
            :src="art.fotoUrl || '/images/hero.png'" 
            height="180" 
            cover
            class="align-end"
          >
            <div class="pa-4 bg-gradient-overlay">
              <v-chip size="x-small" color="white" class="font-weight-black">{{ art.anio }}</v-chip>
            </div>
          </v-img>

          <v-card-text class="pa-5">
            <h4 class="text-h6 font-weight-bold text-primary mb-2 line-clamp-2 title-height">
              {{ art.titulo }}
            </h4>
            <p class="text-caption text-secondary line-clamp-3 mb-6">
              {{ truncateTexto(art.contenido, 120) }}
            </p>

            <div class="d-flex align-center justify-space-between mt-auto">
              <v-btn 
                color="primary" 
                variant="flat" 
                rounded="lg" 
                class="px-4"
                :to="`/articulos/${art.id}`"
              >
                LEER AHORA
              </v-btn>
              <v-btn 
                icon="mdi-bookmark-remove" 
                variant="text" 
                color="error"
                @click="handleRemove(art.id!)"
              ></v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Feedback Snackbar -->
    <v-snackbar v-model="snackbar" color="primary" rounded="pill">
      Artículo eliminado de tu colección.
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFavoritesStore } from '~/stores/favorites'

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

const favoritesStore = useFavoritesStore()
const snackbar = ref(false)

const handleRemove = async (id: string) => {
  const res = await favoritesStore.toggleFavorite(id)
  if (res?.success && !res.saved) {
    snackbar.value = true
  }
}

const truncateTexto = (texto: string, longitud: number) => {
  if (texto.length <= longitud) return texto
  return texto.substring(0, longitud) + '...'
}

onMounted(() => {
  if (!favoritesStore.initialized) {
    favoritesStore.fetchFavorites()
  }
})
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}

.italic { font-style: italic; }

.favorite-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(199, 183, 163, 0.3) !important;
}

.favorite-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(86, 28, 36, 0.1) !important;
  border-color: #561C24 !important;
}

.title-height {
  min-height: 48px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bg-gradient-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  width: 100%;
}

.sutil-shadow {
  box-shadow: 0 4px 20px rgba(0,0,0,0.05) !important;
}

.border-dashed {
  border: 2px dashed rgba(199, 183, 163, 0.4) !important;
}

.max-width-500 {
  max-width: 500px;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}
</style>
