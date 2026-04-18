// stores/articles.ts
import { defineStore } from 'pinia'
import type { Articulo } from '~/composables/domain/GestorArticulos'

const REFRESH_INTERVAL = 1000 * 60 * 5 // 5 minutos de cache

export const useArticulosStore = defineStore('articulos', {
  state: () => ({
    articulos: [] as Articulo[],
    lastFetched: 0,
    cargando: false
  }),
  
  getters: {
    isStale: (state) => {
      return Date.now() - state.lastFetched > REFRESH_INTERVAL
    },
    getArticulosByYear: (state) => (anio?: string) => {
      if (!anio) return state.articulos
      return state.articulos.filter(a => a.anio === anio)
    },
    getArticuloById: (state) => (id: string) => {
      return state.articulos.find(a => a.id === id)
    }
  },
  
  actions: {
    setArticulos(articulos: Articulo[]) {
      this.articulos = articulos
      this.lastFetched = Date.now()
      // Guardar en localStorage para persistencia opcional
      if (typeof window !== 'undefined') {
        localStorage.setItem('hidro_articulos_cache', JSON.stringify({
          data: articulos,
          timestamp: this.lastFetched
        }))
      }
    },
    
    // Al iniciar, intentar recuperar del localStorage
    initFromLocalStorage() {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('hidro_articulos_cache')
        if (cached) {
          try {
            const { data, timestamp } = JSON.parse(cached)
            this.articulos = data
            this.lastFetched = timestamp
          } catch (e) {
            console.error('Error al parsear cache de articulos:', e)
          }
        }
      }
    }
  }
})
