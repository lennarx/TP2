import assert from "assert";
import axios from "axios";
import { conectar, desconectar } from "../src/servidor.js";

import {
  obtenerVentas, agregarVenta,
  borrarVentas,
  obtenerVentasPorId
} from '../src/ventas/services/ventas.js'

const ventasTest = [
  {
    idUsuario: 1,
    productos: [
      {
        idProducto: 1,
        nombreProducto: 'Heladera',
        precioProducto: 60000
      },
      {
        idProducto: 2,
        nombreProducto: 'Microondas',
        precioProducto: 80000
      }
    ]
  },
  {
    idUsuario: 2,
    productos: [
      {
        idProducto: 1,
        nombreProducto: 'Heladera',
        precioProducto: 60000
      },
      {
        idProducto: 2,
        nombreProducto: 'Microondas',
        precioProducto: 80000
      }
    ]
  }
]


describe("servidor de pruebas", () => {
  let urlVentas

  before(async () => {
    const port = await conectar()
    urlVentas = `http://localhost:${port}/api/ventas`
  });

  after(async () => {
    await desconectar();
  });

  beforeEach(() => {
    borrarVentas()
  })

  afterEach(() => {
    borrarVentas()
  })

  describe("el servidor esta escuchando", () => {
    describe("al pedirle las ventas", () => {
      it("devuelve un array con ventas", async () => {

        await agregarVenta(ventasTest[0])
        await agregarVenta(ventasTest[1])

        const { data: ventasObtenidas, status } = await axios.get(
          urlVentas
        );
        assert.strictEqual(status, 200);
        const ventasReales = obtenerVentas();
        assert.deepStrictEqual(ventasObtenidas, ventasReales);
      });
    });

    describe("al pedirle una venta por id", () => {
      it("devuelve una venta", async () => {
        const ventaAgregada = await agregarVenta(ventasTest[0])

        let ventaObtenida
        const { data, status } = await axios.get(urlVentas + '/' + ventaAgregada.id);
        assert.strictEqual(status, 200);

        ventaObtenida = data
        assert.deepStrictEqual(ventaObtenida, ventaAgregada);
      });
    });

    describe("al mandarle una venta", () => {
      it("la agrega a las demas existentes", async () => {
        const ventasAntes = obtenerVentas();
        const venta = {
          idUsuario: 1,
          productos: [
            {
              idProducto: 1,
              nombreProducto: "Heladera",
              precioProducto: 60000,
            },
          ],
        };
        const { data: ventaAgregada, status } = await axios.post(
          urlVentas,
          venta
        );
        assert.strictEqual(status, 201);

        const ventasDespues = obtenerVentas();
        assert.strictEqual(ventasDespues.length, ventasAntes.length + 1);
      });
    });

    describe('al pedirle una venta que no existe', () => {
      it('lanza un error 404', async () => {
        await assert.rejects(
          axios.get(urlVentas + '/unIdQueNoExiste'),
          error => {
            assert.strictEqual(error.response.status, 404)
            return true
          }
        )
      })
    })

    describe("al mandarle una venta mal formateada", () => {
      it("no agrega nada y devuelve un error", async () => {
        const ventasAntes = obtenerVentas();
        const venta = {
          id: 2,
          catalogo: "Linea blanca",
        };

        await assert.rejects(
          axios.post(urlVentas, venta),
          error => {
            assert.strictEqual(error.response.status, 400);
            return true;
          }
        );

        const ventasDespues = obtenerVentas();
        assert.deepStrictEqual(ventasDespues, ventasAntes);
      });
    });

    describe("al intentar borrar una venta", () => {
      describe("al pasarle el id de una venta existente", () => {
        it("la remueve de las ventas existentes", async () => {
          const ventaAgregada1 = await agregarVenta(ventasTest[0])

          const { status } = await axios.delete(urlVentas + '/' + ventaAgregada1.id)
          assert.strictEqual(status, 204)

          const ventasDespues = obtenerVentas()
          assert.ok(ventasDespues.every(v => v.id !== ventaAgregada1.id))
        });
      });

      describe("al pasarle el id de una venta inexistente", () => {
        it("devuelve un 404", async () => {
          await assert.rejects(
            axios.delete(urlVentas + '/unIdQueNoExiste'),
            error => {
              assert.strictEqual(error.response.status, 404)
              return true
            }
          )
        });
      });
    });

    describe("Al actualizar una venta", () => {
      describe('al mandarle un id existente y una venta valida', () => {
        it('reemplaza la preexistente por la nueva', async () => {
          const ventaAgregada1 = await agregarVenta(ventasTest[0])

          const datosActualizados = ventasTest[1]

          const { status } = await axios.put(urlVentas + '/' + ventaAgregada1.id, datosActualizados)
          assert.strictEqual(status, 200)

          const ventaBuscada = obtenerVentasPorId(ventaAgregada1.id)
          datosActualizados.id = ventaBuscada.id
          assert.deepStrictEqual(ventaBuscada, datosActualizados)
        })
      })
    })    
  });
});

