<!-- layouts/default.vue -->
<template>
  <v-app class="modern-academic-app">
    <!-- Sidebar / Navigation Drawer (Dark) -->
    <v-navigation-drawer
      v-model="drawer"
      width="340"
      color="primary"
      elevation="0"
      border="0"
      class="sidebar-drawer"
    >
      <StudentProfile />
    </v-navigation-drawer>

    <!-- Navbar Minimalista (Modern Academic) -->
    <v-app-bar flat color="background" height="64" class="px-4">
      <v-btn
        icon="mdi-menu"
        variant="text"
        color="primary"
        @click="drawer = !drawer"
        class="mr-4"
      ></v-btn>
      <v-spacer></v-spacer>
      <!-- Iconos de utilidad opcionales -->
      <v-btn 
        icon="mdi-magnify" 
        variant="text" 
        color="secondary" 
        size="small" 
        class="mr-2"
        @click="openSearch"
      ></v-btn>
      <v-btn icon="mdi-bell-outline" variant="text" color="secondary" size="small"></v-btn>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main class="bg-background min-vh-100">
      <v-container fluid :class="mobile ? 'pa-4 pt-2' : 'pa-12 pt-4'">
        <!-- Top Navigation / Breadcrumbs -->
        <div class="d-flex flex-wrap align-center mb-8 breadcrumb-bar">
          <span class="text-caption font-weight-black text-secondary letter-spacing-2 opacity-60">PANEL PRINCIPAL</span>
          <v-icon size="14" color="secondary" class="mx-3 opacity-40">mdi-chevron-right</v-icon>
          <span class="text-caption font-weight-black text-secondary letter-spacing-2 border-b-secondary pb-1">BIBLIOTECA DIGITAL</span>
        </div>

        <slot />
      </v-container>
    </v-main>

    <!-- Search Dialog -->
    <NavigationAcademicSearchDialog v-if="showSearch" v-model="showSearch" />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import NavigationAcademicSearchDialog from '~/components/navigation/AcademicSearchDialog.vue'

const { mobile } = useDisplay()
const drawer = ref(!mobile.value)
const showSearch = ref(false)

const openSearch = () => {
  showSearch.value = true
}
</script>

<style scoped>
.modern-academic-app {
  background-color: #E8D8C4 !important; /* Creed/Background */
}

.sidebar-drawer {
  border-right: none !important;
}

.min-vh-100 {
  min-height: 100vh;
}

.letter-spacing-2 {
  letter-spacing: 2.5px !important;
}

.border-b-secondary {
  border-bottom: 2px solid rgba(var(--v-theme-secondary), 0.8);
}

.bg-background {
  background-color: #E8D8C4;
}
</style>
