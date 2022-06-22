import { obtenerNuevoId } from '../../shared/ids/ids.js'
import { crearErrorDeDatosFaltantes } from '../../shared/errors/models/ErrorDeDatosFaltantes.js'

export const crearProducto = (datos) => {
  if (!datos.nombreProducto) {
    throw crearErrorDeDatosFaltantes('nombreProducto')
  }

  const producto = {
    id: obtenerNuevoId("producto"),
    nombreProducto: datos.nombreProducto,
    descripcionProducto: datos.descripcionProducto,
    precioProducto: datos.precioProducto,
  };

  return producto;
};