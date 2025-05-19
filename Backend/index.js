import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js'
import servicesRoutes from './routes/DataLecturesRoutes.js'

// Variables de entorno
dotenv.config()

// Configurar la app
const app = express()

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173'
}))

// Leer datos via Body
app.use(express.json())

// Conectar a base de datos
db()

// Definir una ruta
app.use('/api/metrics', servicesRoutes)

// Definir un puerto
const PORT = process.env.PORT || 4000

// Arrancar la aplicación
app.listen(PORT, () => {
  console.log(colors.blue('El servidor se está ejecutando en el puerto: ', colors.bold(PORT)))
})
