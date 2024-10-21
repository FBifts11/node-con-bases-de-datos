import express from 'express'
import { expressConfig } from './config.js'
import alumnosRoutes from './routes/alumnos.routes.js'

// import './database/conexion.js'

const app = express()

app.set('port', expressConfig.port)
app.set('host', expressConfig.host);

app.use(express.json()) //middleware
app.use(alumnosRoutes)

app.listen(app.get('port'),app.get('host'), () => {
    console.log(`Serivdor corriendo en 'http://${app.get('host')}:${app.get('port')}`)
})