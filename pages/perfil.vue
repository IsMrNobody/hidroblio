<template>
  <ClientOnly>
    <v-container fluid class="pa-6">
      <div class="mb-8">
        <h1 class="text-h3 font-weight-bold text-primary font-display mb-2">Mi Biblioteca</h1>
        <p class="text-subtitle-1 text-secondary opacity-70">Gestiona tus avances y recursos guardados.</p>
      </div>
      
      <YearCatalog />
    </v-container>
  </ClientOnly>
</template>

<script setup lang="ts">
// Page meta para usar el layout default con sidebar
definePageMeta({
  layout: 'default',
  middleware: ['auth']
})
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}
</style>
