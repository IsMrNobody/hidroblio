<template>
  <div>
    <h1 class="text-h3 font-weight-bold text-primary mb-4 font-display">Mi Perfil</h1>
    <p class="text-secondary opacity-70 mb-8">
      Gestiona tus credenciales académicas y configuración.
    </p>

    <!-- Perfil Card -->
    <v-card class="pa-8 rounded-xl elevation-1 border-accent mb-6" color="white">
      <div class="d-flex flex-column flex-md-row align-center">
        <v-avatar size="100" class="mb-4 mb-md-0 mr-md-8 bg-accent">
          <v-img 
            v-if="authStore.usuario?.photoURL" 
            :src="authStore.usuario.photoURL"
          ></v-img>
          <span v-else class="text-h3 font-weight-bold text-primary">{{ authStore.iniciales }}</span>
        </v-avatar>
        
        <div class="flex-grow-1 text-center text-md-left">
          <h2 class="text-h4 font-weight-bold text-primary mb-1">{{ authStore.nombreMostrar }}</h2>
          <p class="text-subtitle-1 text-secondary mb-1">{{ authStore.usuario?.email }}</p>
          <p class="text-subtitle-2 text-secondary mb-4 opacity-60">
            Nivel {{ store.profile.level }} • {{ store.levelTitle }}
          </p>
          <v-chip color="primary" variant="outlined" class="font-weight-bold">
            AÑO {{ store.profile.year }} - SECCIÓN {{ store.profile.section }}
          </v-chip>
        </div>
        
        <div class="mt-6 mt-md-0">
          <v-btn 
            color="secondary" 
            variant="flat" 
            prepend-icon="mdi-pencil" 
            @click="mostrarEditar = !mostrarEditar"
          >
            {{ mostrarEditar ? 'Cancelar' : 'Editar Perfil' }}
          </v-btn>
        </div>
      </div>
    </v-card>

    <!-- Formulario de edición -->
    <v-expand-transition>
      <v-card v-show="mostrarEditar" class="pa-8 rounded-xl elevation-1 border-accent mb-6" color="white">
        <h3 class="text-h6 font-weight-bold text-primary mb-4 font-display">Editar Información</h3>
        
        <v-form @submit.prevent="guardarCambios" ref="formRef">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.name"
                label="Nombre"
                prepend-inner-icon="mdi-account-outline"
                :rules="[v => !!v || 'El nombre es requerido']"
                rounded="xl"
                bg-color="background"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="formData.year"
                :items="opcionesAnio"
                label="Año"
                prepend-inner-icon="mdi-school-outline"
                rounded="xl"
                bg-color="background"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="formData.section"
                :items="['A', 'B', 'C', 'D']"
                label="Sección"
                prepend-inner-icon="mdi-account-group-outline"
                rounded="xl"
                bg-color="background"
              ></v-select>
            </v-col>
          </v-row>
          
          <div class="d-flex justify-end mt-2">
            <v-btn
              type="submit"
              color="primary"
              variant="flat"
              prepend-icon="mdi-content-save"
              :loading="guardando"
              rounded="xl"
            >
              Guardar cambios
            </v-btn>
          </div>
        </v-form>

        <v-divider class="my-8"></v-divider>

        <h3 class="text-h6 font-weight-bold text-primary mb-4 font-display">Seguridad</h3>
        <p class="text-caption text-secondary mb-4">Actualiza tu contraseña para mantener tu cuenta académica protegida.</p>
        
        <v-form @submit.prevent="handleCambiarPassword" ref="passwordFormRef">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="newPassword"
                label="Nueva contraseña"
                :type="mostrarPass ? 'text' : 'password'"
                :append-inner-icon="mostrarPass ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="mostrarPass = !mostrarPass"
                prepend-inner-icon="mdi-lock-outline"
                :rules="[v => !!v || 'Requerido', v => v.length >= 6 || 'Mínimo 6 caracteres']"
                rounded="xl"
                bg-color="background"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="confirmPassword"
                label="Confirmar contraseña"
                :type="mostrarPassConfirm ? 'text' : 'password'"
                :append-inner-icon="mostrarPassConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="mostrarPassConfirm = !mostrarPassConfirm"
                prepend-inner-icon="mdi-lock-check-outline"
                :rules="[v => !!v || 'Requerido', v => v === newPassword || 'Las contraseñas no coinciden']"
                rounded="xl"
                bg-color="background"
              ></v-text-field>
            </v-col>
          </v-row>
          
          <v-alert
            v-if="statusMsg"
            :type="statusType"
            variant="tonal"
            class="mb-4 rounded-xl"
            closable
            @click:close="statusMsg = ''"
          >
            {{ statusMsg }}
          </v-alert>

          <div class="d-flex justify-end mt-2">
            <v-btn
              type="submit"
              color="secondary"
              variant="flat"
              prepend-icon="mdi-shield-check-outline"
              :loading="cambiandoPass"
              rounded="xl"
            >
              Actualizar contraseña
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-expand-transition>

    <!-- Estadísticas -->
    <v-card class="pa-6 rounded-xl elevation-1 border-accent" color="white">
      <h3 class="text-h6 font-weight-bold text-primary mb-4 font-display">Estadísticas</h3>
      <v-row>
        <v-col cols="6" md="3">
          <div class="text-center">
            <p class="text-h4 font-weight-black text-primary mb-1">{{ store.profile.level }}</p>
            <p class="text-caption text-secondary font-weight-bold uppercase">Nivel</p>
          </div>
        </v-col>
        <v-col cols="6" md="3">
          <div class="text-center">
            <p class="text-h4 font-weight-black text-primary mb-1">{{ store.profile.xp }}</p>
            <p class="text-caption text-secondary font-weight-bold uppercase">XP</p>
          </div>
        </v-col>
        <v-col cols="6" md="3">
          <div class="text-center">
            <p class="text-h4 font-weight-black text-primary mb-1">{{ store.unlockedResources.length }}</p>
            <p class="text-caption text-secondary font-weight-bold uppercase">Recursos</p>
          </div>
        </v-col>
        <v-col cols="6" md="3">
          <div class="text-center">
            <p class="text-h4 font-weight-black text-primary mb-1">{{ store.levelTitle }}</p>
            <p class="text-caption text-secondary font-weight-bold uppercase">Rango</p>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStudentStore } from '@/stores/student'
