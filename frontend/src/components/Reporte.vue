<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="(chartData, index) in charts"
        :key="index"
        cols="12"
        sm="12"
        md="6"
        xl="6"
      >
        <v-card class="pa-4 mb-4" elevation="2">
          <v-card-title>{{ chartData.title }}</v-card-title>
          <v-card-text>
            <line-chart :chart-data="chartData.data" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import LineChart from '@/components/LineChart.vue'

const route = useRoute()
const charts = ref([])

const API_URL = import.meta.env.VITE_API_URL

const fetchData = async () => {
  const periodosMap = {
    'semana': 'last-7-days',
    'mes': 'last-month',
    '3meses': 'last-3-months'
  }

  const endpoint = periodosMap[route.params.periodo] || 'last-7-days'

  try {
    const response = await axios.get(`${API_URL}/api/metrics/${endpoint}`)
    const data = response.data
    const labels = data.map(d => new Date(d.fecha).toLocaleDateString())

    charts.value = [
      {
        title: 'Nivel de pH',
        data: {
          labels,
          datasets: [
            { label: 'pH', data: data.map(d => d.ph), borderColor: 'green', fill: false, tension: 0.3 }
          ]
        }
      },
      {
        title: 'Conductividad Eléctrica',
        data: {
          labels,
          datasets: [
            { label: 'EC (μS/cm)', data: data.map(d => d.tds), borderColor: 'orange', fill: false, tension: 0.3 }
          ]
        }
      },
      {
        title: 'Temperatura',
        data: {
          labels,
          datasets: [
            { label: 'Temperatura (°C)', data: data.map(d => d.temperatura), borderColor: 'red', fill: false, tension: 0.3 }
          ]
        }
      },
      {
        title: 'Turbidez',
        data: {
          labels,
          datasets: [
            { label: 'Turbidez (NTU)', data: data.map(d => d.turbidez), borderColor: 'blue', fill: false, tension: 0.3 }
          ]
        }
      }
    ]
  } catch (error) {
    console.error('Error al cargar los datos:', error)
  }
}

onMounted(fetchData)
watch(() => route.params.periodo, fetchData)
</script>

<style scoped>
@media (max-width: 600px) {
  .v-card-title {
    font-size: 1rem;
  }
  canvas {
    max-width: 100% !important;
  }
}
</style>
