import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  onSnapshot 
} from 'firebase/firestore'
import { useStudentStore } from '~/stores/student'

export const useGestorDatosEstudiante = () => {
  const { $db } = useNuxtApp()
  const studentStore = useStudentStore()
  const studentCollection = 'estudiantes'

  /**
   * Guarda o actualiza el perfil del estudiante en Firestore
   * @param studentId ID único del estudiante (puede ser su email o UID de auth)
   */
  const guardarPerfil = async (studentId: string) => {
    if (!$db) return
    
    try {
      const studentDocRef = doc($db, studentCollection, studentId)
      await setDoc(studentDocRef, {
        ...studentStore.profile,
        unlockedResources: studentStore.unlockedResources,
        updatedAt: new Date().toISOString()
      }, { merge: true })
      
      console.log('Perfil guardado exitosamente en Firebase')
    } catch (error) {
      console.error('Error al guardar perfil en Firebase:', error)
      throw error
    }
  }

  /**
   * Carga el perfil del estudiante desde Firestore y sincroniza con el Store de Pinia
   * @param studentId ID único del estudiante
   */
  const cargarPerfil = async (studentId: string) => {
    if (!$db) return

    try {
      const studentDocRef = doc($db, studentCollection, studentId)
      const docSnap = await getDoc(studentDocRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        // Actualizar el store con los datos remotos
        studentStore.profile = { ...studentStore.profile, ...data }
        if (data.unlockedResources) {
          studentStore.unlockedResources = data.unlockedResources
        }
        console.log('Perfil cargado desde Firebase')
      } else {
        console.log('No se encontró perfil previo, usando datos locales')
      }
    } catch (error) {
      console.error('Error al cargar perfil desde Firebase:', error)
    }
  }

  /**
   * Escucha cambios en tiempo real del perfil en Firestore
   * @param studentId ID único del estudiante
   */
  const suscribirCambiosPerfil = (studentId: string) => {
    if (!$db) return () => {}

    const studentDocRef = doc($db, studentCollection, studentId)
    
    return onSnapshot(studentDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data()
        studentStore.$patch({
          profile: { ...studentStore.profile, ...data },
          unlockedResources: data.unlockedResources || []
        })
      }
    })
  }

  return {
    guardarPerfil,
    cargarPerfil,
    suscribirCambiosPerfil
  }
}
