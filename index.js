const fs = require('fs');
// SERVIDOR //
const express = require('express');
const {Router} = express;
const app = express();
const router = Router();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Hola, soy tu servidor escuchando en el puerto [ ${server.address().port} ]`)
});
server.on("error", error => console.log(`Error en servidor: ${error}`));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', router);
app.use('/public', express.static(__dirname + '/public'));

// MANEJO DE ERROR //
app.use(function(err,req,res,next) {
    console.log(err.stack);
    res.status(500).send('Somenthing broke');
})


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
                    return productos[0].id
                } else {
                    productos.push(prod);
                    await fs.promises.writeFile(this.archivo,JSON.stringify(productos));
                    
                    return productos
                    // console.log([`Se ha agregado el producto ${JSON.stringify(prod.nombre)} con Id n°: ${JSON.stringify(prod.id)}`]);
                }
        } catch (error) {
            console.log("Hubo un error:" + error);
        }
    }

    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            let productos = JSON.parse(data);
            let dataParse = productos.find(x => x.id == id);

            if(!prod) {
                console.log(`No se encuentra el objeto con Id ${id}`)
            } else {
                return dataParse
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

    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            let productos = JSON.parse(data);
            let prod = productos.find(x => x.id == id);

            if(!prod) {
                console.log(`No se encuentra el producto con ID: ${id}`)
            } else {
                return prod;
            }
        } catch (error) {
            console.log("No pudo realizarse la busqueda por el siguiente error:\n" + error)
        }
    }
}

const productos = new Contenedor('productos');

// PETICIONES // 
router.get('/', async (req, res) => {
    let productosAll = await productos.getAll();
        if (!productosAll) {
            res.json({error: "Hubo un error en/con el archivo."});
        } else {
            res.json(productosAll);
        }
    }
);

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const encontrado = await productos.getById();
    console.log(encontrado)
    if (encontrado == undefined) {
        res.json({error: "Producto no encontrado"});
    } else {
        res.json(encontrado)
    }

    }
);

router.post('/', async (req,res) => {

})

router.put('/:id', async (req,res) => {
    
})

router.delete('/:id', async (req,res) => {
    
})