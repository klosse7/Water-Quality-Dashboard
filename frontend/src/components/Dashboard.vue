<template>
  <v-container fluid>
    <v-alert
      v-if="error"
      type="error"
      color="red lighten-4"
      class="mb-4"
    >
      ⚠️ Error al cargar datos del backend. Verifica la conexión o si hay lecturas disponibles.
    </v-alert>

    <v-alert
      v-else
      type="info"
      color="blue lighten-5"
      class="mb-4"
      border="start"
      border-color="blue"
      elevation="1"
    >
      <strong>Última lectura:</strong> {{ ultimaFecha }}
    </v-alert>

    <v-row class="mb-4" justify="center">
      <v-col
        v-for="(card, index) in cards"
        :key="index"
        cols="12"
        sm="6"
        md="6"
        lg="3"
      >
        <v-card elevation="2" class="pa-3" :class="card.borderClass">
          <v-card-title class="text-h6 d-flex align-center justify-space-between">
            <v-icon :color="card.statusColor">{{ card.icon }}</v-icon>
            <span>{{ card.title }}</span>
          </v-card-title>
          <v-card-subtitle>
            <strong>Estado:</strong>
            <span :class="`text-${card.statusColor}`">{{ card.status }}</span>
          </v-card-subtitle>
          <v-card-text>
            <v-progress-circular
              :size="100"
              :width="10"
              :model-value="card.progress"
              :color="card.statusColor"
              class="mt-4"
            >
              <span class="progress-value">{{ card.value }}</span>
            </v-progress-circular>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Mapa -->
    <v-row>
      <v-col cols="12">
        <div id="map" style="height: 400px; border-radius: 12px;"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'

const API_URL = import.meta.env.VITE_API_URL
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

const ultimaFecha = ref('Cargando...')
const error = ref(false)

const cards = reactive([
  {
    title: 'Nivel de pH',
    icon: 'mdi-water',
    value: '',
    progress: 0,
    status: '',
    statusColor: '',
    borderClass: ''
  },
  {
    title: 'Conductividad Eléctrica',
    icon: 'mdi-flash',
    value: '',
    progress: 0,
    status: '',
    statusColor: '',
    borderClass: ''
  },
  {
    title: 'Temperatura',
    icon: 'mdi-thermometer',
    value: '',
    progress: 0,
    status: '',
    statusColor: '',
    borderClass: ''
  },
  {
    title: 'Turbidez',
    icon: 'mdi-water-outline',
    value: '',
    progress: 0,
    status: '',
    statusColor: '',
    borderClass: ''
  }
])

let mapa = null
let marcador = null

function actualizarTarjetas(data) {
  if (
    !data ||
    typeof data.ph !== 'number' ||
    typeof data.tds !== 'number' ||
    typeof data.temperatura !== 'number' ||
    typeof data.turbidez !== 'number' ||
    !data.ubicacion ||
    typeof data.ubicacion.lat !== 'number' ||
    typeof data.ubicacion.lon !== 'number'
  ) {
    console.warn('❗ Datos incompletos. Se omitió la actualización.')
    error.value = true
    return
  }

  error.value = false
  ultimaFecha.value = new Date(data.fecha).toLocaleString()

  // pH
  const ph = data.ph
  cards[0].value = `${ph.toFixed(2)} pH`
  cards[0].progress = ph * 10
  cards[0].status = ph < 6.5 ? 'Ácido' : ph > 8.5 ? 'Alcalino' : 'Normal'
  cards[0].statusColor = ph < 6.5 ? 'orange' : ph > 8.5 ? 'blue' : 'green'
  cards[0].borderClass = `border-${cards[0].statusColor}`

  // EC
  const ec = data.tds
  cards[1].value = `${ec} μS/cm`
  cards[1].progress = ec / 10
  cards[1].status = ec < 500 ? 'Baja' : ec < 1500 ? 'Moderada' : 'Alta'
  cards[1].statusColor = ec < 500 ? 'green' : ec < 1500 ? 'orange' : 'red'
  cards[1].borderClass = `border-${cards[1].statusColor}`

  // Temperatura
  const temp = data.temperatura
  cards[2].value = `${temp.toFixed(1)}°C`
  cards[2].progress = temp * 2
  cards[2].status = temp < 15 ? 'Muy Fría' : temp > 30 ? 'Caliente' : 'Óptima'
  cards[2].statusColor = temp < 15 ? 'blue' : temp > 30 ? 'red' : 'green'
  cards[2].borderClass = `border-${cards[2].statusColor}`

  // Turbidez
  const turb = data.turbidez
  cards[3].value = `${turb.toFixed(1)} NTU`
  cards[3].progress = turb * 10
  cards[3].status = turb < 5 ? 'Baja' : turb < 10 ? 'Media' : 'Alta'
  cards[3].statusColor = turb < 5 ? 'green' : turb < 10 ? 'orange' : 'red'
  cards[3].borderClass = `border-${cards[3].statusColor}`

  // Mapa
  const coords = [data.ubicacion.lon, data.ubicacion.lat]
  if (!mapa) {
    mapa = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coords,
      zoom: 14
    })
    marcador = new mapboxgl.Marker().setLngLat(coords).addTo(mapa)
  } else {
    mapa.setCenter(coords)
    marcador.setLngLat(coords)
  }
}

async function fetchUltimaLectura() {
  try {
    const res = await axios.get(`${API_URL}/api/metrics/last`)
    actualizarTarjetas(res.data)
  } catch (err) {
    error.value = true
    console.error('Error al cargar datos del backend:', err)
  }
}

onMounted(() => {
  fetchUltimaLectura()
  setInterval(fetchUltimaLectura, 5000)
})
</script>

<style scoped>
.border-green {
  border: 3px solid #4CAF50;
  border-radius: 12px;
}
.border-orange {
  border: 3px solid #FB8C00;
  border-radius: 12px;
}
.border-red {
  border: 3px solid #B71C1C;
  border-radius: 12px;
}
.border-blue {
  border: 3px solid #2196F3;
  border-radius: 12px;
}

.progress-value {
  font-size: 14px;
  text-align: center;
  white-space: normal;
  word-break: break-word;
  max-width: 70px;
  display: inline-block;
}
</style>
