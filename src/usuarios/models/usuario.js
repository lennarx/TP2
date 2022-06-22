import { obtenerNuevoId } from '../../shared/ids/ids.js'
import { crearErrorDeDatosFaltantes } from '../../shared/errors/models/ErrorDeDatosFaltantes.js'

export const crearUsuario = (datos) => {
    if (!datos.nombre || !datos.apellido) {
        throw crearErrorDeDatosFaltantes('nombre y apellido')
    }

    const usuario ={
        id : obtenerNuevoId('usuario'),
        nombre : datos.nombre,
        apellido : datos.apellido,
        direccion : datos.direccion,
    }
        
    return usuario;
}
