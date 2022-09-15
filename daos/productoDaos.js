const mongoose = require('mongoose');
const prodEsquema = require('./modelsDB/productoSchema')

class Producto {
	async connectMDB() {
        try {
            const URL = "mongodb+srv://admin:admin.456@ecommerce.dsjesne.mongodb.net/?retryWrites=true&w=majority"
            let rta = await mongoose.connect(URL, {
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
			const fecha = Date.now();
			await this.connectMDB();
			item.time = new Date(fecha).toUTCString();
			await prodEsquema.create(item);
			const id = item.prod_id;
			mongoose.disconnect();
			return id
        } catch (error) {
            throw Error(error.message);
        }
    }
    
    async update(id, obj) {
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
			return prod
        } catch (error) {
            throw Error(error.message);
        }
    }
}

module.exports = Producto;