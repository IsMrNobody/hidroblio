// composables/domain/GestorArticulos.ts
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy, 
  deleteDoc, 
  doc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

import { useArticulosStore } from '~/stores/articles'

export interface Articulo {
  id?: string
  titulo: string
  contenido: string
  anio: string
  fotoUrl?: string // Portada
  fotoPublicId?: string // Cloudinary public_id para la portada
  articuloFotoUrl?: string // Imagen interna del artículo
  articuloFotoPublicId?: string // Cloudinary public_id para la imagen interna
  documentoUrl?: string
  nombreDocumento?: string
  createdAt?: any
  updatedAt?: any
}


export const useGestorArticulos = () => {
  const { $db, $storage } = useNuxtApp()
  const store = useArticulosStore()

  // Iniciar desde localStorage si el store esta vacio (hidratación)
  if (store.articulos.length === 0) {
    store.initFromLocalStorage()
  }

  /**
   * Obtener artículos filtrados por año (opcional)
   * Usa cache reactiva si esta fresca.
   */
  const obtenerArticulos = async (anio?: string, forceRefresh = false) => {
    // Si tenemos cache y no es vieja, devolvemos lo que hay filtrado en el store
    if (!forceRefresh && !store.isStale && store.articulos.length > 0) {
      return store.getArticulosByYear(anio)
    }

    try {
      const q = query(collection($db, 'articulos'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Articulo[]
      
      // Guardar en store para cache global
      store.setArticulos(data)
      
      return store.getArticulosByYear(anio)
    } catch (error) {
      console.error('Error al obtener artículos:', error)
      throw error
    }
  }

  /**
   * Crear un nuevo artículo con URLs externas
   */
  const crearArticulo = async (articulo: Omit<Articulo, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const docRef = await addDoc(collection($db, 'articulos'), {
        ...articulo,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })

      // Invalidar cache para forzar refresco
      store.lastFetched = 0

      return docRef.id
    } catch (error) {
      console.error('Error al crear artículo:', error)
      throw error
    }
  }

  /**
   * Eliminar un artículo de la base de datos y sus imágenes asociadas en Cloudinary
   */
  const eliminarArticulo = async (articulo: Articulo) => {
    if (!articulo.id) return

    try {
      // 1. Eliminar imágenes de Cloudinary si existen
      const borrarImagen = async (publicId?: string) => {
        if (!publicId) return
        try {
          await $fetch('/api/cloudinary/delete', {
            method: 'POST',
            body: { publicId }
          })
        } catch (err) {
          console.error(`No se pudo eliminar la imagen ${publicId} de Cloudinary:`, err)
        }
      }

      await Promise.all([
        borrarImagen(articulo.fotoPublicId),
        borrarImagen(articulo.articuloFotoPublicId)
      ])

      // 2. Eliminar el registro de Firestore
      await deleteDoc(doc($db, 'articulos', articulo.id))

      // Invalidar cache para forzar refresco
      store.lastFetched = 0
    } catch (error) {
      console.error('Error al eliminar artículo:', error)
      throw error
    }
  }

  /**
   * Obtener un artículo por su ID
   */
  const obtenerArticuloPorId = async (id: string, forceRefresh = false) => {
    // Intentar sacar del store si ya lo tenemos fresquito
    const cached = store.getArticuloById(id)
    if (cached && !store.isStale && !forceRefresh) {
      return cached
    }

    try {
      const docRef = doc($db, 'articulos', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Articulo
      }
      return null
    } catch (error) {
      console.error('Error al obtener artículo por ID:', error)
      throw error
    }
  }

  /**
   * Actualizar un artículo existente
   */
  const actualizarArticulo = async (articulo: Articulo) => {
    if (!articulo.id) return

    try {
      const { id, createdAt, ...data } = articulo
      const docRef = doc($db, 'articulos', id)
      
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      })

      // Invalidar cache
      store.lastFetched = 0
    } catch (error) {
      console.error('Error al actualizar artículo:', error)
      throw error
    }
  }

  return {
    obtenerArticulos,
    crearArticulo,
    actualizarArticulo,
    eliminarArticulo,
    obtenerArticuloPorId,
  }
}
