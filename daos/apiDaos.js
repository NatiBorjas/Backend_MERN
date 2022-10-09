const {crearProductosApi} = require('../utils/crearProductosApi');
const { generarId } = require('../utils/generadorId');

class ContenedorMemoria {
  constructor() {
    this.items = [];
  }
  guardar(nuevoProducto) {
    this.items.push(nuevoProducto);
    return this.items[this.items.length - 1];
  }
  getAll() {
    return this.items;
  }
  getById(id) {
    const encontrado = this.items.find((item) => item.id == id);
    if (!encontrado) {
      throw new Error("Error al listar: elemento no encontrado");
    } else {
      return encontrado;
    }
  }
}

module.exports = ContenedorMemoria