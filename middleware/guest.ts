// middleware/guest.ts
// Redirige a los usuarios autenticados fuera de las páginas de auth (login/register).
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Si aún está cargando, retornar para esperar estado
  if (authStore.cargando) return

  // Si YA está autenticado, no debería estar en login/registrer
  if (authStore.estaAutenticado) {
    return navigateTo('/')
  }
})
