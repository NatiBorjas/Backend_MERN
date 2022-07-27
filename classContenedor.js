const fs = require('fs');


class Contenedor {
    constructor(archivo){
        this.archivo = "./files/"+archivo+".json";
    }

    async save(prod) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            let productos = JSON.parse(data);
            const indice = productos.map(i => i.id).sort();
            prod.id = indice[indice.length -1]+1;

                if (!prod.id) {
                    prod.id = 1;
                    productos = [{...prod}];
                    await fs.promises.writeFile(this.archivo, JSON.stringify(productos));
                    console.log([`Se ha agregado el producto ${JSON.stringify(prod.nombre)} con Id n°: ${JSON.stringify(prod.id)}`]);
                } else {
                    productos.push(prod);
                    await fs.promises.writeFile(this.archivo,JSON.stringify(productos));
                    console.log([`Se ha agregado el producto ${JSON.stringify(prod.nombre)} con Id n°: ${JSON.stringify(prod.id)}`]);
                }
        } catch (error) {
            console.log("Hubo un error. No se pudo guardar el producto");
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            console.log(JSON.parse(data));
        } catch (error) {
            await fs.promises.writeFile(this.archivo, JSON.stringify([]));
            console.log(`No se encuentra el archivo. Se ha creado uno vacío en la ruta ${this.archivo}`);
        }
    }

    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            let productos = JSON.parse(data);
            let prod = productos.find(x => x.id == id);

            if(prod == undefined) {
                console.log(null)
            } else {
                console.log(prod);
            }
            
        } catch (error) {
            console.log("No pudo realizarse la busqueda por el siguiente error:\n" + error)
        }
    }

    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            let productos = JSON.parse(data);
            let prod = productos.find(x => x.id == id);

            if(!prod) {
                console.log(`No se encuentra el objeto con Id ${id}`)
            } else {
                productos = productos.filter(i => i.id !== prod.id);
                await fs.promises.writeFile(this.archivo, JSON.stringify(productos));
                console.log(`Se ha eliminado el objeto con Id ${id}`);
            }

        } catch (error) {
            console.log("Hubo un error al intentar eliminar el objeto:\n" + error)
        }
    }

    async deleteAll() {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            let productos = JSON.parse(data);

            if (productos.length == 0) {
                console.log("No hay objetos a borrar.")
            } else {
                await fs.promises.writeFile(this.archivo, JSON.stringify([]));
                console.log("Se han borrado todos los objetos.")
            };
        } catch (error) {
            console.log("Hubo un error al intentar borrar el archivo:\n" + error)
        }
    }
}



// OBJETOS A AGREGAR:
const prodInicial1 = {
    nombre: "Pala Digmaster",
    precio: "100",
    img: "https://firebasestorage.googleapis.com/v0/b/provisiones-stan.appspot.com/o/pala.png?alt=media&token=3548c219-be86-45ba-b3a6-c39fe89768d5"
    };

    const prodInicial2 = {
    nombre: "Cabeza de Navegante",
    precio: "2000",
    img: "https://firebasestorage.googleapis.com/v0/b/provisiones-stan.appspot.com/o/cabeza.png?alt=media&token=a129369f-0a1a-4b80-b145-1c15295b29d2"
};

const prodInicial3 = {
    nombre: "Espada Slashmaster",
    precio: "250",
    img: "https://firebasestorage.googleapis.com/v0/b/provisiones-stan.appspot.com/o/espada.png?alt=media&token=3295edb1-faff-4ca7-9df9-047ad1d3147f"
    };


// EJECUCIÓN:
const productos = new Contenedor("productos");
// productos.getAll();
// productos.save(prodInicial1);
// productos.save(prodInicial2);
// productos.save(prodInicial3);
// productos.getById(1);
// productos.deleteAll();
// productos.deleteById(x);
