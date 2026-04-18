<!-- components/DigitalLibraryCollections.vue -->
<template>
  <div class="mb-12">
    <div class="d-flex align-center justify-space-between mb-8">
      <div class="d-flex align-center">
        <v-icon color="primary" class="mr-3">mdi-bookmark-multiple-outline</v-icon>
        <h2 class="text-h5 font-weight-bold text-primary font-display">Mis Guardados</h2>
      </div>
    </div>

    <!-- Lista de artículos guardados -->
    <v-row v-if="!favoritesStore.loading && favoritesStore.favorites.length > 0">
      <v-col v-for="art in favoritesStore.favorites" :key="art.id" cols="12" md="6" lg="4">
        <v-card 
          class="favorite-card pa-3 rounded-xl elevation-0" 
          @click="router.push(`/articulos/${art.id}`)"
        >
          <div class="d-flex align-center">
            <v-img 
              :src="art.fotoUrl || '/images/hero.png'" 
              width="80" 
              height="80" 
              cover 
              class="rounded-lg mr-4 bg-background"
            />
            <div class="flex-grow-1 overflow-hidden text-left">
              <h4 class="text-subtitle-1 font-weight-bold text-primary mb-0 text-truncate">
                {{ art.titulo }}
              </h4>
              <span class="text-caption text-secondary uppercase font-weight-black">
                {{ art.anio }}
              </span>
            </div>
            
            <div class="d-flex flex-column gap-1">
              <v-btn 
                icon="mdi-bookmark-remove-outline" 
                variant="text" 
                color="error"
                size="small"
                @click.stop="handleRemove(art.id!)"
              ></v-btn>
              <v-btn 
                icon="mdi-chevron-right" 
                variant="text" 
                color="primary"
                size="small"
              ></v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Estado vacío -->
    <div v-else-if="!favoritesStore.loading" class="text-center py-12 bg-white rounded-xl border-dashed">
      <v-icon size="64" color="secondary" class="opacity-20 mb-4">mdi-bookmark-plus-outline</v-icon>
      <p class="text-subtitle-1 text-secondary font-weight-medium px-6">
        Tu lista de favoritos está vacía. Guarda artículos para verlos aquí.
      </p>
    </div>

    <!-- Cargando -->
    <div v-else class="d-flex justify-center py-12">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- Snackbar local de feedback -->
    <v-snackbar v-model="snackbar" color="primary" rounded="pill" location="bottom left">
      <div class="d-flex align-center">
        <v-icon start>mdi-bookmark-off-outline</v-icon>
        <span class="font-weight-bold">Artículo eliminado de tus guardados</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '~/stores/favorites'

const router = useRouter()
const favoritesStore = useFavoritesStore()
const snackbar = ref(false)

const handleRemove = async (id: string) => {
  const res = await favoritesStore.toggleFavorite(id)
  if (res?.success && !res.saved) {
    snackbar.value = true
  }
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

.favorite-card {
  background-color: rgba(255, 255, 255, 0.6) !important;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(var(--v-theme-accent), 0.2) !important;
}

.favorite-card:hover {
  background-color: white !important;
  transform: translateX(5px);
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05) !important;
}

.border-dashed {
  border: 2px dashed rgba(var(--v-theme-secondary), 0.2) !important;
}

.uppercase {
  text-transform: uppercase;
}
</style>
