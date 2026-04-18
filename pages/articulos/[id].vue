<!-- pages/articulos/[id].vue -->
<template>
  <div class="article-view pb-16">
    <template v-if="articulo">
      <!-- Hero / Header -->
      <v-img 
        :src="articulo.fotoUrl || '/images/hero.png'" 
        height="500" 
        cover 
        class="align-end article-hero shadow-inner-white"
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height bg-primary bg-opacity-10">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </template>
        <div class="card-gradient"></div>
        <v-container class="position-relative z-1 mb-8">
          <v-btn
            icon="mdi-arrow-left"
            variant="flat"
            color="white"
            class="mb-6 elevation-4"
            @click="router.back()"
          ></v-btn>
          <v-chip color="accent" class="mb-4 font-weight-black text-white" label size="small">{{ articulo.anio }}</v-chip>
          <h1 class="text-h2 font-weight-black text-white font-display leading-tight mb-4">{{ articulo.titulo }}</h1>
          <div class="d-flex align-center text-white opacity-80">
            <v-icon start size="18">mdi-calendar-range</v-icon>
            <span class="text-caption font-weight-bold">Publicado el {{ formatDate(articulo.createdAt) }}</span>
          </div>
        </v-container>
      </v-img>

      <v-container class="mt-n16 position-relative z-2">
        <v-row justify="center">
          <v-col cols="12" lg="9" xl="8">
            <v-card class="pa-8 pa-md-16 rounded-xl elevation-6 border-accent bg-white article-content-card">
              <!-- Content -->
              <div class="article-body text-body-1 text-secondary leading-relaxed mb-12 pre-wrap">
                {{ articulo.contenido }}
              </div>

              <v-divider class="my-12"></v-divider>

              <!-- Footer / Attachments -->
              <div v-if="articulo.documentoUrl" class="attachments-section p-6 rounded-xl bg-background-light border-dashed-accent text-center">
                <v-avatar size="80" color="primary" class="mb-4 elevation-2">
                  <v-icon size="40" color="white">mdi-file-pdf-box</v-icon>
                </v-avatar>
                <h3 class="text-h5 font-weight-black text-primary font-display mb-2">Recurso de Investigación</h3>
                <p class="text-body-2 text-secondary mb-6">Este artículo incluye material complementario para tu estudio.</p>
                <v-btn
                  size="x-large"
                  color="primary"
                  rounded="xl"
                  elevation="4"
                  prepend-icon="mdi-download"
                  :href="articulo.documentoUrl"
                  target="_blank"
                  class="font-weight-black letter-spacing-1"
                >
                  DESCARGAR "{{ articulo.nombreDocumento }}"
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!-- Loading -->
    <div v-else-if="cargando" class="fill-height d-flex align-center justify-center py-16">
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGestorArticulos, type Articulo } from '~/composables/domain/GestorArticulos'

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

const route = useRoute()
const router = useRouter()
const { obtenerArticuloPorId } = useGestorArticulos()

const articulo = ref<Articulo | null>(null)
const cargando = ref(true)

const cargarArticulo = async () => {
  const id = route.params.id as string
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

const formatDate = (timestamp: any) => {
  if (!timestamp) return 'Recientemente'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return new Intl.DateTimeFormat('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date)
}

onMounted(() => {
  cargarArticulo()
})
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}

.leading-relaxed {
  line-height: 1.8 !important;
}

.leading-tight {
  line-height: 1.2 !important;
}

.pre-wrap {
  white-space: pre-wrap;
}

.card-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(86, 28, 36, 0) 0%, rgba(86, 28, 36, 0.9) 100%);
}

.article-hero {
  border-bottom: 2px solid rgba(var(--v-theme-accent), 0.3);
}

.article-content-card {
  border: 1px solid rgba(var(--v-theme-accent), 0.2) !important;
  margin-top: -64px;
}

.bg-background-light {
  background-color: rgba(199, 183, 163, 0.1);
}

.border-dashed-accent {
  border: 2px dashed rgba(199, 183, 163, 0.4);
}

.letter-spacing-1 {
  letter-spacing: 1.5px !important;
}

@media (max-width: 600px) {
  .text-h2 {
    font-size: 2.5rem !important;
  }
}
</style>
