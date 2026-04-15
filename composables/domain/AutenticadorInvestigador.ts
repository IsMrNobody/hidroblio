// composables/domain/AutenticadorInvestigador.ts
// Gestiona toda la autenticación de Firebase Auth para investigadores/estudiantes.

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
  type User,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useAuthStore } from '~/stores/auth'
import { useStudentStore } from '~/stores/student'
import { useFavoritesStore } from '~/stores/favorites'

export const useAutenticadorInvestigador = () => {
  const { $auth, $db } = useNuxtApp()
  const authStore = useAuthStore()
  const studentStore = useStudentStore()
  const favoritesStore = useFavoritesStore()

  /**
   * Registra un nuevo investigador con email y contraseña.
   * Crea el documento de perfil en Firestore automáticamente.
   */
  const registrar = async (email: string, password: string, nombre: string, year: string, section: string) => {
    authStore.limpiarError()
    try {
      const credencial = await createUserWithEmailAndPassword($auth, email, password)

      // Actualizar displayName en Firebase Auth
      await updateProfile(credencial.user, { displayName: nombre })

      // Crear documento de perfil en Firestore
      await crearPerfilFirestore(credencial.user, nombre, year, section)

      // Actualizar store local
      authStore.setUsuario(credencial.user)
      studentStore.updateProfile({
        name: nombre,
        year: year,
        section: section,
      })

      return credencial.user
    } catch (error: any) {
      console.error('[Auth Service] Error detallado:', error)
      const mensaje = traducirErrorFirebase(error.code)
      authStore.setError(mensaje)
      throw error
    }
  }

  /**
   * Inicia sesión con email y contraseña
   */
  const iniciarSesion = async (email: string, password: string) => {
    authStore.limpiarError()
    try {
      const credencial = await signInWithEmailAndPassword($auth, email, password)
      authStore.setUsuario(credencial.user)

      // Cargar perfil desde Firestore
      await cargarPerfilDesdeFirestore(credencial.user.uid)

      return credencial.user
    } catch (error: any) {
      console.error('[Auth Service] Error detallado:', error)
      const mensaje = traducirErrorFirebase(error.code)
      authStore.setError(mensaje)
      throw error
    }
  }

  /**
   * Inicio de sesión con Google
   */
  const iniciarSesionConGoogle = async () => {
    authStore.limpiarError()
    try {
      const provider = new GoogleAuthProvider()
      const credencial = await signInWithPopup($auth, provider)

      // Si es usuario nuevo, crear perfil en Firestore
      const docRef = doc($db, 'estudiantes', credencial.user.uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        await crearPerfilFirestore(
          credencial.user,
          credencial.user.displayName || 'Estudiante'
        )
      } else {
        await cargarPerfilDesdeFirestore(credencial.user.uid)
      }

      authStore.setUsuario(credencial.user)
      return credencial.user
    } catch (error: any) {
      console.error('[Auth Service] Error detallado:', error)
      const mensaje = traducirErrorFirebase(error.code)
      authStore.setError(mensaje)
      throw error
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  const cerrarSesion = async () => {
    try {
      await signOut($auth)
      authStore.setUsuario(null)
      // Resetear stores
      studentStore.$reset()
      favoritesStore.reset()
      navigateTo('/')
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  // ─── Funciones internas ───────────────────────────────────

  const crearPerfilFirestore = async (user: User, nombre: string, year = '1ro "U"', section = 'A') => {
    const docRef = doc($db, 'estudiantes', user.uid)
    await setDoc(docRef, {
      name: nombre,
      email: user.email,
      year: year,
      section: section,
      avatar: 'mdi-account-school',
      level: 1,
      xp: 0,
      maxXp: 500,
      unlockedResources: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  const cargarPerfilDesdeFirestore = async (uid: string) => {
    try {
      const docRef = doc($db, 'estudiantes', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        studentStore.$patch({
          profile: {
            name: data.name || 'Estudiante',
            year: data.year || '1ro "U"',
            section: data.section || 'A',
            avatar: data.avatar || 'mdi-account-school',
            level: data.level || 1,
            xp: data.xp || 0,
            maxXp: data.maxXp || 500,
          },
          unlockedResources: data.unlockedResources || [],
        })
      }
    } catch (error) {
      console.error('Error al cargar perfil desde Firestore:', error)
    }
  }

  /**
   * Traduce códigos de error de Firebase a mensajes amigables en español
   */
  const traducirErrorFirebase = (code: string): string => {
    const errores: Record<string, string> = {
      'auth/email-already-in-use': 'Este correo electrónico ya está registrado.',
      'auth/invalid-email': 'El correo electrónico no es válido.',
      'auth/operation-not-allowed': 'El registro con correo y contraseña no está habilitado en Firebase. Contacta al administrador.',
      'auth/weak-password': 'La contraseña es demasiado débil (mínimo 6 caracteres).',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
      'auth/user-not-found': 'No se encontró una cuenta con este correo.',
      'auth/wrong-password': 'La contraseña es incorrecta.',
      'auth/too-many-requests': 'Demasiados intentos. Espera un momento e intenta de nuevo.',
      'auth/invalid-credential': 'Las credenciales proporcionadas no son válidas.',
      'auth/popup-closed-by-user': 'Se cerró la ventana de inicio de sesión.',
      'auth/internal-error': 'Error interno de Firebase. Verifica tu conexión.',
      'auth/network-request-failed': 'Error de red. Verifica tu conexión a internet.',
    }
    return errores[code] || `Ocurrió un error (Código: ${code}). Intenta de nuevo.`
  }

  /**
   * Cambia la contraseña del usuario actual.
   * Requiere una sesión reciente para funcionar sin re-autenticación.
   */
  const cambiarPassword = async (nuevaPassword: string) => {
    authStore.limpiarError()
    try {
      if (!$auth.currentUser) throw new Error('No hay usuario autenticado')
      await updatePassword($auth.currentUser, nuevaPassword)
      return true
    } catch (error: any) {
      console.error('[Auth Service] Error al cambiar password:', error)
      const mensaje = traducirErrorFirebase(error.code)
      authStore.setError(mensaje)
      throw error
    }
  }

  return {
    registrar,
    iniciarSesion,
    iniciarSesionConGoogle,
    cerrarSesion,
    cargarPerfilDesdeFirestore,
    cambiarPassword,
  }
}
