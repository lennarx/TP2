import { conectar } from './servidor.js'

const port = await conectar()

console.log(`servidor inicializado en puerto ${port}`)