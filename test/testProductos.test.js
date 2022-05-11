import assert from 'assert'
import axios from 'axios'
import { conectar, desconectar } from '../src/servidor.js'

import { 
  obtenerProductoPorId, obtenerProductos, 
  agregarProducto, borrarProductos } 
from '../src/productos/productos.js'

const productosTest = [
  {
    id: 1,
    nombreProducto: 'Heladera',
    descripcionProducto: 'No Frost - 44 litros',
    precioProducto: 60000
  },
  {
    idProducto: 2,
    nombreProducto: 'Microondas',
    descripcionProducto: 'Microondas - Horno Electrico - Grill - Función descongelar',
    precioProducto: 80000
  },
  {
    idProducto: 3,
    nombreProducto: 'Cocina',
    descripcionProducto: 'Gas Natural - 6 hornallas - Convertible a Gas Envasado',
    precioProducto: 80000
  },
  {
    idProducto: 4,
    nombreProducto: 'TV 60 Pulgadas',
    descripcionProducto: '60 Pulgadas - 3 lineas HDMI - Smart',
    precioProducto: 80000
  }
]


//insertarProducto, borrarProductoSegunId, reemplazarProducto
describe("servidor de pruebas", () => {
  let urlProductos

  before(async () => {
    const port = await conectar()
    urlProductos = `http://localhost:${port}/api/productos`
  });

  after(async () => {
    await desconectar();
  });

  beforeEach(() => {
    borrarProductos()
  })

  afterEach(() => {
    borrarProductos()
  })
  describe("el servidor esta escuchando", () => {
    describe("al pedirle los Productos", () => {
      it("devuelve un array con Productos", async () => {
        
        await agregarProducto(productosTest[0])
        await agregarProducto(productosTest[1])

        const { data: productosObtenidos, status } = await axios.get(
          urlProductos
        );
        assert.strictEqual(status, 200);
        const productosReales = obtenerProductos();
        assert.deepStrictEqual(productosObtenidos, productosReales);
      });
    });

    describe("al pedirle un Producto por id", () => {
        it("devuelve un Producto", async () => {
          const productoAgregado = await agregarProducto(productosTest[0])

          let productoObtenido
          const { data, status } = await axios.get(urlProductos + '/' + productoAgregado.id);
          assert.strictEqual(status, 200);
  
          productoObtenido = data
          assert.deepStrictEqual(productoObtenido, productoAgregado);
        });
      });

    describe("al mandarle un Producto", () => {
      it("lo agrega a los demas existentes", async () => {
        const productosAntes = obtenerProductos();
        const Producto = {
          productos: [
            {
              id: 1,
              nombreProducto: 'Mesa + sillas',
              descripcionProducto: '1x1,60 - 4 sillas de madera - DecoHouse',
              precioProducto: 20000,
            },
          ],
        };
        const { data: productoAgregado, status } = await axios.post(
          "http://localhost:3000/productos",
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
          catalogo: 'Linea blanca',
        };

        await assert.rejects(
            axios.post(urlProductos, producto),
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