<!-- pages/index.vue -->
<template>
  <div class="landing-page">
    <!-- Navbar Flotante -->
    <nav class="landing-nav d-flex align-center px-6 px-md-16 py-6" :class="{ 'scrolled': isScrolled }">
      <div class="logo font-weight-black text-white font-display text-h5">HidroBiblio</div>
      <v-spacer></v-spacer>
      <!-- <div class="nav-links d-none d-md-flex gap-8">
        <NuxtLink to="/biblioteca" class="nav-link">COLECCIONES</NuxtLink>
        <NuxtLink to="/glosario" class="nav-link">GLOSARIO</NuxtLink>
      </div> -->
      <v-spacer></v-spacer>
      
      <!-- Botones de Autenticación Dinámicos -->
      <div class="auth-btns d-flex align-center gap-4">
        <template v-if="!authStore.usuario">
          <v-btn to="/auth/login" variant="text" color="white" class="font-weight-bold d-none d-sm-flex">LOGIN</v-btn>
          <v-btn to="/auth/register" color="primary" rounded="lg" class="px-6 font-weight-black elevation-4">REGISTRARSE</v-btn>
        </template>
        <template v-else>
          <v-btn to="/biblioteca" color="primary" rounded="lg" class="px-6 font-weight-black elevation-4">MI PANEL</v-btn>
        </template>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="hero d-flex align-center justify-center text-center px-6">
      <div class="hero-overlay"></div>
      <div class="hero-content relative z-10 animate-fade-up">
        <!-- <span class="text-caption font-weight-black text-white letter-spacing-2 opacity-60 mb-4 d-block">EST. 2024 • REPOSITORIO GLOBAL</span> -->
        <h1 class="text-h2 text-md-h1 font-weight-black text-white font-display mb-6">
          Bienvenido a <br>
          <span class="italic-serif text-primary animated-word">
            <span 
              v-for="(char, index) in 'HidroBiblio'" 
              :key="index" 
              class="glow-letter"
              :style="{ animationDelay: `${index * 0.15}s` }"
            >
              {{ char }}
            </span>
          </span>
        </h1>
        <p class="text-subtitle-1 text-white opacity-80 max-width-700 mx-auto mb-10 leading-relaxed">
          Preservando el profundo legado de la exploración de hidrocarburos y la evolución industrial a través de una experiencia digital curada.
        </p>
        <div class="d-flex flex-column flex-sm-row justify-center gap-4">
          <v-btn to="/biblioteca" size="x-large" color="surface" class="text-primary font-weight-black px-10" rounded="xl">EXPLORAR LA BIBLIOTECA</v-btn>
          <!-- <v-btn v-if="!authStore.usuario" to="/auth/register" size="x-large" variant="outlined" color="white" class="px-10" rounded="xl"> -->
            <!-- CREAR CUENTA DE INVESTIGADOR -->
          <!-- </v-btn> -->
        </div>
      </div>
    </header>

    <!-- Our Goal Section -->
    <section class="goal-section py-16 py-md-24 px-6 px-md-16 bg-background">
      <v-row align="center">
        <v-col cols="12" md="7" class="pr-md-16">
          <h2 class="text-h3 font-weight-black text-primary font-display mb-8">Nuestro Objetivo</h2>
          <p class="text-h5 italic text-secondary font-weight-medium mb-10 leading-relaxed quote-text">
            "En nuestra biblioteca virtual, nos dedicamos a centralizar y preservar la riqueza del conocimiento técnico e histórico relacionado con los hidrocarburos."
          </p>
          <p class="text-body-1 text-secondary opacity-80 leading-loose">
            HidroBiblio es un espacio creado para investigadores, estudiantes y profesionales que buscan acceder a información relevante sobre la exploración, producción, refinación y sostenibilidad de los hidrocarburos. 
            Nuestra misión es democratizar el acceso a la información especializada, brindando un portal robusto para el estudio de la energía.
          </p>
        </v-col>
        <v-col cols="12" md="5">
          <v-card class="pa-8 mb-6 rounded-xl bg-surface border-light elevation-2">
            <v-icon color="primary" size="32" class="mb-4">mdi-book-open-page-variant</v-icon>
            <h4 class="text-subtitle-1 font-weight-black text-primary uppercase mb-2">Qué Ofrecemos</h4>
            <p class="text-caption text-secondary">Acceso a documentos digitalizados, artículos académicos y reportes técnicos desde el siglo XIX.</p>
          </v-card>
          <v-row dense>
            <v-col cols="6">
              <v-card class="pa-6 rounded-xl bg-primary text-white elevation-4 h-100">
                <v-icon color="white" size="24" class="mb-3">mdi-oil-lamp</v-icon>
                <h5 class="text-caption font-weight-black uppercase mb-1">Datos Técnicos</h5>
                <p class="text-tiny opacity-70">Ingeniería de yacimientos y geología aplicada.</p>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card class="pa-6 rounded-xl bg-accent-lighten-4 border-accent elevation-0 h-100">
                <v-icon color="secondary" size="24" class="mb-3">mdi-archive-outline</v-icon>
                <h5 class="text-caption font-weight-black text-secondary uppercase mb-1">Archivos</h5>
                <p class="text-tiny text-secondary opacity-70">Multimedia e informes históricos.</p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </section>

    <!-- Narrative Section -->
    <section class="narrative-section py-16 py-md-24 px-6 px-md-16 bg-surface">
      <v-row align="center" direction="row-reverse">
        <v-col cols="12" md="6" class="pl-md-16">
          <h2 class="text-h3 font-weight-black text-primary font-display mb-6">Desenterrando la Narrativa Industrial</h2>
          <p class="text-body-1 text-secondary mb-8 leading-loose">
            Cada documento en nuestro archivo es más que simples datos; es un hilo en el complejo tapiz del desarrollo global. 
            Explora las tecnologías emergentes y las prácticas sostenibles que ayudan a mitigar el impacto ambiental mientras impulsan la economía global.
          </p>
          <v-list bg-color="transparent" density="compact">
            <v-list-item class="px-0 py-1">
              <template v-slot:prepend>
                <v-icon color="primary" size="20" class="mr-3">mdi-rhombus-medium</v-icon>
              </template>
              <span class="text-caption font-weight-bold text-primary uppercase">Geología del Petróleo Avanzada</span>
            </v-list-item>
            <v-list-item class="px-0 py-1">
              <template v-slot:prepend>
                <v-icon color="primary" size="20" class="mr-3">mdi-rhombus-medium</v-icon>
              </template>
              <span class="text-caption font-weight-bold text-primary uppercase">Economía Energética Global</span>
            </v-list-item>
            <v-list-item class="px-0 py-1">
              <template v-slot:prepend>
                <v-icon color="primary" size="20" class="mr-3">mdi-rhombus-medium</v-icon>
              </template>
              <span class="text-caption font-weight-bold text-primary uppercase">Sostenibilidad Industrial</span>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="rounded-xl overflow-hidden elevated-card">
            <v-img src="https://res.cloudinary.com/dku13l2ep/image/upload/q_auto/f_auto/v1776270199/hidroblio/featured_2_ylhgkm.jpg" cover height="500">
              <div class="pa-8 d-flex flex-column justify-end fill-height map-overlay">
                <span class="text-caption font-weight-black text-white italic opacity-80 mb-2">COLECCIÓN DESTACADA</span>
                <h3 class="text-h4 font-weight-bold text-white font-display">Archivos Históricos de Exploración</h3>
              </div>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- Footer -->
    <footer class="landing-footer py-16 px-6 text-center text-white bg-dark">
      <div class="logo font-weight-black font-display text-h4 mb-8">HidroBiblio</div>
      <div class="footer-links d-flex justify-center gap-8 mb-12 flex-wrap text-caption font-weight-bold">
        <NuxtLink to="/auth/login" class="foot-link" v-if="!authStore.usuario">ACCESO</NuxtLink>
        <NuxtLink to="/auth/register" class="foot-link" v-if="!authStore.usuario">REGISTRO</NuxtLink>
        <NuxtLink to="/glosario" class="foot-link">GLOSARIO</NuxtLink>
        <NuxtLink to="/biblioteca" class="foot-link">COLECCIONES</NuxtLink>
      </div>
      <v-divider color="white" class="opacity-10 mb-8 max-width-700 mx-auto"></v-divider>
      <p class="text-caption opacity-40">
        © 2024 HidroBiblio. Todos los derechos reservados. <br>
        Curando el legado del descubrimiento de energía.
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false
})

