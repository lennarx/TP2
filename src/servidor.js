import express from "express";
import { obtenerVentaPorId, obtenerVentas, insertarVenta } from "./ventas.js";

const app = express();

app.use(express.json());

//cual forma sería mejor para enviar parametros
// GET /ventas?id=1 & y otro paramentro --> de esta manera se pueden enviar varios parametros
// se usa el query
// y valida ventastotales y ventasporid
app.get("/ventas", (req, res) => {
  const id = req.query.id;
  let ventas = null;
  if (id) {
    ventas = obtenerVentaPorId(id);
  } else {
    ventas = obtenerVentas();
  }
  res.json(ventas);
});

// GET /ventas/1
//se usa el param
//se hacen 2 get, 1 para cada metodo
app.get("/ventas/:id", (req, res) => {
  const id = req.params.id;
  const venta = obtenerVentaPorId(id);
  res.json(venta);
});

app.get("/ventas", (req, res) => {
    const ventas = obtenerVentas();
    res.json(ventas);
  });

app.post("/ventas", (req, res) => {
  try {
    const venta = req.body;
    const ventaAgregada = insertarVenta(venta);
    res.status(201).json(ventaAgregada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

let server;

export function conectar() {
  return new Promise((resolve, reject) => {
    server = app.listen(3000, () => {
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
