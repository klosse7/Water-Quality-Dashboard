<template>
    <v-app>
      <!-- Barra Superior -->
      <v-app-bar color="teal" dark app>
        <v-toolbar-title>Sistema de Monitoreo de Calidad de Agua</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <!-- Menú desplegable para reportes -->
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn v-bind="props" color="white" text>
              Reportes
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/reportes/semana">
              <v-list-item-title>Últimos 7 días</v-list-item-title>
            </v-list-item>
            <v-list-item to="/reportes/mes">
              <v-list-item-title>Último mes</v-list-item-title>
            </v-list-item>
            <v-list-item to="/reportes/3meses">
              <v-list-item-title>Últimos 3 meses</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
  
      <v-main>
        <RouterView />
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  // No necesita lógica adicional aquí
  </script>
  