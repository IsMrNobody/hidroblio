// composables/domain/GestorColecciones.ts
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc, 
  doc,
  serverTimestamp,
  updateDoc,
  increment,
  orderBy
} from 'firebase/firestore'
import { useAuthStore } from '~/stores/auth'
import { useGestorArticulos, type Articulo } from './GestorArticulos'

export interface ArticuloGuardado {
  id?: string
  articuloId: string
  userId: string
  guardadoAt: any
}

export const useGestorColecciones = () => {
  const { $db } = useNuxtApp()
  const authStore = useAuthStore()
  const { obtenerArticuloPorId } = useGestorArticulos()

  /**
   * Obtener todos los artículos guardados por el usuario actual
   */
  const obtenerArticulosGuardados = async () => {
    if (!authStore.usuario?.uid) return []
    
    try {
      // 1. Obtener los IDs de los artículos guardados ordenados por fecha
      const q = query(
        collection($db, 'articulos_guardados'), 
        where('userId', '==', authStore.usuario.uid),
        orderBy('guardadoAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      const vinculaciones = querySnapshot.docs.map(doc => doc.data() as ArticuloGuardado)
      
      if (vinculaciones.length === 0) return []

      // 2. Obtener los detalles de cada artículo
      const promesas = vinculaciones.map(v => obtenerArticuloPorId(v.articuloId))
      const articulos = await Promise.all(promesas)
      
      // Filtrar los que no existan
      return articulos.filter(a => a !== null) as Articulo[]
    } catch (error) {
      console.error('Error al obtener artículos guardados:', error)
      return []
    }
  }

  /**
   * Guardar (o quitar) un artículo en la lista personal (Toggle)
   */
  const guardarArticulo = async (articuloId: string) => {
    if (!authStore.usuario?.uid) return false

    try {
      // Verificar si ya existe
      const q = query(
        collection($db, 'articulos_guardados'),
        where('userId', '==', authStore.usuario.uid),
        where('articuloId', '==', articuloId)
      )
      const existing = await getDocs(q)
      
      if (!existing.empty) {
        // Si ya existe, lo quitamos
        const docId = existing.docs[0].id
        await deleteDoc(doc($db, 'articulos_guardados', docId))
        return { saved: false }
      }

      // Guardar el artículo
      await addDoc(collection($db, 'articulos_guardados'), {
        articuloId,
        userId: authStore.usuario.uid,
        guardadoAt: serverTimestamp()
      })

      return { saved: true }
    } catch (error) {
      console.error('Error al gestionar artículo guardado:', error)
      return false
    }
  }

  /**
   * Verificar si un artículo específico está guardado
   */
  const estaGuardado = async (articuloId: string) => {
    if (!authStore.usuario?.uid) return false
    try {
      const q = query(
        collection($db, 'articulos_guardados'),
        where('userId', '==', authStore.usuario.uid),
        where('articuloId', '==', articuloId)
      )
      const snapshot = await getDocs(q)
      return !snapshot.empty
    } catch (e) { return false }
  }

  return {
    obtenerArticulosGuardados,
    guardarArticulo,
    estaGuardado
  }
}
