const mongoose = require('mongoose');
const prodEsquema = require('./modelsDB/productoSchema')

class Producto {
	connectMDB() {
    try {
			const URL = "mongodb+srv://admin:admin123@ecommerce.nflhe41.mongodb.net/?retryWrites=true&w=majority"
      let rta = mongoose.connect(URL, {
        useNewUrlParser: true,
        useUniFiedTopology: true
      })
    } catch (e) {
      console.log(e)
    }   
  }

  async getAll() {
		try {
			await this.connectMDB();
			const prod = await prodEsquema.find({});
			mongoose.disconnect();
			return prod
		} catch (error) {
      throw Error(error.message);
    }
  }

  async getById(id) {
    try {
			await this.connectMDB();
			const prod = await prodEsquema.findById(id);
			mongoose.disconnect();
			return prod
    } catch (error) {
      throw Error(error.message);
    }
  }

  async save(item) {
    await this.connectMDB();
		const fecha = new Date();
		try {
			function random (min, max) {
	      return Math.floor((Math.random() * (max - min + 1)) + min);
			}
			item.time = new Date(fecha).toUTCString();
			const prodId = random(1,150);
			await prodEsquema.create({...item, prod_id: prodId});
			mongoose.disconnect();
			
			return prodId
		} catch (error) {
        throw Error(error.message);
		}
  }

  async updateById(id, obj) {
    try {
			await this.connectMDB();
			const cambio = await prodEsquema.updateOne({_id: id}, {$set: obj});
			mongoose.disconnect();
			return cambio
    } catch (error) {
      throw Error(error.message);
    }
  }

  async deleteById(id) {
    try {
			await this.connectMDB();
			const eliminado = await prodEsquema.deleteOne({_id: id})
			mongoose.disconnect();
			return eliminado
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Producto;