import express from 'express'

const app = express()

app.use(express.json())

let server

export function conectar() {
    return new Promise((resolve, reject) => {
        server = app.listen(3000, () => {
            resolve(server.address().port)
        })
        server.on('error', error => {
            reject(error)
        })
    })
}

export function desconectar() {
    return new Promise((resolve, reject) => {
        server.close(error => {
            if (error) {
                reject(error)
            } else {
                resolve()
            }
        })
    })
}