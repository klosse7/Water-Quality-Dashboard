<template>
    <div>
      <Line :data="chartData" :options="options" />
    </div>
  </template>
  
  <script setup>
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title, Tooltip, Legend,
    LineElement, PointElement,
    CategoryScale, LinearScale
  } from 'chart.js'
  
  ChartJS.register(
    Title, Tooltip, Legend,
    LineElement, PointElement,
    CategoryScale, LinearScale
  )
  
  const props = defineProps(['chartData'])
  
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Mediciones de Calidad de Agua' }
    }
  }
  </script>
  