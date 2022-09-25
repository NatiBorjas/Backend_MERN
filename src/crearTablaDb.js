
const { options } = require("../options/configDB") ;

const knexProd = require("knex")(options.mariaDB);
const knexChat = require("knex")(options.sqliteDB);

const crearTablaProductos = async () => {
        await knexProd.schema.hasTable("productos")
		.then(function(exists){
			if (!exists) {
				return knexProd.schema.createTable("productos", (table) => {
				table.increments("id_prod"), 
				table.string("nombre"), 
				table.string("descripcion"), 
				table.integer("precio");
				table.string("img");
				table.integer("stock");  
				})
			} else {
			}
		})
        .catch((err) => {
            console.log(err);
            throw new Error(err);
        })
};

const crearTablaMensajes = async () => {
        await knexChat.schema.hasTable("mensajes")
		.then(function(exists){
			if (!exists) {
				return knexChat.schema.createTable("mensajes", (table) => {
					table.increments("id_msje"), 
					table.string("correo"), 
					table.string("mensaje"), 
					table.string("fecha")  
				})
			}
		})
        .catch((err) => {
            console.log(err);
            throw new Error(err);
        })
};

module.exports = {crearTablaMensajes, crearTablaProductos}
