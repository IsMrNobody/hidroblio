<!-- pages/biblioteca.vue -->
<template>
  <v-fade-transition hide-on-leave>
    <!-- Estado de Carga -->
    <div v-if="authStore.cargando" class="loading-state d-flex flex-column align-center justify-center py-12">
      <div class="academic-spinner mb-6">
        <v-icon size="84" color="primary" class="pulsating-icon">mdi-book-open-page-variant-outline</v-icon>
      </div>
      <h2 class="text-h4 font-serif text-primary mb-2">Preparando tu estantería...</h2>
      <p class="text-subtitle-1 text-secondary opacity-70">Consultando los archivos de HidroBiblio</p>
    </div>

    <!-- Contenido Principal -->
    <div v-else class="dashboard-page">
      <DigitalLibraryHeader />
      <DigitalLibraryRecentlyAdded />
      <DigitalLibraryCollections />
    </div>
  </v-fade-transition>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})
</script>

<style scoped>
.loading-state {
  min-height: 50vh;
}

.font-serif {
  font-family: 'Playfair Display', serif !important;
}

.pulsating-icon {
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.6; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
