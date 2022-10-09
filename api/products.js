const ContenedorMemoria = require('../daos/apiDaos.js');
const { crearProductosApi } = require('../utils/crearProductosApi.js');
const { generarId } = require('../utils/generadorId.js')

class ApiProductosMock extends ContenedorMemoria {
  constructor() { 
		super() 
	}
  popular(cant = 5) {
		const productos = []
    for (let i = 0; i < cant; i++) {
      const nuevoProducto = crearProductosApi(generarId());
      const guardado = this.guardar(nuevoProducto)
      productos.push(guardado)
    }
    return productos
  }
}

module.exports = ApiProductosMock
