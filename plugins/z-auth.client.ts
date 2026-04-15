// plugins/z-auth.client.ts
// Observa el estado de autenticación al iniciar la aplicación en el cliente.
// Depende del plugin firebase.client.ts (orden alfabético asegura que firebase se cargue primero)
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from '~/stores/auth'
import { useAutenticadorInvestigador } from '~/composables/domain/AutenticadorInvestigador'

export default defineNuxtPlugin(async () => {
  const { $auth } = useNuxtApp()
  
  if (!$auth) {
    console.warn('[Auth Plugin] Firebase Auth no está disponible todavía.')
    return
  }

  const authStore = useAuthStore()
  const { cargarPerfilDesdeFirestore } = useAutenticadorInvestigador()

  // Retornamos una promesa que se resuelve cuando Firebase nos da el primer estado de auth.
  // Esto asegura que el middleware tenga el estado correcto desde el inicio.
  await new Promise<void>((resolve) => {
    const unsubscribe = onAuthStateChanged($auth, async (user) => {
      authStore.setUsuario(user)
      
      if (user) {
        try {
          await cargarPerfilDesdeFirestore(user.uid)
        } catch (error) {
          console.error('[Auth Plugin] Error al cargar perfil:', error)
        }
      }
      
      authStore.setCargando(false)
      resolve()
    })
  })
})
