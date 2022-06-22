import {extraerUnArchivo} from '../middleware/middlewareArchivo.js'
import {postFotosController} from '../controller/controllerMulter.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const routerMulter = new Router (); 
routerMulter.post('/fotos', extraerUnArchivo, postFotosController)