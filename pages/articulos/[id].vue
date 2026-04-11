<!-- pages/articulos/[id].vue -->
<template>
  <div class="article-page min-vh-100">
    <template v-if="articulo">
      <!-- Fixed Navigation Bar -->
      <header class="sticky-header px-4 py-3 d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-btn 
            icon="mdi-arrow-left" 
            variant="text" 
            color="white" 
            size="small" 
            @click="router.back()"
            class="mr-2"
          ></v-btn>
          <div class="d-flex align-center cursor-pointer" @click="router.push('/')">
            <v-icon color="white" size="24" class="mr-2 d-none d-sm-flex">mdi-library</v-icon>
            <span class="text-white font-weight-black text-uppercase letter-spacing-1 text-subtitle-1">HidroBiblio</span>
          </div>
        </div>
        <div class="d-flex align-center">
          <!-- <v-btn icon="mdi-export-variant" variant="text" color="white" size="small" class="mr-1"></v-btn> -->
          <v-btn 
            :icon="isSaved ? 'mdi-bookmark' : 'mdi-bookmark-outline'" 
            variant="text" 
            :color="isSaved ? 'orange-lighten-1' : 'white'" 
            size="small"
            @click="toggleSave"
            :loading="favoritesStore.loading && articulo?.id === currentId"
          ></v-btn>
        </div>
      </header>

      <div class="content-wrapper py-8 pb-16">
        <v-container>
          <!-- Hero Section -->
          <v-row justify="center">
            <v-col cols="12" lg="10">
              <div class="hero-container position-relative mb-10 overflow-hidden rounded-xl shadow-lg">
                <v-img 
                  :src="articulo.fotoUrl || '/images/hero.png'" 
                  height="450" 
                  cover 
                  class="hero-image"
                >
                  <template #placeholder>
                    <div class="d-flex align-center justify-center fill-height bg-primary bg-opacity-10">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </div>
                  </template>
                  <div class="hero-gradient"></div>
                  <div class="hero-content d-flex flex-column justify-end fill-height pa-6 pa-md-12">
                    <span class="text-uppercase font-weight-bold text-white letter-spacing-2 opacity-80 mb-2 subtitle-label">
                      PUBLICACIÓN TÉCNICA | {{ articulo.anio }}
                    </span>
                    <h1 class="text-h3 text-md-h2 font-weight-black text-white font-display leading-tight title-drop">
                      {{ articulo.titulo }}
                    </h1>
                  </div>
                </v-img>
              </div>

              <!-- Author & Meta info -->
              <div class="d-flex align-center mb-10 author-row">
                <v-avatar color="primary" size="48" class="mr-4 elevation-2">
                  <v-icon color="white">mdi-account-tie</v-icon>
                </v-avatar>
                <div class="d-flex flex-column">
                  <span class="text-subtitle-1 font-weight-bold text-primary">{{ articulo.titulo }}</span>
                  <div class="d-flex align-center text-caption text-secondary font-weight-medium">
                    <span>Publicado el {{ formatDate(articulo.createdAt) }}</span>
                    <v-icon size="4" class="mx-2" color="secondary">mdi-circle</v-icon>
                    <span>{{ readingTime }} min de lectura</span>
                  </div>
                </div>
              </div>

              <!-- Article Body -->
              <div class="article-content max-width-article mx-auto">
                <div 
                  class="article-body text-body-1 text-secondary leading-relaxed font-sans pre-wrap mb-12"
                  v-html="formattedContent"
                ></div>

                <!-- Blockquote Example (Manual if content doesn't have markdown) -->
                <blockquote class="custom-quote pa-6 mb-12">
                  "El conocimiento técnico es el motor de la industria, pero su preservación y difusión es lo que garantiza el futuro sostenible de los recursos hidrocarburíferos."
                </blockquote>

                <!-- Dynamic Content Image -->
                <v-row v-if="articulo.articuloFotoUrl" class="mb-12">
                  <v-col cols="12">
                    <v-img 
                      :src="articulo.articuloFotoUrl" 
                      cover 
                      max-height="500" 
                      class="rounded-xl shadow-md border-sand"
                    >
                      <template #placeholder>
                        <div class="d-flex align-center justify-center fill-height bg-primary bg-opacity-5">
                          <v-progress-circular indeterminate color="primary"></v-progress-circular>
                        </div>
                      </template>
                    </v-img>
                    <p class="text-caption text-center text-secondary mt-2 font-italic font-display">
                      Figura 1: Ilustración técnica complementaria para {{ articulo.titulo }}
                    </p>
                  </v-col>
                </v-row>


                <!-- Supplementary Materials Card -->
                <div v-if="articulo.documentoUrl" class="materials-card pa-8 pa-md-10 rounded-xl mb-12">
                  <v-row align="center">
                    <v-col cols="12" md="7">
                      <h3 class="text-h5 font-weight-black text-white font-display mb-4">Materiales Suplementarios</h3>
                      <p class="text-body-2 text-white opacity-70 mb-8 leading-relaxed">
                        Descarga el conjunto completo de datos académicos, tablas de composición química y mapeo geológico para la aplicación de {{ articulo.titulo }}.
                      </p>
                      
                      <div class="d-flex flex-wrap gap-4 mt-6">
                        <div class="d-flex align-center mr-6 mb-2">
                          <v-icon color="orange-darken-2" size="20" class="mr-2">mdi-file-document-outline</v-icon>
                          <span class="text-caption text-white font-weight-bold">Paper de Investigación</span>
                        </div>
                        <div class="d-flex align-center mr-6 mb-2">
                          <v-icon color="orange-darken-2" size="20" class="mr-2">mdi-table-large</v-icon>
                          <span class="text-caption text-white font-weight-bold">Tablas de Datos</span>
                        </div>
                        <div class="d-flex align-center mb-2">
                          <v-icon color="orange-darken-2" size="20" class="mr-2">mdi-molecule</v-icon>
                          <span class="text-caption text-white font-weight-bold">Modelos de Simulación</span>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" md="5" class="text-center text-md-right">
                      <v-btn
                        size="x-large"
                        color="#EF5E2A"
                        block
                        rounded="lg"
                        elevation="4"
                        prepend-icon="mdi-download"
                        :href="externalDocumentUrl"
                        target="_blank"
                        class="font-weight-black letter-spacing-1 text-white"
                      >
                        DESCARGAR
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>

                <!-- Tags -->
                <div class="tags-section d-flex flex-wrap gap-2 mb-16 pt-8 border-t">
                  <v-chip 
                    v-for="tag in ['INGENIERÍA DE PETRÓLEO', 'SOSTENIBILIDAD', 'REVISIÓN ACADÉMICA', 'SECTOR ENERGÉTICO']" 
                    :key="tag"
                    size="small"
                    variant="flat"
                    color="rgba(199, 183, 163, 0.4)"
                    class="font-weight-bold text-primary px-4"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- Footer Academic -->
      <footer class="py-10 border-t border-sand mx-10 text-center text-md-left">
        <v-container>
          <div class="d-flex flex-column flex-md-row justify-space-between align-center opacity-60">
            <div class="d-flex align-center mb-4 mb-md-0">
              <v-icon size="20" class="mr-2">mdi-library</v-icon>
              <span class="font-weight-black text-caption">HIDROBIBLIO</span>
            </div>
            <span class="text-caption">© {{ new Date().getFullYear() }} HidroBiblio Research Library. Todos los derechos reservados.</span>
            <div class="mt-4 mt-md-0">
              <v-icon size="20" class="mx-2">mdi-web</v-icon>
              <v-icon size="20" class="mx-2">mdi-email-outline</v-icon>
            </div>
          </div>
        </v-container>
      </footer>
    </template>

    <!-- Loading -->
    <div v-else-if="cargando" class="fill-height d-flex align-center justify-center py-16 bg-cream">
      <div class="text-center">
        <v-progress-circular indeterminate color="primary" size="64" class="mb-4"></v-progress-circular>
        <p class="text-h6 font-display text-primary">Abriendo archivo académico...</p>
      </div>
    </div>

    <!-- Error / Not Found -->
    <v-container v-else class="py-16 text-center">
      <v-icon size="100" color="error" class="mb-6 opacity-20">mdi-book-remove-outline</v-icon>
      <h2 class="text-h4 font-weight-black text-primary font-display mb-4">Artículo no encontrado</h2>
      <p class="text-body-1 text-secondary mb-8">El recurso que buscas no está disponible o ha sido movido del archivo.</p>
      <v-btn color="primary" size="large" rounded="xl" to="/" prepend-icon="mdi-home">Volver a la biblioteca</v-btn>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGestorArticulos, type Articulo } from '~/composables/domain/GestorArticulos'
