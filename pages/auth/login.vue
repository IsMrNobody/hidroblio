<!-- pages/auth/login.vue -->
<template>
  <div id="login-page">
    <!-- Header -->
    <div class="text-center text-md-left mb-8">
      <h2 class="text-h4 font-weight-black text-primary font-display mb-2">Bienvenido de vuelta</h2>
      <p class="text-body-2 text-secondary opacity-70">Inicia sesión para continuar tu investigación.</p>
    </div>

    <!-- Error Alert -->
    <v-alert
      v-if="authStore.errorAuth"
      type="error"
      variant="tonal"
      rounded="xl"
      closable
      class="mb-6"
      @click:close="authStore.limpiarError()"
    >
      {{ authStore.errorAuth }}
    </v-alert>

    <!-- Login Form -->
    <v-form @submit.prevent="handleLogin" ref="formRef">
      <v-text-field
        id="login-email"
        v-model="email"
        label="Correo electrónico"
        type="email"
        prepend-inner-icon="mdi-email-outline"
        :rules="[reglas.requerido, reglas.email]"
        class="mb-2"
        rounded="xl"
        bg-color="background"
      ></v-text-field>

      <v-text-field
        id="login-password"
        v-model="password"
        :label="'Contraseña'"
        :type="mostrarPassword ? 'text' : 'password'"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="mostrarPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="mostrarPassword = !mostrarPassword"
        :rules="[reglas.requerido]"
        class="mb-2"
        rounded="xl"
        bg-color="background"
      ></v-text-field>

      <v-btn
        id="login-submit"
        type="submit"
        block
        color="primary"
        size="x-large"
        rounded="xl"
        :loading="cargando"
        class="mb-4 font-weight-black letter-spacing-1 login-btn"
        elevation="0"
      >
        <v-icon start>mdi-login</v-icon>
        INICIAR SESIÓN
      </v-btn>
    </v-form>

    <!-- Divider -->
    <div class="d-flex align-center my-5">
      <v-divider class="flex-grow-1"></v-divider>
      <span class="mx-4 text-caption text-secondary opacity-50 font-weight-bold">O CONTINÚA CON</span>
      <v-divider class="flex-grow-1"></v-divider>
    </div>

    <!-- Google Sign In -->
    <v-btn
      id="login-google"
      block
      variant="outlined"
      color="secondary"
      size="large"
      rounded="xl"
      class="mb-6 font-weight-bold google-btn"
      @click="handleGoogleLogin"
      :loading="cargandoGoogle"
    >
      <v-icon start size="20">mdi-google</v-icon>
      Continuar con Google
    </v-btn>

    <!-- Register Link -->
    <div class="text-center mt-4">
      <span class="text-body-2 text-secondary opacity-70">¿No tienes cuenta?</span>
      <NuxtLink to="/auth/register" class="ml-1 text-body-2 font-weight-bold text-primary link-register">
        Regístrate aquí
      </NuxtLink>
    </div>
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
const { iniciarSesion, iniciarSesionConGoogle } = useAutenticadorInvestigador()

const formRef = ref()
const email = ref('')
const password = ref('')
const mostrarPassword = ref(false)
const cargando = ref(false)
const cargandoGoogle = ref(false)

const reglas = {
  requerido: (v: string) => !!v || 'Este campo es requerido',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Correo electrónico no válido',
}

const handleLogin = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  cargando.value = true
  try {
    await iniciarSesion(email.value, password.value)
    navigateTo('/biblioteca')
  } catch {
    // Error ya manejado en el composable
  } finally {
    cargando.value = false
  }
}

const handleGoogleLogin = async () => {
  cargandoGoogle.value = true
  try {
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

.login-btn {
  height: 56px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.login-btn:hover {
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

.link-register {
  text-decoration: none;
  transition: color 0.2s ease;
}

.link-register:hover {
  color: #6D2932 !important;
  text-decoration: underline;
}
</style>
