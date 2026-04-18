<!-- layouts/auth.vue -->
<!-- Layout limpio y centrado para las páginas de autenticación -->
<template>
  <v-app class="auth-layout">
    <!-- Fondo decorativo -->
    <div class="auth-bg-pattern"></div>
    
    <v-main class="d-flex align-center justify-center fill-height">
      <v-container class="auth-container" style="max-width: 1100px;">
        <v-row align="center" justify="center" no-gutters>
          <!-- Panel decorativo izquierdo (solo desktop) -->
          <v-col cols="12" md="5" class="d-none d-md-flex">
            <div class="auth-brand-panel d-flex flex-column justify-center align-center pa-12">
              <v-avatar size="72" color="white" rounded="xl" class="mb-6 elevation-4">
                <v-icon size="36" color="primary">mdi-book-open-variant</v-icon>
              </v-avatar>
              <h1 class="text-h3 font-weight-black text-white font-display mb-4 text-center">
                HidroBiblio
              </h1>
              <p class="text-body-1 text-center" style="color: rgba(255,255,255,0.7); line-height: 1.8;">
                Tu biblioteca digital gamificada de hidrocarburos. Accede a recursos, anota tus investigaciones y avanza de nivel.
              </p>
              
              <!-- Decorative elements -->
              <div class="mt-10 d-flex align-center">
                <v-icon size="18" color="accent" class="mr-2">mdi-shield-check</v-icon>
                <span class="text-caption text-accent font-weight-bold letter-spacing-1">ACCESO SEGURO</span>
              </div>
            </div>
          </v-col>

          <!-- Panel de formulario -->
          <v-col cols="12" md="7">
            <div class="auth-form-panel">
              <!-- Logo mobile -->
              <div class="d-flex d-md-none align-center justify-center mb-8">
                <v-avatar size="48" color="primary" rounded="lg" class="mr-3 elevation-2">
                  <v-icon size="24" color="white">mdi-book-open-variant</v-icon>
                </v-avatar>
                <span class="text-h5 font-weight-black text-primary font-display">HidroBiblio</span>
              </div>
              
              <slot />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.auth-layout {
  background-color: #E8D8C4 !important;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.auth-bg-pattern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(86, 28, 36, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(109, 41, 50, 0.03) 0%, transparent 40%),
    radial-gradient(#6d2932 0.5px, transparent 0.5px);
  background-size: 100% 100%, 100% 100%, 24px 24px;
  pointer-events: none;
  z-index: 0;
}

.auth-brand-panel {
  background: linear-gradient(160deg, #561C24 0%, #6D2932 40%, #4a1219 100%);
  border-radius: 24px 0 0 24px;
  min-height: 560px;
  position: relative;
  overflow: hidden;
}

.auth-brand-panel::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(199, 183, 163, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.auth-brand-panel::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(to top, rgba(0,0,0,0.15), transparent);
  pointer-events: none;
}

.auth-form-panel {
  background: rgba(253, 251, 247, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 0 24px 24px 0;
  padding: 48px 40px;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  box-shadow: 0 8px 32px rgba(86, 28, 36, 0.08);
}

.font-display {
  font-family: 'Playfair Display', serif !important;
}

.letter-spacing-1 {
  letter-spacing: 1.5px !important;
}

/* Responsive: en mobile ambos paneles son redondeados */
@media (max-width: 959px) {
  .auth-form-panel {
    border-radius: 24px;
    padding: 32px 24px;
    min-height: auto;
    margin: 16px;
  }
}
</style>
