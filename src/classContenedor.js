const fs = require('fs');

class Contenedor {
    constructor(archivo){
        this.archivo = "./files/"+archivo+".json";
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            let dataParse = JSON.parse(data)
            return dataParse;
        } catch (error) {
            console.log(`Hubo un error con el archivo: ${this.archivo}`);
        }
    }

    async save(item) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            let dataParse = JSON.parse(data);
            const indice = dataParse.map(i => i.id).sort();
            item.id = indice[indice.length -1]+1;

                if (!item.id) {
                    item.id = 1;
                    dataParse = [{...item}];
                    await fs.promises.writeFile(this.archivo, JSON.stringify(dataParse));
                    return dataParse[0].id
                }
                dataParse.push(item);
                await fs.promises.writeFile(this.archivo,JSON.stringify(dataParse));
                return dataParse
                
        } catch (error) {
            console.log("Hubo un error:" + error);
        }
    }
    
    async update(id, obj) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            let dataParse = JSON.parse(data)
            let actualizarData = dataParse.map((e) => e.id == id ? e = {...e, ...obj} : e);
            await fs.promises.writeFile(this.archivo, JSON.stringify(actualizarData));
        } catch (error) {
            console.log("Hubo un error:" + error);
        }
    }

    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            let dataParse = JSON.parse(data);
            let prod = dataParse.find(x => x.id == id);

            if(prod.id == id) {
                return prod;
            } else {
                console.log(`No se encuentra el producto con ID: ${id}`)
            }
        } catch (error) {
            console.log("No pudo realizarse la busqueda por el siguiente error:\n" + error)
        }
    }
    
    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            let dataParse = JSON.parse(data);
            let prod = dataParse.find(x => x.id == id);

            if(!prod) {
                console.log(`No se encuentra el objeto con Id ${id}`)
            } else {
                dataParse = dataParse.filter(i => i.id !== prod.id);
                await fs.promises.writeFile(this.archivo, JSON.stringify(dataParse));
                return dataParse
            }

        } catch (error) {
            console.log("Hubo un error al intentar eliminar el objeto:\n" + error)
        }
    }

}

module.exports = Contenedor;