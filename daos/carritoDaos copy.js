const admin = require('firebase-admin')
const {initializeApp} = require('firebase/app')
const {app, firebaseConfig} = require('./bd/config');
// const config = require('./bd/carrito-firebase.json')
const {getDoc, getFirestore, doc, collection} = require('firebase/firestore')
const Producto = require('./productoDaos')

const Productos = new Producto();

class Carrito {
    constructor(){
		admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig),
            databaseURL: 'https://ecommerce-28.firebaseio.com'
        })
    }

    async nuevoCarrito() {
			const db = admin.firestore();
			const query = db.collection('carritos');
			const fecha = new Date();
        try {
			function random (min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            }
			const nuevo = query.doc();
			const carritoId = random(1,150);
			const carritoNuevo = await nuevo.create({
				time: fecha.toUTCString(),
				productos: [],
				cart_id: carritoId
			});
			const appFirestore = getFirestore(app);
			const colRef = doc(appFirestore, 'carritos', carritoNuevo.cart_id);
			// const detalle = doc(query, "carritos", carritoNuevo.cart_id);
			const docSnap = await getDoc(colRef)
			// .then((snapshot) => {
			// 	if(snapshot.exists) {
			// 		return snapshot.data();
			// 	}
			// })
			return docSnap.data()
			
        } catch (error) {
            throw Error(error.message);
        }
    }
    
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
        } catch (error) {
            throw Error(error.message);
        }
    }

    async getAll() {
        try {
			const db = admin.firestore();
			const detail = doc(db, "carritos");
			
			// db.collection('carritos').get()
			// .then((querySnapshot) => {
			// 	querySnapshot.forEach(function(doc) {
			// 		console.log(doc.id, "=>", doc.data());
			// 	})
			// 	})
			// return carritos
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
    
    async deleteProductById(cart_id, prod_id, enCarrito_id) {
        try {
			let prod = await Productos.getById(prod_id);
			const db = admin.firestore();
			const query = db.collection('carritos');
			const doc = query.doc(cart_id);

			prod.cart_id = enCarrito_id

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