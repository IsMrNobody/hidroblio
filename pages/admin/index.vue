<!-- pages/admin/index.vue -->
<template>
  <div class="admin-dashboard container-xl py-4 pb-16">
    <!-- Header -->
    <div :class="['d-flex mb-8', mobile ? 'flex-column text-center' : 'align-center justify-space-between text-left']">
      <div :class="{ 'mb-4': mobile }">
        <h1 :class="['font-weight-black text-primary font-display mb-1', mobile ? 'text-h4' : 'text-h3']">
          Panel Maestro
        </h1>
        <p class="text-subtitle-1 text-secondary opacity-70 italic">Gestión de acervo y terminología académica.</p>
      </div>
      <v-btn
        color="primary"
        :size="mobile ? 'large' : 'x-large'"
        rounded="xl"
        elevation="2"
        prepend-icon="mdi-plus"
        @click="abrirNuevo"
        class="font-weight-black letter-spacing-1"
        :block="mobile"
      >
        NUEVO RECURSO
      </v-btn>
    </div>

    <!-- Articles Section -->
    <section id="articulos-section" class="mb-12">
      <div class="d-flex align-center mb-6">
        <v-icon color="primary" class="mr-3">mdi-book-multiple</v-icon>
        <h2 class="text-h5 font-weight-black text-primary uppercase letter-spacing-1">Listado de Artículos</h2>
        <v-spacer></v-spacer>
        <v-chip color="accent" variant="tonal" class="font-weight-bold">{{ articulos.length }} total</v-chip>
      </div>

      <!-- Filters Row -->
      <v-row class="mb-4" dense>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Buscar por título..."
            rounded="xl"
            bg-color="surface"
            hide-details
            density="comfortable"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="filtroAnio"
            :items="opcionesAnio"
            label="Filtrar Grado"
            rounded="xl"
            bg-color="surface"
            prepend-inner-icon="mdi-filter-variant"
            clearable
            @update:modelValue="cargarArticulos"
            density="comfortable"
            hide-details
          ></v-select>
        </v-col>
      </v-row>

      <!-- Compact List View (Data Table) -->
      <v-card class="rounded-xl overflow-hidden elevation-1 border-accent sutil-shadow">
        <v-data-table
          :headers="headers"
          :items="articulos"
          :loading="cargando"
          :search="search"
          hover
          class="bg-surface academic-table"
          no-data-text="No se encontraron artículos"
          loading-text="Consultando los archivos..."
        >
          <!-- Custom Title Column -->
          <template v-slot:item.titulo="{ item }">
            <div class="d-flex align-center py-2">
              <v-avatar size="44" rounded="lg" color="background" class="mr-3 border-accent">
                <v-img v-if="item.fotoUrl" :src="item.fotoUrl" cover></v-img>
                <v-icon v-else color="primary">mdi-file-document-outline</v-icon>
              </v-avatar>
              <div class="overflow-hidden">
                <div class="text-subtitle-2 font-weight-bold text-primary text-truncate">{{ item.titulo }}</div>
                <div class="text-caption text-secondary d-flex align-center">
                  <v-icon size="12" class="mr-1">mdi-clock-outline</v-icon>
                  {{ formatearFecha(item.createdAt) }}
                </div>
              </div>
            </div>
          </template>

          <template v-slot:item.anio="{ item }">
            <v-chip size="x-small" color="primary" variant="outlined" class="font-weight-bold">
              {{ item.anio }}
            </v-chip>
          </template>

          <!-- Actions Column -->
          <template v-slot:item.actions="{ item }">
            <div class="d-flex justify-end gap-1">
              <v-tooltip text="Ver en sitio" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon="mdi-eye-outline" variant="text" size="small" color="secondary" @click="verArticulo(item)"></v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="Editar" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon="mdi-pencil-outline" variant="text" size="small" color="primary" @click="abrirEditar(item)"></v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="Eliminar" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon="mdi-trash-can-outline" variant="text" size="small" color="error" @click="confirmarBorrar(item)"></v-btn>
                </template>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </section>

    <!-- Glossary Section -->
    <section id="glosario-section" class="mt-16 pt-8 border-t-accent">
      <div class="d-flex align-center mb-6">
        <v-icon color="primary" class="mr-3">mdi-book-alphabet</v-icon>
        <h2 class="text-h5 font-weight-black text-primary uppercase letter-spacing-1">Glosario Técnico</h2>
      </div>
      <GlossaryManager />
    </section>

    <!-- Bottom Navigation -->
    <v-bottom-navigation
      v-model="activeTab"
      color="primary"
      grow
      class="admin-navigation-bar border-t-accent"
      elevation="10"
    >
      <v-btn value="articulos" @click="scrollTo('articulos-section')">
        <v-icon>mdi-book-multiple</v-icon>
        <span>Artículos</span>
      </v-btn>

      <v-btn value="nuevo" @click="abrirNuevo">
        <v-icon>mdi-plus-circle</v-icon>
        <span class="font-weight-bold">CREAR</span>
      </v-btn>

      <v-btn value="glosario" @click="scrollTo('glosario-section')">
        <v-icon>mdi-alphabetical</v-icon>
        <span>Glosario</span>
      </v-btn>
    </v-bottom-navigation>

    <!-- Modal Form -->
    <AdminArticleForm 
      v-model="dialogForm" 
      :articuloAEditar="articuloAEditar"
      @created="cargarArticulos"
      @updated="cargarArticulos"
    />

    <!-- Delete Confirmation -->
    <v-dialog v-model="confirmarEliminar" max-width="450" transition="scale-transition">
      <v-card class="rounded-xl pa-8 text-center bg-surface">
        <v-avatar size="80" color="error" variant="tonal" class="mb-6">
          <v-icon size="48">mdi-alert-octagon</v-icon>
        </v-avatar>
        <h3 class="text-h5 font-weight-black text-primary mb-2">Eliminar Artículo</h3>
        <p class="text-body-1 text-secondary opacity-70 mb-8">
          ¿Seguro que deseas eliminar "{{ articuloSeleccionado?.titulo }}"? Esta acción no se puede deshacer.
        </p>
        <div class="d-flex gap-3">
          <v-btn flex-grow-1 variant="tonal" rounded="xl" @click="confirmarEliminar = false">Cancelar</v-btn>
          <v-btn flex-grow-1 color="error" rounded="xl" @click="procederEliminar" :loading="borrando">Confirmar</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useGestorArticulos, type Articulo } from '~/composables/domain/GestorArticulos'
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
const search = ref('')
const dialogForm = ref(false)
const confirmarEliminar = ref(false)
const articuloSeleccionado = ref<Articulo | null>(null)
const articuloAEditar = ref<Articulo | null>(null)
const filtroAnio = ref<string | null>(null)
const activeTab = ref('articulos')

