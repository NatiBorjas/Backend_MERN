const admin = require('firebase-admin')
const config= require('./bd/carrito-firebase.json')
const Producto = require('./productoDaos')

const Productos = new Producto();

class Carrito {
    constructor(){
		admin.initializeApp({
            credential: admin.credential.cert(config),
            databaseURL: 'https://db-backend-30221-default-rtdb.firebaseio.com'
        })
    }

    async nuevoCarrito() {
			const db = admin.firestore();
			const query = db.collection('carritos');
			const fecha = Date.now();
        try {
			const doc = query.doc();
			const carrito = await doc.create({
				time: new Date(fecha).toUTCString(),
				productos: []
			});
			return carrito
        } catch (error) {
            throw Error(error.message);
        }
    }
    
    async agregarProducto(cart_id, prod_id) {
        try {
			let prod = await Productos.getById(prod_id);
			const db = admin.firestore();
			const query = db.collection('carritos');
			const doc = query.doc(cart_id);
			
			prod.cart_id = String(cart_id);

			const agregado = await doc.update({
				productos: admin.firestore.FieldValue.arrayUnion(String(prod))
			});
        } catch (error) {
            throw Error(error.message);
        }
    }

    async getById(cart_id) {
        try {
			const db = admin.firestore();
			const query = db.collection('carritos');
			const doc = query.doc(String(cart_id));
			const encontrado = await doc.get();
			return encontrado.data();
        } catch (error) {
            throw Error(error.message);
        }
    }
    
    async deleteProductById(cart_id, prod_id) {
        try {
			let prod = await Productos.getById(prod_id);
			const db = admin.firestore();
			const query = db.collection('carritos');
			const doc = query.doc(cart_id);

			const eliminado = await doc.update({
				productos: admin.firestore.FieldValue.arrayRemove(String(prod))
			})
			
        } catch (error) {
            throw Error(error.message);
        }
    }

    async deleteById(cart_id) {
        try {
			const db = admin.firestore();
			const query = db.collection('carritos');
			const doc = query.doc(String(cart_id));
			await doc.delete();
			
        } catch (error) {
            throw Error(error.message);
        }
    }

}

module.exports = Carrito;