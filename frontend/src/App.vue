<template>
  <v-app>
    <!-- Barra superior -->
    <v-app-bar color="teal" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Sistema de Monitoreo de Calidad de Agua</v-toolbar-title>
    </v-app-bar>

    <!-- Menú lateral -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item to="/" title="Dashboard" />
        <v-list-group prepend-icon="mdi-file-chart" value="true">
          <template #activator="{ props }">
            <v-list-item v-bind="props" title="Reportes"></v-list-item>
          </template>
          <v-list-item to="/reportes/semana" title="Últimos 7 días" />
          <v-list-item to="/reportes/mes" title="Último mes" />
          <v-list-item to="/reportes/3meses" title="Últimos 3 meses" />
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Contenido principal -->
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>
