import { conectar } from './server/servidor.js'

const PORT = 8080
const port = await conectar(PORT)

console.log(`servidor inicializado en puerto ${port}`)