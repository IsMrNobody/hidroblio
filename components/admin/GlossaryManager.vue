<template>
  <v-card class="rounded-xl border-accent elevation-0 overflow-hidden">
    <div class="pa-6 bg-primary">
      <div class="d-flex align-center justify-space-between">
        <div>
          <h2 class="text-h5 font-weight-black text-white font-display">Gestión del Glosario</h2>
          <p class="text-caption text-white opacity-70 mb-0 uppercase letter-spacing-1">Añadir o eliminar términos técnicos</p>
        </div>
        <v-btn
          color="accent"
          variant="flat"
          rounded="lg"
          prepend-icon="mdi-plus"
          @click="dialogVisible = true"
          class="font-weight-bold"
        >
          Nuevo Término
        </v-btn>
      </div>
    </div>

    <v-divider class="opacity-10"></v-divider>

    <div class="pa-4">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Buscar en el glosario"
        variant="underlined"
        hide-details
        class="mb-4"
      ></v-text-field>

      <v-list class="glossary-list" bg-color="transparent" max-height="400">
        <v-list-item
          v-for="termino in filteredTerms"
          :key="termino.id"
          class="rounded-lg mb-2 border-accent-light"
        >
          <template v-slot:prepend>
            <v-avatar color="primary" size="32" class="mr-3">
              <span class="text-caption text-white font-weight-bold">{{ termino.palabra[0] }}</span>
            </v-avatar>
          </template>

          <v-list-item-title class="font-weight-bold text-primary">{{ termino.palabra }}</v-list-item-title>
          <v-list-item-subtitle class="text-caption">
            <v-chip size="x-small" color="secondary" variant="outlined" class="mr-2">{{ termino.categoria }}</v-chip>
            {{ termino.definicion.substring(0, 60) }}...
          </v-list-item-subtitle>

          <template v-slot:append>
            <v-btn
              icon="mdi-delete-outline"
              variant="text"
              color="error"
              size="small"
              @click="eliminar(termino.id)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </div>

    <!-- Dialog para añadir término -->
    <v-dialog v-model="dialogVisible" max-width="500">
      <v-card class="rounded-xl pa-4">
        <v-card-title class="text-h5 font-weight-bold text-primary font-display pb-4">
          Nuevo Término Técnico
        </v-card-title>
        
        <v-card-text class="pa-0">
          <v-text-field
            v-model="nuevo.palabra"
            label="Palabra o Término"
            variant="outlined"
            rounded="lg"
            class="mb-4"
          ></v-text-field>

          <v-select
            v-model="nuevo.categoria"
            :items="categorias"
            label="Categoría"
            variant="outlined"
            rounded="lg"
            class="mb-4"
          ></v-select>

          <v-textarea
            v-model="nuevo.definicion"
            label="Definición técnica"
            variant="outlined"
            rounded="lg"
            rows="3"
            class="mb-4"
          ></v-textarea>
        </v-card-text>

        <v-card-actions class="px-0 pt-4">
          <v-spacer></v-spacer>
          <v-btn variant="text" color="secondary" @click="dialogVisible = false">Cancelar</v-btn>
          <v-btn
            color="primary"
            variant="flat"
            rounded="lg"
            :disabled="!isValid"
            :loading="guardando"
            @click="guardar"
          >
            Guardar Término
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGlossaryStore } from '~/stores/glossary'

const store = useGlossaryStore()
const search = ref('')
const dialogVisible = ref(false)
const guardando = ref(false)

const categorias = ['Upstream', 'Midstream', 'Downstream', 'Geología', 'Equipos', 'General']

const nuevo = ref({
  palabra: '',
  categoria: 'General',
  definicion: ''
})

const filteredTerms = computed(() => {
  if (!search.value) return store.terminos
  return store.terminos.filter(t => 
    t.palabra.toLowerCase().includes(search.value.toLowerCase()) ||
    t.definicion.toLowerCase().includes(search.value.toLowerCase())
  )
})

const isValid = computed(() => {
  return nuevo.value.palabra.length > 2 && nuevo.value.definicion.length > 5 && !guardando.value
})

const guardar = async () => {
  guardando.value = true
  try {
    await store.agregarTermino(nuevo.value.palabra, nuevo.value.categoria, nuevo.value.definicion)
    nuevo.value = { palabra: '', categoria: 'General', definicion: '' }
    dialogVisible.value = false
  } catch (error) {
    alert('Error al guardar el término')
  } finally {
    guardando.value = false
  }
}

const eliminar = async (id: string) => {
  if (id.startsWith('local-')) {
    alert('Los términos de ejemplo no pueden ser eliminados.')
    return
  }

  if (confirm('¿Seguro que deseas eliminar este término de la base de datos?')) {
    try {
      await store.eliminarTermino(id)
    } catch (error) {
      alert('Error al eliminar el término')
    }
  }
}

onMounted(() => {
  store.cargarTerminos()
})
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}

.border-accent {
  border: 1px solid rgba(199, 183, 163, 0.4) !important;
}

.border-accent-light {
  border-bottom: 1px solid rgba(199, 183, 163, 0.1);
}

.glossary-list {
  scrollbar-width: thin;
  scrollbar-color: #C7B7A3 transparent;
}

.glossary-list::-webkit-scrollbar {
  width: 4px;
}

.glossary-list::-webkit-scrollbar-thumb {
  background-color: #C7B7A3;
  border-radius: 10px;
}

.uppercase {
  text-transform: uppercase;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}
</style>
