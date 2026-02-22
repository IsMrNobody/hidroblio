<!-- components/HeroSection.vue -->
<template>
  <v-container fluid class="pa-0 hero-container">
    <v-img
      src="/images/hero.png"
      :height="mobile ? 420 : 600"
      cover
      class="align-center"
    >
      <div class="hero-overlay"></div>
      
      <v-container class="px-md-12 position-relative z-1">
        <v-row>
          <v-col cols="12" md="8" lg="6">
            <div class="d-flex align-center mb-6">
              <v-divider length="40" thickness="2" color="white" class="mr-4 border-opacity-100"></v-divider>
              <span class="text-caption font-weight-black text-white letter-spacing-2">EXPLORACIÓN CURADA</span>
            </div>
            
            <h1 class="text-h2 font-weight-bold text-white mb-6 font-display line-height-1-2">
              Tu puerta de entrada a los archivos de la tierra.
            </h1>
            
            <p class="text-h6 text-white mb-10 opacity-80 font-weight-light">
              Descubre colecciones curadas en ingeniería petrolera, geología y dinámica de fluidos, diseñadas para la próxima generación de pioneros académicos.
            </p>
            
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                color="white"
                theme="light"
                height="56"
                class="px-8 text-caption font-weight-bold"
                rounded="0"
                flat
              >
                EXPLORAR AHORA
              </v-btn>
              
              <v-btn
                variant="outlined"
                color="white"
                height="56"
                class="px-8 text-caption font-weight-bold"
                rounded="0"
              >
                VER ARCHIVO
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
</script>

<style scoped>
.hero-container {
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(86, 28, 36, 0.9) 0%, rgba(86, 28, 36, 0.4) 100%);
  z-index: 0;
}

.z-1 {
  z-index: 1;
}

.line-height-1-2 {
  line-height: 1.2 !important;
}

.letter-spacing-2 {
  letter-spacing: 3px !important;
}

.gap-4 {
  gap: 16px;
}
</style>