const opcionesAnio = ['1ro "U"', '2do "U"', '3ro "U"', '4to "U"', '5to "U"', 'General']

const headers = [
  { title: 'RECURSO / ARTÍCULO', align: 'start', key: 'titulo' },
  { title: 'GRADO', align: 'start', key: 'anio', width: '120px' },
  { title: 'ACCIONES', align: 'end', key: 'actions', sortable: false, width: '140px' },
]

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

const verArticulo = (articulo: Articulo) => {
  if (articulo.id) {
    navigateTo(`/articulos/${articulo.id}`)
  }
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

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const formatearFecha = (fecha: any) => {
  if (!fecha) return 'Sin fecha'
  const d = fecha.toDate ? fecha.toDate() : new Date(fecha)
  return new Intl.DateTimeFormat('es-VE', { day: '2-digit', month: 'short' }).format(d)
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

.gap-1 { gap: 4px; }
.gap-3 { gap: 12px; }

.italic { font-style: italic; }
.uppercase { text-transform: uppercase; }

.border-accent {
  border: 1px solid rgba(199, 183, 163, 0.3) !important;
}

.border-t-accent {
  border-top: 1px solid rgba(199, 183, 163, 0.4);
}

.sutil-shadow {
  box-shadow: 0 10px 30px -15px rgba(86, 28, 36, 0.1) !important;
}

.academic-table :deep(th) {
  text-transform: uppercase;
  font-size: 0.75rem !important;
  font-weight: 900 !important;
  letter-spacing: 1px;
  color: #6D2932 !important;
  background-color: #FDFBF7 !important;
}

.admin-navigation-bar {
  background-color: #FDFBF7 !important;
  border-top: 1px solid #C7B7A3 !important;
  bottom: 0;
  position: fixed;
  width: 100%;
  z-index: 100;
}

.v-data-table :deep(.v-data-table__tr:hover) {
  background-color: rgba(199, 183, 163, 0.1) !important;
}
</style>
