// composables/domain/GestorGlosario.ts
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore'

export interface Termino {
  id?: string
  palabra: string
  categoria: string
  definicion: string
  fecha?: string
  createdAt?: any
}

export const useGestorGlosario = () => {
  const { $db } = useNuxtApp()

  const obtenerTerminos = async () => {
    try {
      const q = query(collection($db, 'glosario'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Termino[]
    } catch (error) {
      console.error('Error al obtener términos del glosario:', error)
      return []
    }
  }

  const crearTermino = async (termino: Omit<Termino, 'id' | 'createdAt'>) => {
    try {
      const fechaActual = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(new Date())
      const docRef = await addDoc(collection($db, 'glosario'), {
        ...termino,
        fecha: fechaActual,
        createdAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Error al crear término:', error)
      throw error
    }
  }

  const eliminarTermino = async (id: string) => {
    try {
      await deleteDoc(doc($db, 'glosario', id))
    } catch (error) {
      console.error('Error al eliminar término:', error)
      throw error
    }
  }

  return {
    obtenerTerminos,
    crearTermino,
    eliminarTermino
  }
}