import { useFavoritesStore } from '~/stores/favorites'

definePageMeta({
  layout: 'empty', // Using custom header within page for full control
  middleware: ['auth']
})

const route = useRoute()
const router = useRouter()
const { obtenerArticuloPorId } = useGestorArticulos()
const favoritesStore = useFavoritesStore()

const articulo = ref<Articulo | null>(null)
const cargando = ref(true)

const currentId = computed(() => route.params.id as string)

const cargarArticulo = async () => {
  const id = currentId.value
  if (!id) return

  cargando.value = true
  try {
    articulo.value = await obtenerArticuloPorId(id)
  } catch (error) {
    console.error('Error al cargar detalle del artículo:', error)
  } finally {
    cargando.value = false
  }
}

// Logic for saving/favorite
const isSaved = computed(() => {
  if (!articulo.value?.id) return false
  return favoritesStore.isFavorite(articulo.value.id)
})

const toggleSave = async () => {
  if (articulo.value?.id) {
    await favoritesStore.toggleFavorite(articulo.value.id)
  }
}

// Computed for external URL to ensure it's absolute
const externalDocumentUrl = computed(() => {
  const url = articulo.value?.documentoUrl
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
})

// Format reading time
const readingTime = computed(() => {
  if (!articulo.value?.contenido) return 5
  const wordsPerMinute = 200
  const words = articulo.value.contenido.split(/\s+/g).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
})

