import knex from "knex";
import { options } from "../options/configDB.js";
const knexProd = knex(options.mariaDB);

class Productos {
    constructor(knexProd, tabla){
        this.knexProd = knexProd;
        this.tabla= tabla;
    }

    async getAll() {
        try {
            const data = await this.knexProd.from(this.tabla);
            return data
        } catch (error) {
            console.log(`Hubo un error con la base: ${this.knexProd}`)
        }
    }

    async save(item) {
        try {
            
            await this.knexProd(this.tabla)
            .insert(item)
            .then((res) => console.log("Producto agregado exitosamente"))
            .catch((e) => console.log(e))
            .finally(() => this.knexProd.destroy());
        } catch (error) {
            console.log("Hubo un error:" + error);
        }
    }
    
    async update(id, obj) {
        try {
            await this.knexProd(this.tabla)
            .where('id_prod', id)
            .update({...obj})
            .then(() => console.log("Producto actualilzado exitosamente"))
            .catch((e) => console.log(e))
            .finally(() => this.knexProd.destroy());
        } catch (error) {
            console.log("Hubo un error:" + error);
        }
    }

    async getById(id) {
        try {
            const data =  await this.knexProd(this.tabla).where('id_prod', id)
            .then((res) => {
                console.log(res)
            });
            // .then((res)=> {
            //     console.log(...res)
            // })
            // .catch((e) => console.log(e))
            // .finally(() => this.knexProd.destroy());
        } catch (error) {
            console.log("No pudo realizarse la busqueda por el siguiente error:\n" + error)
        }
    }

    async deleteById(id) {
        try {
            await this.knexProd(this.tabla)
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
                this.knexProd.destroy();
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
export const productos = new Productos(knexProd, "productos");

// productosLista.crearTabla("productos");
// productosLista.save(producto);
// productosLista.update(2, {precio: 100});
// productosLista.getAll();
// productosLista.getById(2)
// productosLista.deleteById(6)