import { useAuthStore } from '@/stores/auth'
import { useGestorDatosEstudiante } from '~/composables/domain/GestorDatosEstudiante'
import { useAutenticadorInvestigador } from '~/composables/domain/AutenticadorInvestigador'

const store = useStudentStore()
const authStore = useAuthStore()
const { guardarPerfil } = useGestorDatosEstudiante()
const { cambiarPassword } = useAutenticadorInvestigador()

const formRef = ref()
const passwordFormRef = ref()
const mostrarEditar = ref(false)
const guardando = ref(false)

// Password state
const cambiandoPass = ref(false)
const newPassword = ref('')
const confirmPassword = ref('')
const mostrarPass = ref(false)
const mostrarPassConfirm = ref(false)
const statusMsg = ref('')
const statusType = ref<'success' | 'error'>('success')

const formData = reactive({
  name: store.profile.name,
  year: store.profile.year,
  section: store.profile.section,
})

const opcionesAnio = ['1ro "U"', '2do "U"', '3ro "U"', '4to "U"', '5to "U"']

const guardarCambios = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  guardando.value = true
  try {
    store.updateProfile(formData)
    if (authStore.usuario?.uid) {
      await guardarPerfil(authStore.usuario.uid)
    }
    mostrarEditar.value = false
  } catch (error) {
    console.error('Error guardando perfil:', error)
  } finally {
    guardando.value = false
  }
}

const handleCambiarPassword = async () => {
  const { valid } = await passwordFormRef.value.validate()
  if (!valid) return

  cambiandoPass.value = true
  statusMsg.value = ''
  
  try {
    await cambiarPassword(newPassword.value)
    statusMsg.value = '¡Contraseña actualizada con éxito!'
    statusType.value = 'success'
    newPassword.value = ''
    confirmPassword.value = ''
    passwordFormRef.value.reset()
  } catch (error: any) {
    statusMsg.value = error.message || 'Error al cambiar la contraseña. Es posible que debas iniciar sesión de nuevo.'
    statusType.value = 'error'
  } finally {
    cambiandoPass.value = false
  }
}
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}
.border-accent {
  border: 1px solid rgba(199, 183, 163, 0.3);
}
.uppercase {
  text-transform: uppercase;
}
</style>

