// stores/favorites.ts
import { defineStore } from 'pinia'
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc, 
  doc,
  serverTimestamp,
  orderBy
} from 'firebase/firestore'
import { useAuthStore } from './auth'
import { useGestorArticulos, type Articulo } from '~/composables/domain/GestorArticulos'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as Articulo[],
    loading: false,
    initialized: false
  }),

  actions: {
    async fetchFavorites() {
      const { $db } = useNuxtApp()
      const authStore = useAuthStore()
      const { obtenerArticuloPorId } = useGestorArticulos()

      if (!authStore.usuario?.uid) return
      
      this.loading = true
      try {
        const q = query(
          collection($db, 'articulos_guardados'), 
          where('userId', '==', authStore.usuario.uid),
          orderBy('guardadoAt', 'desc')
        )
        const querySnapshot = await getDocs(q)
        const vinculaciones = querySnapshot.docs.map(doc => doc.data() as { articuloId: string })
        
        if (vinculaciones.length === 0) {
          this.favorites = []
          return
        }

        const promesas = vinculaciones.map(v => obtenerArticuloPorId(v.articuloId))
        const articulos = await Promise.all(promesas)
        
        this.favorites = articulos.filter(a => a !== null) as Articulo[]
        this.initialized = true
      } catch (error) {
        console.error('Error al cargar favoritos:', error)
      } finally {
        this.loading = false
      }
    },

    async toggleFavorite(articuloId: string) {
      const { $db } = useNuxtApp()
      const authStore = useAuthStore()
      const { obtenerArticuloPorId } = useGestorArticulos()

      if (!authStore.usuario?.uid) return { success: false }

      try {
        const q = query(
          collection($db, 'articulos_guardados'),
          where('userId', '==', authStore.usuario.uid),
          where('articuloId', '==', articuloId)
        )
        const existing = await getDocs(q)
        
        if (!existing.empty) {
          // Quitar de Firestore
          const docId = existing.docs[0].id
          await deleteDoc(doc($db, 'articulos_guardados', docId))
          
          // Actualizar estado local reactivo
          this.favorites = this.favorites.filter(f => f.id !== articuloId)
          return { saved: false, success: true }
        } else {
          // Añadir a Firestore
          await addDoc(collection($db, 'articulos_guardados'), {
            articuloId,
            userId: authStore.usuario.uid,
            guardadoAt: serverTimestamp()
          })

          // Añadir al estado local para actualización inmediata
          const newArt = await obtenerArticuloPorId(articuloId)
          if (newArt) {
            this.favorites = [newArt, ...this.favorites]
          }
          return { saved: true, success: true }
        }
      } catch (error) {
        console.error('Error al gestionar favorito:', error)
        return { success: false }
      }
    },

    isFavorite(articuloId: string) {
      return this.favorites.some(f => f.id === articuloId)
    }
  }
})
