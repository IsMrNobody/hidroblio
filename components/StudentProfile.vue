<!-- components/StudentProfile.vue -->
<template>
  <div class="sidebar-content d-flex flex-column fill-height pa-6">
    <!-- Brand Logo -->
    <NuxtLink to="/" class="d-flex align-center mb-10 text-decoration-none brand-link">
      <v-avatar color="white" rounded="lg" size="44" class="mr-3 elevation-2">
        <v-icon color="primary" size="24">mdi-book-open-variant</v-icon>
      </v-avatar>
      <span class="text-h6 font-weight-black text-white letter-spacing-1 font-display">HIDROBIBLIO</span>
    </NuxtLink>

    <!-- Student Info (Autenticado) -->
    <v-card 
      v-if="authStore.estaAutenticado"
      class="profile-section d-flex align-center pa-4 rounded-xl mb-8 cursor-pointer" 
      to="/profile"
      variant="text"
      :ripple="false"
    >
      <v-avatar size="48" class="mr-4 bg-accent">
        <v-img 
          v-if="authStore.usuario?.photoURL" 
          :src="authStore.usuario.photoURL"
        ></v-img>
        <span v-else class="text-h6 font-weight-bold text-primary">{{ authStore.iniciales }}</span>
      </v-avatar>
      <div class="overflow-hidden text-left">
        <h3 class="text-subtitle-1 font-weight-bold text-white mb-0 text-truncate">{{ authStore.nombreMostrar }}</h3>
        <p class="text-caption text-accent-light opacity-70 mb-0 font-weight-bold uppercase">
          {{ store.profile.year }}
        </p>
      </div>
    </v-card>

    <!-- Invitado (No autenticado) -->
    <v-card 
      v-else
      class="profile-section d-flex align-center pa-4 rounded-xl mb-8 cursor-pointer" 
      to="/auth/login"
      variant="text"
      :ripple="false"
    >
      <v-avatar size="48" class="mr-4" color="rgba(255,255,255,0.1)">
        <v-icon color="accent" size="24">mdi-account-circle-outline</v-icon>
      </v-avatar>
      <div class="overflow-hidden text-left">
        <h3 class="text-subtitle-1 font-weight-bold text-white mb-0">Iniciar sesión</h3>
        <p class="text-caption text-accent-light opacity-70 mb-0">
          Accede a tu cuenta
        </p>
      </div>
      <v-spacer></v-spacer>
      <v-icon color="accent" size="18">mdi-chevron-right</v-icon>
    </v-card>

    <!-- Gamification: Level (solo autenticado) -->
    <!-- <div v-if="authStore.estaAutenticado" class="level-section mb-10 px-2">
      <div class="d-flex justify-space-between align-center mb-2">
        <span class="text-caption font-weight-black text-white letter-spacing-1">NIVEL {{ store.profile.level }}</span>
        <span class="text-caption text-accent-light opacity-60">{{ store.progressPercent }}% para Nivel {{ store.profile.level + 1 }}</span>
      </div>
      <v-progress-linear
        :model-value="store.progressPercent"
        color="accent"
        height="10"
        rounded
        class="custom-progress"
      ></v-progress-linear>
    </div> -->

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
        <template v-slot:prepend>
          <v-icon :color="isActive(item.to) ? 'white' : 'accent'" class="mr-4">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title class="text-body-2 font-weight-bold" :class="isActive(item.to) ? 'text-white' : 'text-accent-light'">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- Library Explorer by Year -->
    <v-expansion-panels variant="accordion" class="academic-panels mb-3 mt-3 elevation-0">
      <v-expansion-panel bg-color="black" class="border-0">
        <v-expansion-panel-title class="pa-2 text-caption font-weight-black text-white letter-spacing-1">
          <v-icon start size="18" color="accent" class="mr-2">mdi-library-shelves</v-icon>
          EXPLORAR POR GRADOS
        </v-expansion-panel-title>
        <v-expansion-panel-text class="pa-0">
          <v-list bg-color="transparent" density="compact" class="pa-0">
            <v-list-item 
              v-for="anio in opcionesAnio" 
              :key="anio" 
              class="rounded-lg year-item mb-1 py-1"
              @click="navegarAlAnio(anio)"
            >
              <template v-slot:prepend>
                <v-icon size="16" color="accent" class="mr-3">mdi-school-outline</v-icon>
              </template>
              <v-list-item-title class="text-caption font-weight-bold text-accent-light uppercase">
                {{ anio }}
              </v-list-item-title>
              <template v-slot:append>
                <v-icon size="14" color="accent" class="opacity-30">mdi-chevron-right</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-btn
      v-if="authStore.estaAutenticado"
      block
      height="34"
      variant="text"
      rounded="xl"
      class="mt-2 font-weight-bold logout-btn"
      prepend-icon="mdi-logout"
      @click="handleLogout"
    >
      Cerrar sesión
    </v-btn>

    <!-- Bottom Actions -->
    <!-- <v-btn
      block
      height="56"
      color="accent"
      variant="flat"
      rounded="xl"
      class="search-btn font-weight-black text-primary letter-spacing-1 mt-auto"
      prepend-icon="mdi-magnify"
      to="/"
    >
      BUSCAR EN EL ARCHIVO
    </v-btn> -->

    <!-- Logout -->
    
  </div>
</template>

<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
import { useAuthStore } from '@/stores/auth'
import { useAutenticadorInvestigador } from '~/composables/domain/AutenticadorInvestigador'
import { useRoute, useRouter } from 'vue-router'

const store = useStudentStore()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const { cerrarSesion } = useAutenticadorInvestigador()

const isActive = (path: string) => route.path === path
const opcionesAnio = ['1ro "U"', '2do "U"', '3ro "U"', '4to "U"', '5to "U"']

const navegarAlAnio = (anio: string) => {
  router.push({ path: '/archivo', query: { anio } })
}

const menuItems = computed(() => {
  const items = [
    { title: 'Mi Biblioteca', icon: 'mdi-book-open-outline', value: 'library', to: '/biblioteca' },
    { title: 'Libros', icon: 'mdi-book-multiple', value: 'libros', to: '/archivo?anio=General' },
    { title: 'Glosario', icon: 'mdi-book-alphabet', value: 'glosario', to: '/glosario' },
  ]
  if (store.profile.admin) {
    items.unshift({ title: 'Panel Administrativo', icon: 'mdi-shield-crown-outline', value: 'admin', to: '/admin' })
  }
  return items
})

const handleLogout = async () => {
  await cerrarSesion()
  navigateTo('/auth/login')
}
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
  transition: background-color 0.3s ease;
}

.profile-section:hover {
  background-color: rgba(255, 255, 255, 0.08);
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

.academic-panels :deep(.v-expansion-panel-title) {
  min-height: 48px !important;
  padding: 0 12px !important;
}

.academic-panels :deep(.v-expansion-panel-title__overlay) {
  opacity: 0 !important;
}

.year-item {
  transition: all 0.3s ease;
  cursor: pointer;
}

.year-item:hover {
  background-color: rgba(199, 183, 163, 0.1) !important;
  transform: translateX(5px);
}

.academic-panels :deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 0 0 12px !important;
}

.letter-spacing-1 {
  letter-spacing: 1.5px !important;
}

.brand-link {
  transition: opacity 0.3s ease;
}

.brand-link:hover {
  opacity: 0.8;
}

.uppercase {
  text-transform: uppercase;
}
</style>
