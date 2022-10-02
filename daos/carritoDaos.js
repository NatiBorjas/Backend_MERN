const admin = require('firebase-admin')
const config = require('./bd/carrito-firebase.json')
const Producto = require('./productoDaos')

const Productos = new Producto();

class Carrito {
  constructor(){
		admin.initializeApp({
      credential: admin.credential.cert(config),
      databaseURL: 'https://ecommerce-28.firebaseio.com'
    })
  }
	
// VER CARRITOS (clg) //
  async getAll() {
    try {
			const db = admin.firestore();
			db.collection('carritos').get()
			.then((querySnapshot) => {
				querySnapshot.forEach(function(doc) {
					console.log(doc.id, "=>", doc.data());
				})
			})
		} catch (error) {
      throw Error(error.message);
    }
  }

// CREAR CARRITO //
  async nuevoCarrito() {
		const db = admin.firestore();
		const query = db.collection('carritos');
		const fecha = new Date();
    try {
			function random (min, max) {
      	return Math.floor((Math.random() * (max - min + 1)) + min);
      }
			const doc = query.doc();
			const carritoId = random(1,150);
			const carrito = await doc.create({
				time: fecha.toUTCString(),
				productos: [],
				cart_id: carritoId
			});
			return carrito
    } catch (error) {
      throw Error(error.message);
    }
  }

// AGREGAR PRODUCTO AL CARRITO //
  async agregarProducto(cart_id, prod_id) {
    try {
      function random (min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
      }			
			let prod = await Productos.getById(prod_id);
			const db = admin.firestore();
			const query = db.collection('carritos');
			const doc = query.doc(cart_id);
			let randomId = random (1,150);
			prod.cart_id = String(randomId);
			const agregado = await doc.update({
				productos: admin.firestore.FieldValue.arrayUnion(String(prod))
			});
			return agregado
    } catch (error) {
      throw Error(error.message);
    }
  }

// ELIMINAR PRODUCTO DE CARRITO //
  async deleteProductById(cart_id, prod_id, idEncarrito) {
		try {
			const db = admin.firestore();
			const query = db.collection('carritos');
			let prodBorrar = query.doc(String(prod_id))
			const doc = query.doc(cart_id);
			prodBorrar.cart_id = idEncarrito
			await doc.update({
				productos: admin.firestore.FieldValue.arrayRemove(String(prodBorrar))
			})
    } catch (error) {
      throw Error(error.message);
    }
  }

// ELIMINAR CARRITO //
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