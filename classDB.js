const { optionsMariadb } = require("./options/mariaDB");
const productosDB = require("knex")(optionsMariadb);
const optionsSQLite = require("./options/sqlite");
const mensajesDB = optionsSQLite;

class Productos {
    constructor(rutaDB, tabla){
        this.rutaDB = rutaDB;
        this.tabla= tabla;
    }

    // CREAR TABLA // 
    async crearTabla(nombreTabla) {
        await this.rutaDB.schema
            .createTable(nombreTabla, (table) => {
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
                this.rutaDB.destroy();
            });
    }

    async getAll() {
        try {
            await this.rutaDB.from(this.tabla)
                .select("*")
                .then((res) => {
                    [res].forEach((item) => console.log(item))
                })
                .catch((e) => console.log(e))
                .finally(() => this.rutaDB.destroy());
        } catch (error) {
            console.log(`Hubo un error con la base: ${this.rutaDB}`)
        }
    }

    async save(item) {
        try {
            await this.rutaDB(this.tabla)
            .insert(item)
            .then((res) => console.log("Producto agregado exitosamente"))
            .catch((e) => console.log(e))
            .finally(() => this.rutaDB.destroy());
        } catch (error) {
            console.log("Hubo un error:" + error);
        }
    }
    
    async update(id, obj) {
        try {
            await this.rutaDB(this.tabla)
            .where('id_prod', id)
            .update({...obj})
            .then(() => console.log("Producto actualilzado exitosamente"))
            .catch((e) => console.log(e))
            .finally(() => this.rutaDB.destroy());
        } catch (error) {
            console.log("Hubo un error:" + error);
        }
    }

    async getById(id) {
        try {
            await this.rutaDB(this.tabla)
            .select('*')
            .where('id_prod', id)
            .then((res)=> {
                console.log(...res)
            })
            .catch((e) => console.log(e))
            .finally(() => this.rutaDB.destroy());
        } catch (error) {
            console.log("No pudo realizarse la busqueda por el siguiente error:\n" + error)
        }
    }

    async deleteById(id) {
        try {
            await this.rutaDB(this.tabla)
            .where('id_prod', id)
            .del()
            .then(() => {
                console.log("Producto eliminado exitosamente");
            })
            .catch((err) => {
                console.log(err);
                throw new Error(err);
            })
            .finally(() => {
                this.rutaDB.destroy();
            });
        } catch (error) {
            console.log("Hubo un error al intentar eliminar el objeto:\n" + error)
        }
    }
}

let producto = {
    "nombre": "Espada Slashmaster",
    "precio": 250,
    "img": "https://firebasestorage.googleapis.com/v0/b/provisiones-stan.appspot.com/o/espada.png?alt=media&token=3295edb1-faff-4ca7-9df9-047ad1d3147f"
}
const productosLista = new Productos(productosDB, "productos");

// productosLista.crearTabla("productos");
// productosLista.save(producto);
// productosLista.update(2, {precio: 100});
productosLista.getAll();
// productosLista.getById(2)
// productosLista.deleteById(6)


module.exports = productosLista;