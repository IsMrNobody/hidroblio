<!-- components/DigitalLibraryRecentlyAdded.vue -->
<template>
  <div class="mb-16">
    <div :class="['d-flex align-center justify-space-between mb-8 border-b-accent pb-2', mobile ? 'flex-column align-start gap-3' : '']">
      <div class="d-flex align-center">
        <v-icon color="primary" class="mr-3">mdi-book-open-page-variant-outline</v-icon>
        <h2 class="text-h5 font-weight-bold text-primary font-display">Añadidos Recientemente</h2>
      </div>
      <v-btn variant="text" color="primary" class="text-caption font-weight-black letter-spacing-1">
        VER TODO EL ARCHIVO
      </v-btn>
    </div>

    <v-row v-if="!cargando" class="horizontal-scroll-row">
      <v-col v-for="art in articulos" :key="art.id" cols="12" sm="6" md="4" lg="3">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            class="book-dashboard-card rounded-xl overflow-hidden elevation-0 cursor-pointer"
            :class="{ 'card-hover': isHovering }"
            @click="router.push(`/articulos/${art.id}`)"
          >
            <v-img :src="art.fotoUrl || '/images/hero.png'" height="340" cover class="align-end">
              <div class="card-gradient"></div>
              <div class="pa-6 position-relative z-1 text-left">
                <span class="text-overline font-weight-black text-accent-light d-block mb-1">{{ art.anio }}</span>
                <h3 class="text-h6 font-weight-bold text-white leading-tight mb-2">{{ art.titulo }}</h3>
                <v-btn 
                  :icon="favoritesStore.isFavorite(art.id!) ? 'mdi-bookmark' : 'mdi-bookmark-outline'" 
                  :color="favoritesStore.isFavorite(art.id!) ? 'primary' : 'accent'" 
                  variant="flat" 
                  size="small" 
                  rounded="lg"
                  :loading="guardandoId === art.id"
                  @click.stop="handleGuardar(art.id!)"
                ></v-btn>
              </div>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
      <v-col v-if="articulos.length === 0" cols="12" class="text-center py-8">
        <p class="text-subtitle-1 text-secondary opacity-50">No hay recursos recientes para tu año académico.</p>
      </v-col>
    </v-row>
    <div v-else class="d-flex justify-center py-12">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- Feedback Snackbar -->
    <v-snackbar v-model="snackbar" color="accent" rounded="pill" location="bottom right">
      <div class="d-flex align-center">
        <v-icon start>mdi-check-circle</v-icon>
        <span class="font-weight-bold">{{ snackbarText }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useStudentStore } from '~/stores/student'
import { useFavoritesStore } from '~/stores/favorites'
import { useGestorArticulos, type Articulo } from '~/composables/domain/GestorArticulos'

const { mobile } = useDisplay()
const router = useRouter()
const store = useStudentStore()
const favoritesStore = useFavoritesStore()
const { obtenerArticulos } = useGestorArticulos()

const articulos = ref<Articulo[]>([])
const cargando = ref(true)
const snackbar = ref(false)
const snackbarText = ref('Artículo guardado')
const guardandoId = ref('')

const cargarArticulosRecientes = async () => {
  cargando.value = true
  try {
    const anio = store.profile.year
    articulos.value = await obtenerArticulos(anio)
  } catch (error) {
    console.error('Error al cargar artículos:', error)
  } finally {
    cargando.value = false
  }
}

const handleGuardar = async (id: string) => {
  guardandoId.value = id
  try {
    const res = await favoritesStore.toggleFavorite(id)
    if (res?.success) {
      snackbarText.value = res.saved ? 'Añadido a tus guardados' : 'Eliminado de tus guardados'
      snackbar.value = true
    }
  } catch (error) {
    console.error('Error al guardar artículo:', error)
  } finally {
    guardandoId.value = ''
  }
}

onMounted(() => {
  cargarArticulosRecientes()
})
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}

.border-b-accent {
  border-bottom: 1px solid rgba(var(--v-theme-accent), 0.3);
}

.book-dashboard-card {
  border: 1px solid rgba(var(--v-theme-accent), 0.2);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: transparent !important;
}

.card-hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(86, 28, 36, 0.1) !important;
  border-color: rgb(var(--v-theme-primary));
}

.card-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(86, 28, 36, 0) 50%, rgba(86, 28, 36, 0.9) 100%);
}

.leading-tight {
  line-height: 1.2 !important;
}

.text-accent-light {
  color: #C7B7A3;
}
</style>