// Format content to handle line breaks elegantly
const formattedContent = computed(() => {
  if (!articulo.value?.contenido) return ''
  // Basic transformation for better display if not markdown
  return articulo.value.contenido
})

const formatDate = (timestamp: any) => {
  if (!timestamp) return 'Recientemente'
  
  try {
    let date: Date
    if (timestamp && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate()
    } else if (timestamp instanceof Date) {
      date = timestamp
    } else {
      date = new Date(timestamp)
    }

    if (isNaN(date.getTime())) return 'Recientemente'

    return new Intl.DateTimeFormat('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date)
  } catch (e) {
    return 'Recientemente'
  }
}

onMounted(() => {
  cargarArticulo()
  // Asegurar que los favoritos estén cargados si no se han inicializado
  if (!favoritesStore.initialized && !favoritesStore.loading) {
    favoritesStore.fetchFavorites()
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;700&display=swap');

.article-page {
  background-color: #E8D8C4;
  color: #333;
}

.bg-cream {
  background-color: #E8D8C4;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #561C24;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.font-display {
  font-family: 'Playfair Display', serif !important;
}

.font-sans {
  font-family: 'Inter', sans-serif !important;
}

.letter-spacing-1 {
  letter-spacing: 1.5px !important;
}

.letter-spacing-2 {
  letter-spacing: 2px !important;
}

.leading-tight {
  line-height: 1.1 !important;
}

.leading-relaxed {
  line-height: 1.8 !important;
}

.pre-wrap {
  white-space: pre-wrap;
}

.max-width-article {
  max-width: 800px;
}

/* Hero Section Styles */
.hero-container {
  height: 450px;
  border: 1px solid rgba(199, 183, 163, 0.5);
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(86, 28, 36, 0.1) 0%, rgba(86, 28, 36, 0.4) 50%, rgba(86, 28, 36, 0.8) 100%);
}

.title-drop {
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.subtitle-label {
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Author Row Styling */
.author-row {
  border-bottom: 1px solid rgba(199, 183, 163, 0.4);
  padding-bottom: 2rem;
}

/* Blockquote Styling */
.custom-quote {
  border-left: 4px solid #561C24;
  background-color: rgba(199, 183, 163, 0.2);
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 1.4rem;
  color: #561C24;
  line-height: 1.5;
  border-radius: 4px;
}

/* Materials Card */
.materials-card {
  background-color: #3E1017;
  color: white;
  border: 1px solid #C7B7A3;
}

.border-sand {
  border-color: #C7B7A3 !important;
}

.gap-4 { gap: 1rem; }
.gap-2 { gap: 0.5rem; }

.shadow-lg {
  box-shadow: 0 20px 50px rgba(86, 28, 36, 0.15) !important;
}

.shadow-sm {
  box-shadow: 0 4px 12px rgba(86, 28, 36, 0.08) !important;
}

.cursor-pointer {
  cursor: pointer;
}

@media (max-width: 600px) {
  .text-h3 {
    font-size: 1.8rem !important;
  }
  .hero-container {
    height: 350px;
  }
  .custom-quote {
    font-size: 1.1rem;
  }
}
</style>

