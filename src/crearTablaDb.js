import knex from "knex";
import { options } from "./options/configDB.js";

const knexProd = knex(options.mariaDB);
const knexChat = knex(options.sqliteDB);

export const crearTablaProd = async () => {
    try {
        await knexProd.schema.createTableIfNotExists("productos", (table) => {
            table.increments("id_prod"), 
            table.string("nombre"), 
            table.string("descripcion"), 
            table.integer("precio");
            table.string("img");
            table.integer("stock");        
        })
        .then(() => {
            console.log("Tabla creada exitosamente");
        })
        .catch((err) => {
            console.log(err);
            throw new Error(err);
        })
        .finally(() => {
            knexProd.destroy();
        });
    } catch (error) {
        console.log(error)
    };
};
export const crearTablaChat = async () => {
    try {
        await knexChat.schema.createTableIfNotExists("chat", (table) => {
            table.increments("id_msje"), 
            table.string("correo"), 
            table.string("mensaje"), 
            table.string("fecha")
        })
        .catch((err) => {
            console.log(err);
            throw new Error(err);
        })
        .finally(() => {
            knexChat.destroy();
        });
    } catch (error) {
        console.log(error)
    };
};
