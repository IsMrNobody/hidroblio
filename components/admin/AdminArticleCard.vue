<!-- components/admin/AdminArticleCard.vue -->
<template>
  <v-card class="admin-article-card rounded-xl elevation-2 overflow-hidden position-relative">
    <v-img 
      :src="articulo.fotoUrl || '/images/hero.png'" 
      height="220" 
      cover 
      class="align-end"
    >
      <div class="card-gradient"></div>
      <div class="pa-4 position-relative z-1">
        <v-chip color="secondary" size="x-small" label class="font-weight-black mb-1 uppercase">{{ articulo.anio }}</v-chip>
        <h3 class="text-h6 font-weight-bold text-white line-clamp-2 leading-tight">{{ articulo.titulo }}</h3>
      </div>
    </v-img>

    <v-card-text class="py-4">
      <p class="text-body-2 text-secondary opacity-70 line-clamp-3 mb-4">{{ articulo.contenido }}</p>
      <div v-if="articulo.documentoUrl" class="document-badge d-flex align-center pa-2 rounded-lg bg-background-dark mb-4">
        <v-icon color="primary" size="20" class="mr-2">mdi-file-pdf-box</v-icon>
        <span class="text-caption font-weight-bold text-truncate">{{ articulo.nombreDocumento || 'Documento adjunto' }}</span>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="pa-4">
      <v-btn 
        color="error" 
        variant="text" 
        rounded="lg" 
        prepend-icon="mdi-delete-outline" 
        @click="$emit('delete', articulo)"
      >
        
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn 
        color="secondary" 
        variant="tonal" 
        rounded="lg" 
        prepend-icon="mdi-pencil-outline" 
        @click="$emit('edit', articulo)"
      >
        Editar
      </v-btn>
      <v-btn 
        color="primary" 
        variant="tonal" 
        rounded="lg" 
        class="ml-2"
        prepend-icon="mdi-eye-outline" 
        :to="`/articulos/${articulo.id}`"
      >
        Ver
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Articulo } from '~/composables/domain/GestorArticulos'

defineProps<{
  articulo: Articulo
}>()

defineEmits(['delete', 'edit'])
</script>

<style scoped>
.admin-article-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--v-theme-accent), 0.1) !important;
}

.admin-article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1) !important;
  border-color: rgba(var(--v-theme-primary), 0.3) !important;
}

.card-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(86, 28, 36, 0) 40%, rgba(86, 28, 36, 0.8) 100%);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.uppercase {
  text-transform: uppercase;
}

.bg-background-dark {
  background-color: rgba(199, 183, 163, 0.15);
}

.leading-tight {
  line-height: 1.2 !important;
}
</style>
