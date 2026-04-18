<!-- components/admin/AdminArticleForm.vue -->
<template>
  <v-dialog 
    v-model="internalValue" 
    max-width="800" 
    persistent 
    :fullscreen="sm"
    transition="dialog-bottom-transition"
  >
    <v-card class="rounded-xl overflow-hidden shadow-2xl">
      <v-toolbar color="primary" dark class="px-6 flex-shrink-0">
        <v-btn icon="mdi-close" variant="text" @click="internalValue = false"></v-btn>
        <v-toolbar-title class="font-weight-black font-display letter-spacing-1">
          {{ articuloAEditar ? 'EDITAR RECURSO' : 'NUEVO ARTÍCULO ACADÉMICO' }}
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text class="pa-4 pa-md-8 overflow-y-auto">
        <v-form @submit.prevent="guardar" ref="formRef">
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="form.titulo"
                label="Título del artículo"
                variant="outlined"
                rounded="xl"
                persistent-placeholder
                :rules="[v => !!v || 'Requerido']"
                bg-color="white"
                prepend-inner-icon="mdi-format-title"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="form.anio"
                :items="opcionesAnio"
                label="Año académico"
                variant="outlined"
                rounded="xl"
                :rules="[v => !!v || 'Requerido']"
                bg-color="white"
                prepend-inner-icon="mdi-calendar-graduation"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="form.contenido"
                label="Contenido del artículo"
                variant="outlined"
                rounded="xl"
                rows="6"
                persistent-placeholder
                :rules="[v => !!v || 'Requerido']"
                bg-color="white"
                prepend-inner-icon="mdi-text-subject"
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <h4 class="text-caption font-weight-bold text-secondary mb-4 uppercase">MULTIMEDIA Y RECURSOS EXTERNOS</h4>
              <v-row>
                <v-col cols="12" md="6">
                  <v-file-input
                    v-model="archivoPortada"
                    label="Imagen de Portada"
                    accept="image/*"
                    variant="outlined"
                    rounded="xl"
                    bg-color="white"
                    prepend-inner-icon="mdi-camera-plus-outline"
                    hint="Imagen principal que aparece en el listado y hero"
                    persistent-hint
                    :loading="isUploading"
                    @update:model-value="previewPortada"
                  ></v-file-input>
                  <v-img v-if="fotoPortadaPreview || form.fotoUrl" :src="fotoPortadaPreview || form.fotoUrl" height="120" class="mt-2 rounded-lg border-accent" contain></v-img>
                </v-col>
                <v-col cols="12" md="6">
                  <v-file-input
                    v-model="archivoArticulo"
                    label="Imagen del Artículo"
                    accept="image/*"
                    variant="outlined"
                    rounded="xl"
                    bg-color="white"
                    prepend-inner-icon="mdi-image-plus-outline"
                    hint="Imagen que aparece dentro del contenido del artículo"
                    persistent-hint
                    :loading="isUploading"
                    @update:model-value="previewArticulo"
                  ></v-file-input>
                  <v-img v-if="fotoArticuloPreview || form.articuloFotoUrl" :src="fotoArticuloPreview || form.articuloFotoUrl" height="120" class="mt-2 rounded-lg border-accent" contain></v-img>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.documentoUrl"
                    label="URL Documento/PDF Externo"
                    variant="outlined"
                    rounded="xl"
                    placeholder="https://ejemplo.com/recurso.pdf"
                    bg-color="white"
                    prepend-inner-icon="mdi-link-variant"
                    hint="Enlace de descarga de Google Drive, Dropbox, etc."
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.nombreDocumento"
                    label="Nombre visible del recurso"
                    variant="outlined"
                    rounded="xl"
                    placeholder="Ej: Guía de Mapeo PDF"
                    bg-color="white"
                    prepend-inner-icon="mdi-file-edit-outline"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <div class="d-flex flex-column flex-sm-row gap-4 mt-8">
            <v-btn 
              variant="outlined" 
              color="secondary" 
              size="large" 
              rounded="xl" 
              @click="internalValue = false"
              class="w-full w-sm-auto"
            >
              CANCELAR
            </v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn 
              type="submit" 
              color="primary" 
              size="large" 
              rounded="xl" 
              :loading="isSaving"
              min-width="200"
              class="w-full w-sm-auto"
            >
              <v-icon start>{{ articuloAEditar ? 'mdi-content-save-edit' : 'mdi-cloud-upload' }}</v-icon>
              {{ articuloAEditar ? 'GUARDAR CAMBIOS' : 'PUBLICAR ARTÍCULO' }}
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { useGestorArticulos, type Articulo } from '~/composables/domain/GestorArticulos'

const props = defineProps<{
  modelValue: boolean
  articuloAEditar?: Articulo | null
}>()

const emit = defineEmits(['update:modelValue', 'created', 'updated'])

