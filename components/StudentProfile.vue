<!-- components/StudentProfile.vue -->
<template>
  <div class="sidebar-content d-flex flex-column fill-height pa-6">
    <!-- Brand Logo -->
    <div class="d-flex align-center mb-10">
      <v-avatar color="white" rounded="lg" size="44" class="mr-3 elevation-2">
        <v-icon color="primary" size="24">mdi-book-open-variant</v-icon>
      </v-avatar>
      <span class="text-h6 font-weight-black text-white letter-spacing-1 font-display">HIDROBIBLIO</span>
    </div>

    <!-- Student Info -->
    <v-card 
      class="profile-section d-flex align-center pa-4 rounded-xl mb-8 cursor-pointer" 
      to="/profile"
      variant="text"
      :ripple="false"
    >
      <v-avatar size="48" class="mr-4 bg-accent">
        <v-img src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"></v-img>
      </v-avatar>
      <div class="overflow-hidden text-left">
        <h3 class="text-subtitle-1 font-weight-bold text-white mb-0 text-truncate">{{ store.profile.name }}</h3>
        <p class="text-caption text-accent-light opacity-70 mb-0 font-weight-bold uppercase">
          {{ store.profile.year }} - SECTION {{ store.profile.section }}
        </p>
      </div>
    </v-card>

    <!-- Gamification: Level -->
    <div class="level-section mb-10 px-2">
      <div class="d-flex justify-space-between align-center mb-2">
        <span class="text-caption font-weight-black text-white letter-spacing-1">LEVEL {{ store.profile.level }}</span>
        <span class="text-caption text-accent-light opacity-60">{{ store.progressPercent }}% to Level {{ store.profile.level + 1 }}</span>
      </div>
      <v-progress-linear
        :model-value="store.progressPercent"
        color="accent"
        height="10"
        rounded
        class="custom-progress"
      ></v-progress-linear>
    </div>

    <!-- Main Navigation -->
    <v-list bg-color="transparent" class="nav-list flex-grow-1" density="comfortable">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        rounded="xl"
        class="mb-4 nav-item"
        active-class="nav-item-active"
        :active="false" 
      >
        <!-- Forzamos active=false nativo para manejar el estilo manualmente o usamos active-class de router -->
        <template v-slot:prepend>
          <v-icon :color="isActive(item.to) ? 'white' : 'accent'" class="mr-4">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title class="text-body-2 font-weight-bold" :class="isActive(item.to) ? 'text-white' : 'text-accent-light'">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- Bottom Action: Search -->
    <v-btn
      block
      height="56"
      color="accent"
      variant="flat"
      rounded="xl"
      class="search-btn font-weight-black text-primary letter-spacing-1 mt-auto"
      prepend-icon="mdi-magnify"
    >
      BUSCAR EN EL ARCHIVO
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
import { useRoute } from 'vue-router/auto'

const store = useStudentStore()
const route = useRoute()

// Mapeo simple para activar el item del menú basado en la ruta actual
const isActive = (path: string) => route.path === path

const menuItems = [
  { title: 'Biblioteca Personal', icon: 'mdi-book-open-outline', value: 'library', to: '/' },
  { title: 'Salón Académico', icon: 'mdi-school-outline', value: 'hall', to: '/hall' },
  { title: 'Notas de Investigación', icon: 'mdi-notebook-edit-outline', value: 'notes', to: '/notes' },
  //{ title: 'Marcadores', icon: 'mdi-bookmark-outline', value: 'bookmarks', to: '/bookmarks' },
]
</script>

<style scoped>
.sidebar-content {
  height: 100%;
}

.font-display {
  font-family: 'Playfair Display', serif !important;
}

.profile-section {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(199, 183, 163, 0.1);
}

.text-accent-light {
  color: #C7B7A3;
}

.custom-progress :deep(.v-progress-linear__background) {
  opacity: 0.1 !important;
  background-color: white !important;
}

.nav-item {
  color: #C7B7A3 !important;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.nav-item:hover {
  opacity: 1;
  background-color: rgba(199, 183, 163, 0.05);
}

.nav-item-active {
  background-color: rgba(199, 183, 163, 0.15) !important;
  opacity: 1 !important;
  color: white !important;
}

.nav-item-active :deep(.v-list-item__overlay) {
  opacity: 0 !important;
}

.search-btn {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.letter-spacing-1 {
  letter-spacing: 1.5px !important;
}

.uppercase {
  text-transform: uppercase;
}
</style>
