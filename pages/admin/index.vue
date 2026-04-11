<!-- pages/admin/index.vue -->
<template>
  <div class="admin-dashboard container-xl py-4 py-md-8">
    <!-- Header -->
    <div :class="['d-flex mb-8', mobile ? 'flex-column text-center' : 'align-center justify-space-between text-left']">
      <div :class="{ 'mb-4': mobile }">
        <h1 :class="['font-weight-black text-primary font-display mb-2', mobile ? 'text-h4' : 'text-h3']">
          Panel de Administración
        </h1>
        <p class="text-subtitle-1 text-secondary opacity-70">Gestiona los recursos académicos de la biblioteca.</p>
      </div>
      <v-btn
        color="primary"
        :size="mobile ? 'large' : 'x-large'"
        rounded="xl"
        elevation="4"
        prepend-icon="mdi-plus-circle"
        @click="abrirNuevo"
        class="font-weight-black letter-spacing-1"
        :block="mobile"
      >
        NUEVO ARTÍCULO
      </v-btn>
    </div>

    <!-- Filters and Statistics -->
    <v-row class="mb-8" dense>
      <v-col cols="12" md="4" lg="3">
        <v-select
          v-model="filtroAnio"
          :items="opcionesAnio"
          label="Filtrar por Año"
          rounded="xl"
          bg-color="white"
          variant="outlined"
          prepend-inner-icon="mdi-filter-variant"
          clearable
          @update:modelValue="cargarArticulos"
          density="comfortable"
        ></v-select>
      </v-col>
      <v-col cols="12" md="8" lg="9" class="d-flex align-center">
        <v-chip color="accent" size="large" class="font-weight-bold letter-spacing-1 elevation-1">
          TOTAL: {{ articulos.length }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-refresh" variant="tonal" color="primary" @click="cargarArticulos" :loading="cargando"></v-btn>
      </v-col>
    </v-row>

    <!-- Articles List -->
    <v-row v-if="!cargando && articulos.length > 0">
      <v-col v-for="art in articulos" :key="art.id" cols="12" sm="6" lg="4">
        <AdminArticleCard 
          :articulo="art" 
          @delete="confirmarBorrar"
          @edit="abrirEditar"
        />
      </v-col>
    </v-row>



    <!-- Empty State -->
    <div v-else-if="!cargando" class="empty-state text-center py-16">
      <v-icon size="80" color="secondary" class="opacity-20 mb-4">mdi-book-multiple-outline</v-icon>
      <h3 class="text-h5 font-weight-bold text-secondary opacity-60">No hay artículos que mostrar</h3>
      <p class="text-body-1 text-secondary opacity-40 px-6">Crea tu primer recurso académico para el Salón Académico.</p>
    </div>

    <!-- Loading State -->
    <v-row v-else>
      <v-col v-for="i in 6" :key="i" cols="12" sm="6" lg="4">
        <v-skeleton-loader type="card, list-item" class="rounded-xl"></v-skeleton-loader>
      </v-col>
    </v-row>

    <!-- Sección de Herramientas Complementarias (Glosario) -->
    <v-row class="mt-12 pt-8 border-t-accent">
      <v-col cols="12">
        <h2 class="text-h4 font-weight-black text-primary font-display mb-6">Herramientas del Sistema</h2>
      </v-col>
      <v-col cols="12" md="6">
        <GlossaryManager />
      </v-col>
    </v-row>

    <!-- Modal para Nuevo/Editar Artículo -->
    <AdminArticleForm 
      v-model="dialogForm" 
      :articuloAEditar="articuloAEditar"
      @created="cargarArticulos"
      @updated="cargarArticulos"
    />

    <!-- Dialog: Confirmar Borrado -->
    <v-dialog v-model="confirmarEliminar" max-width="450" transition="scale-transition">
      <v-card class="rounded-xl pa-4 pa-md-8 text-center shadow-lg">
        <v-avatar size="100" color="error-lighten-4" class="mb-6">
          <v-icon size="64" color="error">mdi-alert-circle-outline</v-icon>
        </v-avatar>
        <h3 class="text-h5 font-weight-black text-primary mb-3">¿Confirmas la eliminación?</h3>
        <p class="text-body-1 text-secondary opacity-80 mb-8 px-4">
          Esta acción es permanente y eliminará tanto el artículo como sus archivos adjuntos del archivo escolar.
        </p>
        <div class="d-flex flex-column flex-sm-row gap-4">
          <v-btn block size="large" variant="outlined" color="primary" rounded="xl" @click="confirmarEliminar = false">
            No, volver
          </v-btn>
          <v-btn block size="large" color="error" rounded="xl" elevation="2" @click="procederEliminar" :loading="borrando">
            Sí, eliminar
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useGestorArticulos, type Articulo } from '~/composables/domain/GestorArticulos'
import AdminArticleCard from '~/components/admin/AdminArticleCard.vue'
import AdminArticleForm from '~/components/admin/AdminArticleForm.vue'
import GlossaryManager from '~/components/admin/GlossaryManager.vue'

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

const { mobile } = useDisplay()
const { obtenerArticulos, eliminarArticulo } = useGestorArticulos()

// State
const articulos = ref<Articulo[]>([])
const cargando = ref(true)
const borrando = ref(false)
const dialogForm = ref(false)
const confirmarEliminar = ref(false)
const articuloSeleccionado = ref<Articulo | null>(null)
const articuloAEditar = ref<Articulo | null>(null)
const filtroAnio = ref<string | null>(null)

const opcionesAnio = ['1ro "U"', '2do "U"', '3ro "U"', '4to "U"', '5to "U"']

// Methods
const cargarArticulos = async () => {
  cargando.value = true
  try {
    articulos.value = await obtenerArticulos(filtroAnio.value || undefined, true)
  } catch (error) {
    console.error('Error al cargar artículos:', error)
  } finally {
    cargando.value = false
  }
}

const abrirNuevo = () => {
  articuloAEditar.value = null
  dialogForm.value = true
}

const abrirEditar = (articulo: Articulo) => {
  articuloAEditar.value = articulo
  dialogForm.value = true
}

const confirmarBorrar = (articulo: Articulo) => {
  articuloSeleccionado.value = articulo
  confirmarEliminar.value = true
}

const procederEliminar = async () => {
  if (!articuloSeleccionado.value) return
  
  borrando.value = true
  try {
    await eliminarArticulo(articuloSeleccionado.value)
    await cargarArticulos()
    confirmarEliminar.value = false
  } catch (error) {
    console.error(error)
  } finally {
    borrando.value = false
  }
}

onMounted(() => {
  cargarArticulos()
})
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}

.letter-spacing-1 {
  letter-spacing: 1.2px !important;
}

.gap-4 {
  gap: 16px;
}

.error-lighten-4 {
  background-color: #FDEDEE;
}

.border-t-accent {
  border-top: 1px solid rgba(199, 183, 163, 0.4);
}
</style>
