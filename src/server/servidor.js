import express from "express";
import { routerVentas } from "../ventas/router/routerVentas.js";
import { routerProductos } from "../productos/router/routerProductos.js";
import {routerUsuarios} from "../usuarios/router/routerUsuarios.js";
import { routerLogin } from "../login/router/routerLogin.js";
import { manejadorDeErrores } from '../shared/errors/middlewares/errorHandler.js'


const app = express();

app.use(express.json());

app.use('/api/ventas', routerVentas)
app.use('/api/productos', routerProductos)
app.use('/api/usuarios', routerUsuarios)
app.use('/api/login', routerLogin)
app.use(manejadorDeErrores)

let server;

export function conectar(port = 0) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      resolve(server.address().port);
    });
    server.on("error", (error) => {
      reject(error);
    });
  });
}

export function desconectar() {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
