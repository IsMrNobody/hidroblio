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
          NUEVO ARTÍCULO ACADÉMICO
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
                    v-model="archivoFoto"
                    label="Subir Imagen a Cloudinary"
                    accept="image/*"
                    variant="outlined"
                    rounded="xl"
                    bg-color="white"
                    prepend-inner-icon="mdi-camera-plus-outline"
                    hint="La imagen se subirá automáticamente a tu cuenta de Cloudinary"
                    persistent-hint
                    :loading="isUploading"
                    @update:model-value="previewImage"
                  ></v-file-input>
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
                <v-col cols="12">
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

              <!-- Vista previa opcional -->
              <v-img v-if="fotoPreview" :src="fotoPreview" height="150" class="mt-4 rounded-lg border-accent" contain></v-img>
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
              <v-icon start>mdi-cloud-upload</v-icon>
              PUBLICAR ARTÍCULO
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useGestorArticulos } from '~/composables/domain/GestorArticulos'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'created'])

const { sm } = useDisplay()
const { crearArticulo } = useGestorArticulos()

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const formRef = ref()
const isSaving = ref(false)
const isUploading = ref(false)
const fotoPreview = ref('')
const options = ['1ro "U"', '2do "U"', '3ro "U"', '4to "U"', '5to "U"']
const opcionesAnio = options

const form = reactive({
  titulo: '',
  contenido: '',
  anio: '',
  fotoUrl: '',
  documentoUrl: '',
  nombreDocumento: ''
})

const archivoFoto = ref<File[]>([])

const previewImage = () => {
  if (archivoFoto.value?.[0]) {
    fotoPreview.value = URL.createObjectURL(archivoFoto.value[0])
  } else {
    fotoPreview.value = ''
  }
}

const subirACloudinary = async (file: File) => {
  // CONFIGURAR ESTOS VALORES
  const cloudName = 'dku13l2ep' 
  const uploadPreset = 'hidroblio' // Asegúrate de que sea 'Unsigned' en Cloudinary

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
      return data.secure_url
    }
    throw new Error('No se recibió la URL de Cloudinary')
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
    // Detectar el archivo correctamente (ya sea array o archivo único por Vuetify)
    const file = Array.isArray(archivoFoto.value) ? archivoFoto.value[0] : (archivoFoto.value as unknown as File);

    if (file) {
      console.log('Iniciando subida a Cloudinary del archivo:', file.name);
      const url = await subirACloudinary(file)
      if (url) {
        form.fotoUrl = url
        console.log('✅ URL de Cloudinary obtenida con éxito:', url);
      } else {
        console.error('❌ No se pudo obtener la URL de Cloudinary, se usará la imagen por defecto.');
      }
    } else {
      console.warn('⚠️ No se seleccionó ninguna foto para subir.');
    }

    console.log('Publicando artículo en Firestore...', { ...form });
    await crearArticulo({ ...form })
    
    // Reset
    Object.assign(form, { 
      titulo: '', 
      contenido: '', 
      anio: '',
      fotoUrl: '',
      documentoUrl: '',
      nombreDocumento: ''
    })
    archivoFoto.value = []
    fotoPreview.value = ''
    
    emit('created')
    internalValue.value = false
    alert('¡Artículo académico publicado con éxito!')
  } catch (error) {
    console.error('Error crítico en el proceso de guardado:', error)
    alert('Hubo un error al publicar el artículo. Por favor, revisa la consola.')
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
