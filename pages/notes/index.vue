<template>
  <div>
    <h1 class="text-h3 font-weight-bold text-primary mb-4 font-display">Notas de Investigación</h1>
    <p class="text-secondary opacity-70 mb-8">
      Tus anotaciones personales y observaciones de campo.
    </p>

    <v-row>
      <v-col cols="12" md="6">
         <v-card color="white" class="pa-6 rounded-xl elevation-1 border-accent">
            <div class="d-flex align-center mb-4">
              <v-icon color="secondary" class="mr-2">mdi-notebook-outline</v-icon>
              <h3 class="text-h6 font-weight-bold text-primary">Registro de Perforación #45</h3>
            </div>
            <p class="text-body-2 text-secondary mb-4">
              Notas sobre anomalías de presión observadas durante el ejercicio de simulación del Módulo 3.
            </p>
            <v-chip size="small" color="accent" variant="flat">Última edición: hace 2h</v-chip>
         </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.font-display {
  font-family: 'Playfair Display', serif !important;
}
.border-accent {
  border: 1px solid rgba(199, 183, 163, 0.3);
}
</style>
