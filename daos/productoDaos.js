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

    async save(item) {
        try {
			const date = Date.now();
			await this.connectMDB();
			item.fecha = new Date(date).toUTCString();
			await prodEsquema.create(item);
			const id = item.prod_id;
			mongoose.disconnect();
			return id
        } catch (error) {
            throw Error(error.message);
        }
    }
    
    async updateById(id, obj) {
        try {
			await this.connectMDB();
			const cambio = await prodEsquema.updateOne({prod_id: id}, {$set: obj});
			mongoose.disconnect();
			return cambio
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
    
    async deleteById(id) {
        try {
			await this.connectMDB();
			const eliminado = await prodEsquema.deleteOne({prod_id: id})
			mongoose.disconnect();
			return eliminado
        } catch (error) {
            throw Error(error.message);
        }
    }
}

module.exports = Producto;