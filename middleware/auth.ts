// middleware/auth.ts
// Middleware para proteger rutas que requieren autenticación.
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Si aún está cargando el estado de auth (no debería pasar por el plugin await),
  // pero por si acaso, no redirigimos hasta estar seguros.
  if (authStore.cargando) return

  // Si no está autenticado, redirigir al login
  if (!authStore.estaAutenticado) {
    return navigateTo('/auth/login')
  }
})
