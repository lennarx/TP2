// // import { MongoClient } from "mongodb"
// // const uri = "mongodb://localhost:27017";
// // const client = new MongoClient(uri);

// // await client.connect();

// // const database = client.db('TP2');
// // const ventas = database.collection('Ventas');

// // export async function guardarVenta(venta) {
// //     const result = await ventas.updateOne({ id: venta.id }, { $set: venta }, { upsert: true })
// //     return
// // }

// // export async function obtenerVentaPorId(id) {
// //     const ventaBuscada = await ventas.findOne({ id }, { projection: { _id: 0 } })
// //     if (ventaBuscada) {
// //         return ventaBuscada
// //     } else {
// //         throw Error('')
// //     }
// // }

// // export async function recuperarVentas() {
// //     const ventasArray = await ventas.find().project({ _id: 0 }).toArray();
// //     return ventasArray
// // }

// // export async function obtenerVentasSegunUsuario(idUsuario) {
// //     return await ventas.find({ usuario: { $all: [idUsuario] } }).project({ _id: 0 }).toArray()
// // }

// // export async function borrarVentaPorId(id) {
// //     const result = await ventas.deleteOne({ id })
// //     if (result.deletedCount === 0) {
// //         throw Error('')
// //     }
// // }

// // export async function borrarVentas() {
// //     await ventas.deleteMany({})
// // }

// export async function nombreEstaDisponible(nombre) {
//     const result = await carreras.findOne({ nombre });
//     return !result
// }
