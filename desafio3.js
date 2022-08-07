const fs = require('fs');

// CLASE //
class Contenedor {
    constructor(archivo){
        this.archivo = "./files/productos.json";
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

    async getRandom() {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            let productos = JSON.parse(data);
            const indexRandom = Math.floor(Math.random() * productos.length);
            let productoRandom = productos[indexRandom];

            return productoRandom

        } catch (error) {
            console.log("No pudo realizarse la busqueda por el error:\n" + error)
        }
    }
}

const productos = new Contenedor('productos');


// SERVIDOR //
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Hola, soy tu servidor escuchando en el puerto [ ${server.address().port} ]`)
});
server.on("error", error => console.log(`Error en ${error}`));

app.get('/', (req, res) => {
    res.json({mensaje: 'Bienvenidxs a la tienda de Stan', URL: 'https://provisiones-stan.vercel.app/'});
});

app.get('/productos', async (req, res) => {
        let productosAll = await productos.getAll();
        if (!productosAll) {
            res.json({error: "Hubo un error en/con el archivo."});
        } else {
            res.json(productosAll);
        }
    }
);

app.get('/productoRandom', async (req, res) => {
    let aleatorio = await productos.getRandom();

    if (!aleatorio) {
        res.json({error: "Hubo un error en/con el archivo."});
    } else {
        res.json(aleatorio);
    }
});