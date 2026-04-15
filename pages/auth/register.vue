<!-- pages/auth/register.vue -->
<template>
  <div id="register-page">
    <v-fade-transition hide-on-leave>
      <div :key="step">
        <!-- Header -->
        <div class="text-center text-md-left mb-6">
          <h2 class="text-h4 font-weight-black text-primary font-display mb-2">
            {{ step === 1 ? 'Crear cuenta' : 'Información Académica' }}
          </h2>
          <p class="text-body-2 text-secondary opacity-70">
            {{ step === 1 ? 'Únete a la comunidad de investigadores de HidroBiblio.' : 'Personaliza tu perfil de investigador.' }}
          </p>
        </div>

        <!-- Error Alert -->
        <v-alert
          v-if="authStore.errorAuth"
          type="error"
          variant="tonal"
          rounded="xl"
          closable
          class="mb-4"
          @click:close="authStore.limpiarError()"
        >
          {{ authStore.errorAuth }}
        </v-alert>

        <!-- Register Form -->
        <v-form @submit.prevent="handleSubmit" ref="formRef">
          <!-- Paso 1: Datos de Usuario -->
          <div v-if="step === 1">
            <v-text-field
              id="register-name"
              v-model="nombre"
              label="Nombre completo"
              prepend-inner-icon="mdi-account-outline"
              :rules="[reglas.requerido, reglas.minLength]"
              class="mb-1"
              rounded="xl"
              bg-color="background"
            ></v-text-field>

            <v-text-field
              id="register-email"
              v-model="email"
              label="Correo electrónico"
              type="email"
              prepend-inner-icon="mdi-email-outline"
              :rules="[reglas.requerido, reglas.email]"
              class="mb-1"
              rounded="xl"
              bg-color="background"
            ></v-text-field>

            <v-text-field
              id="register-password"
              v-model="password"
              label="Contraseña"
              :type="mostrarPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="mostrarPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="mostrarPassword = !mostrarPassword"
              :rules="[reglas.requerido, reglas.passwordMinLength]"
              class="mb-1"
              rounded="xl"
              bg-color="background"
            ></v-text-field>

            <v-text-field
              id="register-password-confirm"
              v-model="passwordConfirm"
              label="Confirmar contraseña"
              :type="mostrarPasswordConfirm ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-check-outline"
              :append-inner-icon="mostrarPasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="mostrarPasswordConfirm = !mostrarPasswordConfirm"
              :rules="[reglas.requerido, reglas.passwordsCoinciden]"
              class="mb-6"
              rounded="xl"
              bg-color="background"
            ></v-text-field>

            <v-btn
              block
              color="primary"
              size="x-large"
              rounded="xl"
              class="mb-4 font-weight-black letter-spacing-1 register-btn"
              @click="irAStep2"
            >
              CONTINUAR
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </div>

          <!-- Paso 2: Datos Académicos -->
          <div v-else>
            <v-select
              id="register-year"
              v-model="anio"
              label="Año / Grado"
              :items="opcionesAnio"
              prepend-inner-icon="mdi-school-outline"
              :rules="[reglas.requerido]"
              class="mb-1"
              rounded="xl"
              bg-color="background"
            ></v-select>

            <v-select
              id="register-section"
              v-model="seccion"
              label="Sección"
              :items="opcionesSeccion"
              prepend-inner-icon="mdi-door-open"
              :rules="[reglas.requerido]"
              class="mb-8"
              rounded="xl"
              bg-color="background"
            ></v-select>

            <v-btn
              id="register-submit"
              type="submit"
              block
              color="primary"
              size="x-large"
              rounded="xl"
              :loading="cargando"
              class="mb-4 font-weight-black letter-spacing-1 register-btn"
            >
              FINALIZAR REGISTRO
              <v-icon end>mdi-check-circle</v-icon>
            </v-btn>

            <v-btn
              block
              variant="text"
              color="secondary"
              rounded="xl"
              @click="step = 1"
              :disabled="cargando"
            >
              ATRÁS
            </v-btn>
          </div>
        </v-form>

        <!-- Only show on Step 1 -->
        <div v-if="step === 1">
          <!-- Divider -->
          <div class="d-flex align-center my-4">
            <v-divider class="flex-grow-1"></v-divider>
            <span class="mx-4 text-caption text-secondary opacity-50 font-weight-bold">O REGÍSTRATE CON</span>
            <v-divider class="flex-grow-1"></v-divider>
          </div>

          <!-- Google Sign Up -->
          <v-btn
            id="register-google"
            block
            variant="outlined"
            color="secondary"
            size="large"
            rounded="xl"
            class="mb-4 font-weight-bold google-btn"
            @click="handleGoogleRegister"
            :loading="cargandoGoogle"
          >
            <v-icon start size="20">mdi-google</v-icon>
            Registrarse con Google
          </v-btn>

          <!-- Login Link -->
          <div class="text-center mt-2">
            <span class="text-body-2 text-secondary opacity-70">¿Ya tienes cuenta?</span>
            <NuxtLink to="/auth/login" class="ml-1 text-body-2 font-weight-bold text-primary link-login">
              Inicia sesión
            </NuxtLink>
          </div>
        </div>
      </div>
    </v-fade-transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useAutenticadorInvestigador } from '~/composables/domain/AutenticadorInvestigador'

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})

const authStore = useAuthStore()
const { registrar, iniciarSesionConGoogle } = useAutenticadorInvestigador()

const formRef = ref()
const step = ref(1)

// Datos Formulario
const nombre = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const anio = ref('')
const seccion = ref('')

const mostrarPassword = ref(false)
const mostrarPasswordConfirm = ref(false)
const cargando = ref(false)
const cargandoGoogle = ref(false)

const opcionesAnio = ['1ro "U"', '2do "U"', '3ro "U"', '4to "U"', '5to "U"']
const opcionesSeccion = ['A', 'B', 'C', 'U']

const reglas = {
  requerido: (v: string) => !!v || 'Este campo es requerido',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Correo electrónico no válido',
  minLength: (v: string) => v.length >= 2 || 'Mínimo 2 caracteres',
  passwordMinLength: (v: string) => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
  passwordsCoinciden: (v: string) => v === password.value || 'Las contraseñas no coinciden',
}

const irAStep2 = async () => {
  const { valid } = await formRef.value.validate()
  if (valid) {
    step.value = 2
  }
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  cargando.value = true
  try {
    await registrar(email.value, password.value, nombre.value, anio.value, seccion.value)
    navigateTo('/biblioteca')
  } catch {
    // Error ya manejado en el composable
  } finally {
    cargando.value = false
  }
}

const handleGoogleRegister = async () => {
  cargandoGoogle.value = true
  try {
    // Nota: El registro con Google por ahora usa valores por defecto para año/sección
    // Podría añadirse un diálogo post-google-auth si se requiere.
    await iniciarSesionConGoogle()
    navigateTo('/biblioteca')
  } catch {
    // Error ya manejado en el composable
  } finally {
    cargandoGoogle.value = false
  }
}
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}

.letter-spacing-1 {
  letter-spacing: 1.5px !important;
}

.register-btn {
  height: 56px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.register-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(86, 28, 36, 0.25) !important;
}

.google-btn {
  height: 52px !important;
  border-width: 1.5px;
  transition: all 0.3s ease;
}

.google-btn:hover {
  background-color: rgba(109, 41, 50, 0.04);
}

.link-login {
  text-decoration: none;
  transition: color 0.2s ease;
}

.link-login:hover {
  color: #6D2932 !important;
  text-decoration: underline;
}
</style>