const { sm } = useDisplay()
const { crearArticulo, actualizarArticulo } = useGestorArticulos()

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const formRef = ref()
const isSaving = ref(false)
const isUploading = ref(false)
const fotoPreview = ref('')
const opcionesAnio = ['1ro "U"', '2do "U"', '3ro "U"', '4to "U"', '5to "U"', 'General']

// Formulario reactivo base
const form = reactive({
  titulo: '',
  contenido: '',
  anio: '',
  fotoUrl: '',
  fotoPublicId: '',
  articuloFotoUrl: '',
  articuloFotoPublicId: '',
  documentoUrl: '',
  nombreDocumento: ''
})

// DEFINIR ESTO ANTES DEL WATCH PARA EVITAR REFERENCE ERROR
const archivoPortada = ref<File[]>([])
const archivoArticulo = ref<File[]>([])
const fotoPortadaPreview = ref('')
const fotoArticuloPreview = ref('')

// Observar cuando se pasa un artículo para editar
watch(() => props.articuloAEditar, (nuevoArticulo) => {
  if (nuevoArticulo) {
    Object.assign(form, {
      titulo: nuevoArticulo.titulo || '',
      contenido: nuevoArticulo.contenido || '',
      anio: nuevoArticulo.anio || '',
      fotoUrl: nuevoArticulo.fotoUrl || '',
      fotoPublicId: nuevoArticulo.fotoPublicId || '',
      articuloFotoUrl: nuevoArticulo.articuloFotoUrl || '',
      articuloFotoPublicId: nuevoArticulo.articuloFotoPublicId || '',
      documentoUrl: nuevoArticulo.documentoUrl || '',
      nombreDocumento: nuevoArticulo.nombreDocumento || ''
    })
    fotoPortadaPreview.value = ''
    fotoArticuloPreview.value = ''
  } else {
    Object.assign(form, {
      titulo: '',
      contenido: '',
      anio: '',
      fotoUrl: '',
      fotoPublicId: '',
      articuloFotoUrl: '',
      articuloFotoPublicId: '',
      documentoUrl: '',
      nombreDocumento: ''
    })
    fotoPortadaPreview.value = ''
    fotoArticuloPreview.value = ''
    archivoPortada.value = []
    archivoArticulo.value = []
  }
}, { immediate: true })

const previewPortada = () => {
  if (archivoPortada.value?.[0]) {
    fotoPortadaPreview.value = URL.createObjectURL(archivoPortada.value[0])
  } else {
    fotoPortadaPreview.value = ''
  }
}

const previewArticulo = () => {
  if (archivoArticulo.value?.[0]) {
    fotoArticuloPreview.value = URL.createObjectURL(archivoArticulo.value[0])
  } else {
    fotoArticuloPreview.value = ''
  }
}

const subirACloudinary = async (file: File) => {
  const cloudName = 'dku13l2ep' 
  const uploadPreset = 'hidroblio'

  isUploading.value = true
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    if (data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id
      }
    }
    return null
  } catch (error) {
    console.error('Error al subir a Cloudinary:', error)
    return null
  } finally {
    isUploading.value = false
  }
}

const guardar = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  isSaving.value = true
  
  try {
    // Subir portada si hay una nueva
    const filePortada = Array.isArray(archivoPortada.value) ? archivoPortada.value[0] : (archivoPortada.value as any);
    if (filePortada && filePortada instanceof File) {
      const res = await subirACloudinary(filePortada)
      if (res) {
        form.fotoUrl = res.url
        form.fotoPublicId = res.publicId
      }
    }

    // Subir imagen de artículo si hay una nueva
    const fileArticulo = Array.isArray(archivoArticulo.value) ? archivoArticulo.value[0] : (archivoArticulo.value as any);
    if (fileArticulo && fileArticulo instanceof File) {
      const res = await subirACloudinary(fileArticulo)
      if (res) {
        form.articuloFotoUrl = res.url
        form.articuloFotoPublicId = res.publicId
      }
    }

    if (props.articuloAEditar?.id) {
      await actualizarArticulo({
        id: props.articuloAEditar.id,
        ...form
      })
      emit('updated')
      alert('¡Recurso actualizado con éxito!')
    } else {
      await crearArticulo({ ...form })
      emit('created')
      alert('¡Nuevo recurso académico publicado!')
    }
    
    internalValue.value = false
  } catch (error) {
    console.error('Error al guardar artículo:', error)
    alert('Error al realizar la operación. Revisa la consola.')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}

.letter-spacing-1 {
  letter-spacing: 1.2px !important;
}

.uppercase {
  text-transform: uppercase;
}

.gap-4 {
  gap: 16px;
}

.w-full {
  width: 100%;
}

@media (min-width: 600px) {
  .w-sm-auto {
    width: auto !important;
  }
}
</style>
