<template>
  <div>
    <h1 class="text-h3 font-weight-bold text-primary mb-4 font-display">Mi Perfil</h1>
    <p class="text-secondary opacity-70 mb-8">
      Gestiona tus credenciales académicas y configuración.
    </p>

    <v-card class="pa-8 rounded-xl elevation-1 border-accent mb-6" color="white">
      <div class="d-flex flex-column flex-md-row align-center">
        <v-avatar size="100" class="mb-4 mb-md-0 mr-md-8 bg-accent">
          <v-img src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"></v-img>
        </v-avatar>
        
        <div class="flex-grow-1 text-center text-md-left">
          <h2 class="text-h4 font-weight-bold text-primary mb-1">{{ store.profile.name }}</h2>
          <p class="text-subtitle-1 text-secondary mb-4">Nivel {{ store.profile.level }} • {{ store.levelTitle }}</p>
          <v-chip color="primary" variant="outlined" class="font-weight-bold">
            AÑO {{ store.profile.year }} - SECCIÓN {{ store.profile.section }}
          </v-chip>
        </div>
        
        <div class="mt-6 mt-md-0">
          <v-btn color="secondary" variant="flat" prepend-icon="mdi-pencil">Editar Perfil</v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
const store = useStudentStore()
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}
.border-accent {
  border: 1px solid rgba(199, 183, 163, 0.3);
}
</style>
