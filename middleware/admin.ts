// middleware/admin.ts
// Middleware para proteger rutas que requieren permisos de administrador.

import { useAuthStore } from '~/stores/auth'
import { useStudentStore } from '~/stores/student'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const studentStore = useStudentStore()

  // Si aún está cargando el estado de auth o el perfil, esperar.
  // Esto es crucial para evitar redirecciones erróneas durante el SSR o la hidratación.
  if (authStore.cargando) return

  console.log('[Admin Middleware] Verificando:', {
    autenticado: authStore.estaAutenticado,
    admin: studentStore.profile.admin,
    uid: authStore.usuario?.uid
  })

  // Si no está autenticado, no puede ser admin
  if (!authStore.estaAutenticado) {
    return navigateTo('/auth/login')
  }

  // Si está autenticado pero no es admin, redirigir al dashboard de estudiante o biblioteca
  if (!studentStore.profile.admin) {
    console.warn('[Admin Middleware] Acceso denegado: el usuario no tiene permisos de administrador.')
    return navigateTo('/biblioteca') // O podrías mandarlo a / si prefieres
  }
})
