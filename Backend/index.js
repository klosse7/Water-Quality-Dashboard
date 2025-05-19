import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js'
import servicesRoutes from './routes/DataLecturesRoutes.js'

// Variables de entorno
dotenv.config()

// Crear aplicación
const app = express()

// Middleware CORS para desarrollo y producción
const allowedOrigins = [
  'http://localhost:5173',
  'https://water-quality-monitoring-dashboard.netlify.app'
]

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sin origin (como Postman o curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('CORS no permitido para esta dirección'))
    }
  },
  credentials: true
}))

// Middleware para JSON
app.use(express.json())

// Conectar a la base de datos
db()

// Rutas de la API
app.use('/api/metrics', servicesRoutes)

// Puerto
const PORT = process.env.PORT || 4000

// Iniciar servidor
app.listen(PORT, () => {
  console.log(colors.blue('🚀 Servidor escuchando en puerto:'), colors.bold(PORT))
})
