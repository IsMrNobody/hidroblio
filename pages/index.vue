<!-- pages/index.vue -->
<template>
  <div class="dashboard-page">
    <DigitalLibraryHeader />
    <DigitalLibraryRecentlyAdded />
    <DigitalLibraryCollections />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