const authStore = useAuthStore()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;700&display=swap');

.landing-page {
  font-family: 'Inter', sans-serif !important;
  background-color: #E8D8C4;
  overflow-x: hidden;
}

.font-display {
  font-family: 'Playfair Display', serif !important;
}

.italic-serif {
  font-family: 'Playfair Display', serif !important;
  font-style: italic;
  font-weight: 700;
}

.letter-spacing-2 {
  letter-spacing: 2px !important;
}

.leading-relaxed { line-height: 1.6; }
.leading-loose { line-height: 1.8; }

.text-tiny { font-size: 0.75rem; }

/* Navbar */
.landing-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: all 0.4s ease;
}

.landing-nav.scrolled {
  position: fixed;
  background-color: rgba(44, 26, 29, 0.95);
  backdrop-filter: blur(10px);
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.nav-link:hover { opacity: 1; }

/* Hero */
.hero {
  min-height: 100vh;
  position: relative;
  background-image: url('https://res.cloudinary.com/dku13l2ep/image/upload/q_auto/f_auto/v1776269809/hidroblio/pphoto-2539_yqobnh.jpg');
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(44, 26, 29, 0.85) 0%, rgba(86, 28, 36, 0.65) 100%);
}

.max-width-700 { max-width: 700px; }

/* Section styles */
.quote-text {
  border-left: 3px solid #561C24;
  padding-left: 1.5rem;
}

