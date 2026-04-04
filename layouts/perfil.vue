<!-- layouts/default.vue -->
<template>
  <v-app class="bg-background">
    <!-- Barra de Navegación Superior -->
    <v-app-bar color="primary" elevation="2" density="comfortable">
      <template v-slot:prepend>
        <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" class="d-md-none"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title class="font-weight-bold text-h5 ml-2" style="font-family: 'Playfair Display', serif !important;">
        HidroBiblio2
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-magnify" color="accent" variant="text"></v-btn>
      <v-btn icon="mdi-bell-outline" color="accent" variant="text">
        <v-badge color="error" dot>
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon="mdi-logout" color="white" variant="text" @click="handleLogout"></v-btn>
    </v-app-bar>

    <!-- Panel Lateral (Perfil del Estudiante) -->
    <!-- En Desktop es fijo (permanent), en Mobile es temporal -->
    <v-navigation-drawer
      v-model="drawer"
      :permanent="mdAndUp"
      width="320"
      color="surface"
      elevation="1"
      border="e-0"
      class="bg-surface py-4 px-2"
    >
      <StudentProfile />
    </v-navigation-drawer>

    <!-- Contenido Principal -->
    <v-main class="bg-background fill-height position-relative">
      <v-container fluid class="pa-6 fill-height align-start">
        <slot />
      </v-container>
      
      <!-- Fondo decorativo sutil (Opcional, estilo 'papel') -->
      <div class="background-texture"></div> 
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useAutenticadorInvestigador } from '~/composables/domain/AutenticadorInvestigador'

const { mdAndUp } = useDisplay()
const drawer = ref(true)
const { cerrarSesion } = useAutenticadorInvestigador()

const handleLogout = async () => {
  await cerrarSesion()
  navigateTo('/auth/login')
}
</script>

<style scoped>
.bg-background {
  background-color: rgb(var(--v-theme-background));
}

.background-texture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(#6d2932 0.5px, transparent 0.5px);
  background-size: 20px 20px;
  opacity: 0.03; /* Textura de puntos muy sutil */
  pointer-events: none;
  z-index: 0;
}
</style>
