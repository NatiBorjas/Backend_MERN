
const { options } = require("../options/configDB") ;

const knexProd = require("knex")(options.mariaDB);
const knexChat = require("knex")(options.sqliteDB);

const crearTablaProductos = async () => {
        return await knexProd.schema.hasTable("productos")
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
			}
		})
        .catch((err) => {
            console.log(err);
            throw new Error(err);
        })
        .finally(() => {
            knexProd.destroy();
        });
};

const crearTablaMensajes = async () => {
        return await knexChat.schema.hasTable("mensajes")
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
        .finally(() => {
            knexChat.destroy();
        });
};

module.exports = {crearTablaMensajes, crearTablaProductos}
