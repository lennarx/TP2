import assert from 'assert';
import { conectar, desconectar } from "../src/servidor.js";
import axios from "axios";
import { agregarUsuario, obtenerUsuarios,
    obtenerUsuariosPorId, borrarUsuarios } from "../src/usuarios/services/usuarios.js";

const usuariosTest = [
    {
        nombre: "Pepe",
        apellido: "Bueno",
        direccion: '9 de julio 233', 
    },
    {
        nombre: "Juan",
        apellido: "Perez",
        direccion: 'corrientes 860',
    },

    {
        nombre: "Manuela",
        apellido: "Sosa",
        direccion: 'corrientes 860',
    },
    {
        nombre: 'Papa',
        apellido: 'Francisco',
        direccion: 'corrientes 860',
    },
]

console.log('todo ok')
describe("servidor de pruebas", () => {
    let urlUsuarios
    console.log('todo ok')

    before(async () => {
      const port = await conectar()
      urlUsuarios = `http://localhost:${port}/api/usuarios`
    });
    console.log('todo ok')

    after(async () => {
      await desconectar();
    });
  
    beforeEach(() => {
      borrarUsuarios()
    })
  
    afterEach(() => {
      borrarUsuarios()
    })
  
    describe("el servidor esta escuchando", () => {
      describe("al pedirle los usuarios", () => {
        it("devuelve un array con usuarios", async () => {
  
          await agregarUsuario(usuariosTest[0])
          await agregarUsuario(usuariosTest[1])
  
          const { data: usuariosObtenidos, status } = await axios.get(
            urlUsuarios
          );
          assert.strictEqual(status, 200);
          const usuariosReales = await obtenerUsuarios();
          assert.deepStrictEqual(usuariosObtenidos, usuariosReales);
        });

    });

    describe("al pedirle un usuario por id", () => {
      it("devuelve un usuario", async () => {
        const usuarioAgregado = await agregarUsuario(usuariosTest[0])

        let usuarioObtenido
        const { data, status } = await axios.get(urlUsuarios + '/' + usuarioAgregado.id);
        assert.strictEqual(status, 200);

        usuarioObtenido = data
        assert.deepStrictEqual(usuarioObtenido, usuarioAgregado);
      });
    });

    describe("al mandarle un usuario", () => {
        it("la agrega a los demas existentes", async () => {
          const usuariosPrevios = await obtenerUsuarios();
          const usuario = {
                idUsuario:  5,
                nombre: "pepito",
                apellido: "pistolero",
                dirreccion: 'new york 850',
              }
          const { data: usuarioAgregado, status } = await axios.post(
            urlUsuarios,
            usuario
          );
          assert.strictEqual(status, 201);
  
          const usuariosPosteriores = await obtenerUsuarios();
          assert.strictEqual(usuariosPosteriores.length, usuariosPrevios.length + 1);
        });
    });
     
    describe('al pedirle un usuario que no existe', () => {
        it('lanza un error 404', async () => {
          await assert.rejects(
            axios.get(urlUsuarios + '/unIdQueNoExiste'),
            error => {
              assert.strictEqual(error.response.status, 404)
              return true
            }
          )
        })
      })

    describe("al mandarle un usuario mal formateado", () => {
        it("no agrega nada y devuelve un error", async () => {
          const usuariosPrevios = await obtenerUsuarios();
          const usuario = {
            id: 2,
            apellido: "sanchez",
          };
          await assert.rejects(
            axios.post(urlUsuarios, usuario),
            (error) => {
              assert.strictEqual(error.response.status, 400);
              return true;
            }
          );
  
          const usuariosPosteriores = await obtenerUsuarios();
          assert.deepStrictEqual(usuariosPrevios, usuariosPosteriores);
        });
    });
    
    describe("al intentar borrar un usuario", () => {
        describe("al pasarle el id de un usuario existente", () => {
          it("lo remueve de los usuarios existentes", async () => {
            const usuarioAgredo1 = await agregarUsuario(usuariosTest[0])
  
            const { status } = await axios.delete(urlUsuarios + '/' + usuarioAgredo1.id)
            assert.strictEqual(status, 204)
  
            const usuariosPosteriores = await obtenerUsuarios()
            assert.ok(usuariosPosteriores.every(u => u.id !== usuarioAgredo1.id))
        });
    });

    describe("al pasarle el id de un usuario inexistente", () => {
        it("devuelve un 404", async () => {
          await assert.rejects(
            axios.delete(urlUsuarios + '/unIdQueNoExiste'),
            error => {
              assert.strictEqual(error.response.status, 404)
              return true
            }
          )
        });
      });
    });
    describe("Al actualizar un usuario", () => {
        describe('al mandarle un id existente', () => {
          it('reemplaza al preexistente por el nuevo', async () => {
            const usuarioAgregado1 = await agregarUsuario(usuariosTest[0])
  
            const datosActualizados = usuariosTest[1]
  
            const { status } = await axios.put(urlUsuarios + '/' + usuarioAgregado1.id, datosActualizados)
            assert.strictEqual(status, 200)
  
            const usuarioBuscado = await obtenerUsuariosPorId(usuarioAgregado1.id)
            datosActualizados.id = usuarioBuscado.id
            assert.deepStrictEqual(usuarioBuscado, datosActualizados)
          })
        })
      })    
    });
  });
  
  