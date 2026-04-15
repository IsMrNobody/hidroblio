// stores/auth.ts
import { defineStore } from 'pinia'
import type { User } from 'firebase/auth'

interface PerfilUsuario {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  createdAt: string | null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: null as PerfilUsuario | null,
    estaAutenticado: false,
    cargando: true, // true hasta que onAuthStateChanged responda
    errorAuth: null as string | null,
  }),
  getters: {
    nombreMostrar: (state) => {
      if (!state.usuario) return 'Invitado'
      return state.usuario.displayName || state.usuario.email?.split('@')[0] || 'Estudiante'
    },
    iniciales: (state) => {
      if (!state.usuario) return '?'
      const nombre = state.usuario.displayName || state.usuario.email || ''
      return nombre
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    },
  },
  actions: {
    setUsuario(user: User | null) {
      if (user) {
        this.usuario = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: user.metadata.creationTime || null,
        }
        this.estaAutenticado = true
      } else {
        this.usuario = null
        this.estaAutenticado = false
      }
      this.errorAuth = null
    },
    setCargando(estado: boolean) {
      this.cargando = estado
    },
    setError(mensaje: string) {
      this.errorAuth = mensaje
    },
    limpiarError() {
      this.errorAuth = null
    },
  },
})
