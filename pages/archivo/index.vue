<!-- pages/archivo/index.vue -->
<template>
  <div class="archive-page pb-16">
    <!-- Header Hero Section -->
    <v-sheet
      height="320"
      class="archive-hero d-flex align-center justify-center position-relative mb-12"
      color="primary"
    >
      <div class="hero-overlay"></div>
      <v-container class="position-relative z-1 text-center">
        <v-chip
          v-if="anioSeleccionado"
          color="accent"
          class="font-weight-black mb-4 px-6 text-white elevation-4"
          size="large"
          label
        >
          ARCHIVO ACADÉMICO: {{ anioSeleccionado }}
        </v-chip>
        <v-chip
          v-else
          color="accent"
          class="font-weight-black mb-4 px-6 text-white elevation-4"
          size="large"
          label
        >
          ARCHIVO GENERAL HIDROBIBLIO
        </v-chip>
        
        <h1 class="text-h2 font-weight-black text-white font-display leading-tight mb-4">
          {{ anioSeleccionado ? `Investigaciones de ${anioSeleccionado}` : 'Explorador de Conocimiento' }}
        </h1>
        <p class="text-h6 text-white opacity-80 max-w-2xl mx-auto font-weight-medium">
          Accede a todos los registros, mapas y tesis del acervo digital de nuestra institución.
        </p>
      </v-container>
    </v-sheet>

    <v-container>
      <!-- Results Area -->
      <div v-if="!cargando && articulos.length > 0">
        <v-row>
          <v-col 
            v-for="art in articulos" 
            :key="art.id" 
            cols="12" 
            sm="6" 
            md="4" 
            lg="3"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                class="article-card rounded-xl overflow-hidden elevation-0 cursor-pointer h-full border-1"
                :class="{ 'card-hover': isHovering }"
                @click="router.push(`/articulos/${art.id}`)"
              >
                <v-img :src="art.fotoUrl || '/images/hero.png'" height="240" cover class="align-end">
                  <div class="card-gradient"></div>
                  <v-chip size="x-small" color="accent" class="position-absolute top-4 right-4 font-weight-black" label uppercase>
                    {{ art.anio }}
                  </v-chip>
                </v-img>
                <v-card-text class="pa-5">
                  <h3 class="text-subtitle-1 font-weight-bold text-primary leading-tight mb-2 line-clamp-2">
                    {{ art.titulo }}
                  </h3>
                  <p class="text-body-2 text-secondary opacity-70 line-clamp-3 mb-4">
                    {{ art.contenido }}
                  </p>
                  <div class="d-flex align-center justify-space-between mt-auto">
                    <span class="text-caption font-weight-black text-accent uppercase tracking-wider">
                      {{ formatDate(art.createdAt) }}
                    </span>
                    <v-btn 
                      :icon="favoritesStore.isFavorite(art.id!) ? 'mdi-bookmark' : 'mdi-bookmark-outline'" 
                      :color="favoritesStore.isFavorite(art.id!) ? 'primary' : 'accent'" 
                      size="x-small" 
                      variant="tonal" 
                      rounded="lg"
                      :loading="guardandoId === art.id"
                      @click.stop="handleGuardar(art.id!)"
                    ></v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </div>

      <!-- Empty State -->
      <div v-else-if="!cargando" class="text-center py-16 animation-fade-in">
        <v-icon size="120" color="secondary" class="opacity-20 mb-6">mdi-book-multiple-outline</v-icon>
        <h2 class="text-h4 font-weight-black text-primary font-display mb-4">Nivel sin registros todavía</h2>
        <p class="text-body-1 text-secondary opacity-70 mb-8 max-w-md mx-auto">
          El archivo de <strong>{{ anioSeleccionado ? anioSeleccionado : 'HidroBiblio' }}</strong> no contiene artículos publicados en este momento. Intenta explorar otro año académico.
        </p>
        <v-btn color="primary" size="large" rounded="xl" prepend-icon="mdi-chevron-left" @click="router.back()">
          VOLVER AL PANEL
        </v-btn>
      </div>

      <!-- Loading State -->
      <div v-else class="text-center py-16">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        <p class="mt-4 text-h6 font-display text-primary">Consultando registros históricos...</p>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGestorArticulos, type Articulo } from '~/composables/domain/GestorArticulos'
import { useFavoritesStore } from '~/stores/favorites'

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

const route = useRoute()
const router = useRouter()
const { obtenerArticulos } = useGestorArticulos()
const favoritesStore = useFavoritesStore()

const anioSeleccionado = computed(() => route.query.anio as string || null)
const articulos = ref<Articulo[]>([])
const cargando = ref(true)
const guardandoId = ref('')

const cargarArchivo = async () => {
  cargando.value = true
  try {
    articulos.value = await obtenerArticulos(anioSeleccionado.value || undefined)
  } catch (error) {
    console.error('Error al cargar archivo académico:', error)
  } finally {
    cargando.value = false
  }
}

const handleGuardar = async (id: string) => {
  guardandoId.value = id
  try {
    await favoritesStore.toggleFavorite(id)
  } catch (error) {
    console.error('Error al guardar artículo:', error)
  } finally {
    guardandoId.value = ''
  }
}

const formatDate = (timestamp: any) => {
  if (!timestamp) return 'Reciente'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return new Intl.DateTimeFormat('es-ES', { month: 'short', year: 'numeric' }).format(date)
}

watch(() => route.query.anio, () => {
  cargarArchivo()
}, { immediate: true })
</script>

<style scoped>
.archive-page {
  background-color: #FBF9F6;
  min-height: 100vh;
}

.font-display {
  font-family: 'Playfair Display', serif !important;
}

.archive-hero {
  background-image: url('/images/hero.png');
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(86, 28, 36, 0.4) 0%, rgba(86, 28, 36, 0.95) 100%);
}

.article-card {
  border: 1px solid rgba(var(--v-theme-accent), 0.2) !important;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: white !important;
}

.card-hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1) !important;
  border-color: rgb(var(--v-theme-primary)) !important;
}

.card-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.3) 100%);
}

.leading-tight {
  line-height: 1.2 !important;
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

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.max-w-2xl {
  max-width: 42rem;
}

.max-w-md {
  max-width: 28rem;
}

.animation-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.border-1 {
  border: 1px solid rgba(0,0,0,0.05);
}

.uppercase {
  text-transform: uppercase;
}

.tracking-wider {
  letter-spacing: 1px !important;
}
</style>
