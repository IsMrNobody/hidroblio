import { defineStore } from 'pinia'
import { useGestorGlosario, type Termino } from '~/composables/domain/GestorGlosario'

const EJEMPLOS_LOCALES: Termino[] = [
  {
    id: 'local-1',
    palabra: 'Gravedad API',
    categoria: 'Upstream',
    definicion: 'Medida del peso de los derivados del petróleo en comparación con el agua. Si es mayor a 10, es más liviano que el agua y flota.',
    fecha: 'Marzo 2024'
  },
  {
    id: 'local-2',
    palabra: 'Fracturación Hidráulica',
    categoria: 'Upstream',
    definicion: 'Técnica para extraer gas o petróleo de capas profundas de roca mediante la inyección de fluidos a alta presión.',
    fecha: 'Abril 2024'
  },
  {
    id: 'local-3',
    palabra: 'Crudo Amargo',
    categoria: 'Downstream',
    definicion: 'Petróleo crudo que contiene una alta concentración de azufre, lo que requiere procesos de refinación más complejos.',
    fecha: 'Enero 2024'
  },
  {
    id: 'local-4',
    palabra: 'Yacimiento',
    categoria: 'Geología',
    definicion: 'Acumulación natural de hidrocarburos en el subsuelo, atrapados en rocas porosas o fracturadas bajo una capa impermeable.',
    fecha: 'Febrero 2024'
  },
  {
    id: 'local-5',
    palabra: 'Monoboya',
    categoria: 'Midstream',
    definicion: 'Estructura de amarre flotante en alta mar que permite la carga y descarga de buques cisterna de gran calado.',
    fecha: 'Marzo 2024'
  },
  {
    id: 'local-6',
    palabra: 'Broca de Perforación',
    categoria: 'Equipos',
    definicion: 'Herramienta de corte situada en el extremo inferior de la sarta de perforación que tritura la roca para formar el pozo.',
    fecha: 'Abril 2024'
  }
]

export const useGlossaryStore = defineStore('glossary', {
  state: () => ({
    terminosFirebase: [] as Termino[],
    cargando: false
  }),
  getters: {
    terminos: (state) => [...state.terminosFirebase, ...EJEMPLOS_LOCALES]
  },
  actions: {
    async cargarTerminos() {
      const { obtenerTerminos } = useGestorGlosario()
      this.cargando = true
      try {
        this.terminosFirebase = await obtenerTerminos()
      } catch (error) {
        console.error(error)
      } finally {
        this.cargando = false
      }
    },
    async agregarTermino(palabra: string, categoria: string, definicion: string) {
      const { crearTermino } = useGestorGlosario()
      try {
        await crearTermino({ palabra, categoria, definicion })
        await this.cargarTerminos() // Recargar para obtener el nuevo con ID real
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async eliminarTermino(id: string) {
      // No permitimos borrar ejemplos locales por ID
      if (id.startsWith('local-')) return
      
      const { eliminarTermino } = useGestorGlosario()
      try {
        await eliminarTermino(id)
        await this.cargarTerminos()
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }
})
