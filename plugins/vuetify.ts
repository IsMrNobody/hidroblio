// plugins/vuetify.ts
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        name: 'HidroBiblio',
        theme: {
            defaultTheme: 'modernAcademic',
            themes: {
                modernAcademic: {
                    dark: false,
                    colors: {
                        primary: '#561C24', // Vino profundo (Énfasis)
                        secondary: '#6D2932', // Vino tierra (Secundario)
                        accent: '#C7B7A3', // Arena (Bordes/Detalles)
                        background: '#E8D8C4', // Crema (Fondo base)
                        surface: '#FDFBF7', // Superficie de tarjetas (Ligeramente más clara que el fondo)
                        error: '#B00020',
                        info: '#2196F3',
                        success: '#4CAF50',
                        warning: '#FB8C00',
                    },
                    variables: {
                        'border-color': '#C7B7A3',
                        'theme-on-background': '#2C1A1D', // Texto oscuro para contraste
                    }
                },
            },
        },
        defaults: {
            VCard: {
                elevation: 1,
                rounded: 'lg', // border-radius: 16px aprox
            },
            VBtn: {
                rounded: 'lg',
                fontWeight: 'bold',
                letterSpacing: '0.05em',
            },
            VTextField: {
                variant: 'outlined',
                density: 'comfortable',
                color: 'primary',
            },
        },
    })
    app.vueApp.use(vuetify)
})
