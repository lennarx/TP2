
export function postFotosController(req, res, next) {
    if (req.file) {
        res.json({
            info: 'foto subida con exito',
            datos: req.file
        })
    } else {
        const fotoError = new Error('falta cargar imagen')
        fotoError.tipo = 'MISSING_FILE'
        next(fotoError)
    }
}