.bg-dark {
  background-color: #2C1A1D;
}

.border-light {
  border: 1px solid rgba(199, 183, 163, 0.3) !important;
}

.border-accent {
  border: 1px solid rgba(109, 41, 50, 0.2) !important;
}

.map-overlay {
  background: linear-gradient(to top, rgba(44, 26, 29, 0.9) 0%, transparent 70%);
}

.elevated-card {
  box-shadow: 0 30px 60px -15px rgba(44, 26, 29, 0.4) !important;
}

.foot-link {
  color: white;
  text-decoration: none;
  letter-spacing: 1px;
  opacity: 0.6;
}

.foot-link:hover { opacity: 1; }

.gap-4 { gap: 16px; }
.gap-8 { gap: 32px; }

/* Animations */
.animate-fade-up {
  animation: fadeUp 1s ease-out both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 960px) {
  .hero { height: auto; padding-top: 140px; padding-bottom: 80px; }
  .text-h2 { font-size: 3rem !important; line-height: 1.1; }
}

.bg-surface {
  background-color: #FDFBF7 !important;
}

/* Letras animadas */
.animated-word {
  display: inline-block;
  white-space: nowrap;
}

.glow-letter {
  display: inline-block;
  animation: slow-glow 4s ease-in-out infinite;
  transition: all 0.3s ease;
}

@keyframes slow-glow {
  0%, 20%, 80%, 100% {
    color: inherit;
    text-shadow: none;
    transform: translateY(0);
  }
  50% {
    color: #FFFFFF;
    text-shadow: 
      0 0 10px rgba(255, 255, 255, 0.4),
      0 0 20px rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }
}
</style>
