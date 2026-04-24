// stores/student.ts
import { defineStore } from 'pinia'

export const useStudentStore = defineStore('student', {
    state: () => ({
        profile: {
            name: 'Estudiante',
            year: '1ro "U"',
            section: 'A',
            avatar: 'mdi-account-school',
            level: 1, // Gamificación: Nivel actual
            xp: 150, // Puntos de experiencia
            maxXp: 500, // XP necesaria para siguiente nivel
            admin: false, // Control de acceso administrativo
        },
        unlockedResources: [] as string[], // IDs de recursos desbloqueados
        notifications: [] as string[],
    }),
    getters: {
        progressPercent: (state) => Math.floor((state.profile.xp / state.profile.maxXp) * 100),
        levelTitle: (state) => {
            const titles = ['Novato', 'Aprendiz', 'Investigador', 'Ingeniero Junior', 'Experto']
            return titles[state.profile.level - 1] || 'Maestro'
        },
    },
    actions: {
        updateProfile(newProfile: { name: string, year: string, section: string }) {
            this.profile = { ...this.profile, ...newProfile }
            this.addNotification(`¡Bienvenido, ${newProfile.name}!`)
        },
        gainXp(amount: number) {
            this.profile.xp += amount
            if (this.profile.xp >= this.profile.maxXp) {
                this.levelUp()
            }
        },
        levelUp() {
            this.profile.level++
            this.profile.xp = 0
            this.profile.maxXp = Math.floor(this.profile.maxXp * 1.5)
            this.addNotification(`¡Has subido al nivel ${this.profile.level}: ${this.levelTitle}!`)
        },
        unlockResource(resourceId: string) {
            if (!this.unlockedResources.includes(resourceId)) {
                this.unlockedResources.push(resourceId)
                this.gainXp(50) // Recompensa por desbloquear
                this.addNotification('Nuevo recurso desbloqueado')
            }
        },
        addNotification(message: string) {
            this.notifications.push(message)
            // Auto-eliminar después de 5s (Lógica simple, mejorable en UI)
            setTimeout(() => {
                this.notifications.shift()
            }, 5000)
        }
    },
})
