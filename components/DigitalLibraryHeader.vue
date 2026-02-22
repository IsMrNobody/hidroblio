<!-- components/DigitalLibraryHeader.vue -->
<template>
  <div class="mb-12">
    <h1 :class="['font-weight-bold text-primary font-display mb-2', mobile ? 'text-h4' : 'text-h2']">Mi Biblioteca Digital</h1>
    <p class="text-h6 text-secondary italic opacity-80">
      Una selección curada de documentos para tu dominio académico.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}
.italic {
  font-style: italic;
}
</style>
