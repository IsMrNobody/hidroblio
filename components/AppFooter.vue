<!-- components/AppFooter.vue -->
<template>
  <v-footer color="primary" class="py-16 px-md-12 text-white">
    <v-container>
      <v-row>
        <!-- Brand Info -->
        <v-col cols="12" md="4" class="mb-8 mb-md-0">
          <div class="d-flex align-center mb-6">
            <v-icon size="32" class="mr-2">mdi-book-open-variant</v-icon>
            <span class="text-h6 font-weight-black font-display letter-spacing-1">HIDROBIBLIO</span>
          </div>
          <p class="text-body-2 opacity-70 mb-8 max-w-300">
          Un repositorio académico de primer nivel dedicado a la preservación y difusión de las ciencias de hidrocarburos y la excelencia en ingeniería.
          </p>
          <div class="d-flex gap-4">
            <v-btn icon="mdi-share-variant" variant="outlined" color="accent" size="small"></v-btn>
            <v-btn icon="mdi-email-outline" variant="outlined" color="accent" size="small"></v-btn>
          </div>
        </v-col>

        <!-- Links 1 -->
        <v-col cols="6" md="2">
          <h4 class="text-subtitle-2 font-weight-black letter-spacing-1 mb-6">ENLACES RÁPIDOS</h4>
          <v-list bg-color="transparent" density="compact" class="pa-0">
            <v-list-item v-for="link in quickLinks" :key="link" class="px-0 min-h-0 mb-2">
              <span class="text-body-2 opacity-70 hover-opacity-100 cursor-pointer">{{ link }}</span>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Links 2 -->
        <v-col cols="6" md="2">
          <h4 class="text-subtitle-2 font-weight-black letter-spacing-1 mb-6">SOPORTE</h4>
          <v-list bg-color="transparent" density="compact" class="pa-0">
            <v-list-item v-for="link in supportLinks" :key="link" class="px-0 min-h-0 mb-2">
              <span class="text-body-2 opacity-70 hover-opacity-100 cursor-pointer">{{ link }}</span>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Empty spacer for desktop -->
        <v-col cols="0" md="4"></v-col>
      </v-row>

      <v-divider class="my-12 border-opacity-25" color="accent"></v-divider>

      <div class="d-flex flex-column flex-md-row justify-md-center align-center">
        <span :class="['text-caption opacity-50 font-weight-bold letter-spacing-1', mobile ? 'text-center' : '']" style="word-break: break-word">
        © 2024 HIDROBIBLIO ARCHIVO DIGITAL. USO ACADÉMICO AUTORIZADO EXCLUSIVAMENTE.
        </span>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()

const quickLinks = ['Recursos para Docentes', 'Proyectos de Estudiantes', 'Normas Técnicas', 'Calendarios Académicos']
const supportLinks = ['Centro de Ayuda', 'Contactar Bibliotecario', 'Problemas de Acceso', 'Política de Privacidad']
</script>

<style scoped>
.max-w-300 {
  max-width: 300px;
}

.hover-opacity-100:hover {
  opacity: 1 !important;
}

.min-h-0 {
  min-height: auto !important;
}

.gap-4 {
  gap: 16px;
}
</style>
