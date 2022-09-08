import knex from "knex";
import { options } from "./options/configDB.js";
const knexChat = knex(options.sqliteDB);

class Mensajes {
    constructor(knexChat, tabla){
        this.knexChat = knexChat;
        this.tabla= tabla;
    }

    async getAll() {
        try {
            const data = await this.knexChat(this.tabla);
            return data;
        } catch (error) {
            console.log(`Hubo un error con la base: ${this.knexChat}`);
        }
    }

    async save(msje) {
        try {
            await this.knexChat(this.tabla).insert(msje);
            return msje
        } catch (error) {
            console.log("Hubo un error:" + error);
        }
    }
}

export const mensajes = new Mensajes(knexChat, "chat");
