const mongoose = require('mongoose')

const prodEsquema = new mongoose.Schema({
    nombre: {type: String, require: true},
    descripcion: {type: String, require: true},
    precio: {type: Number, require: true},
    img: {type: String, require: true},
    stock: {type: Number, require: true},
    prod_id: {type: Number, require: true},
    cart_id: {type: Number, require: false},
    time: {type: String, require: false}
})

module.exports = mongoose.model('productos', prodEsquema)