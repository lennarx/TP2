import assert from 'assert'
import axios from 'axios'
import { conectar, desconectar } from '../src/servidor.js'

import { obtenerProductoPorId, obtenerProductos } from '../src/productos.js'

//insertarProducto, borrarProductoSegunId, reemplazarProducto
describe("servidor de pruebas", () => {
  before(async () => {
    await conectar();
  });

  after(async () => {
    await desconectar();
  });

  describe("el servidor esta escuchando", () => {
    describe("al pedirle los Productos", () => {
      it("devuelve un array con Productos", async () => {
        const { data: productosObtenidos, status } = await axios.get(
          "http://localhost:3000/Productos"
        );
        assert.strictEqual(status, 200);
        const productosReales = obtenerProductos();
        assert.deepStrictEqual(productosObtenidos, productosReales);
      });
    });

    describe("al pedirle un Producto por id", () => {
        it("devuelve un Producto", async () => {
          const { data: productosObtenidos, status } = await axios.get(
            "http://localhost:3000/Productos/1"
          );
          assert.strictEqual(status, 200);
          const ventaReal = obtenerProductoPorId('1');
          assert.deepStrictEqual(productosObtenidos, ventaReal);
        });
      });

    describe("al mandarle un Producto", () => {
      it("lo agrega a los demas existentes", async () => {
        const productosAntes = obtenerProductos();
        const Producto = {
          productos: [
            {
              id: 1,
              nombreProducto: "Mesa + sillas",
              descripcionProducto: '1x1,60 - 4 sillas de madera - DecoHouse',
              precioProducto: 20000,
            },
          ],
        };
        const { data: productoAgregado, status } = await axios.post(
          "http://localhost:3000/ventas",
          Producto
        );
        assert.strictEqual(status, 201);

        const prodcutosDespues = obtenerProductos();
        assert.strictEqual(prodcutosDespues.length, productosAntes.length + 1);
      });
    });

    describe("al mandarle un Producto mal formateada", () => {
      it("no agrega nada y devuelve un error", async () => {
        const prdocutosAntes = obtenerProductos();
        const producto = {
          id: 2,
          catalogo: "Linea blanca",
        };

        await assert.rejects(
            axios.post('http://localhost:3000/productos', producto),
            error => {
                assert.strictEqual(error.response.status, 400)
                return true
            }
        );

        const productosDespues = obtenerProductos();
        assert.deepStrictEqual(productosDespues, prdocutosAntes);
      });
    });
  });
});