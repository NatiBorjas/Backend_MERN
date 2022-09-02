const fs = require('fs');

//------------------------------ 
// SERVIDOR EXPRESS
//------------------------------ 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Hola, soy tu servidor escuchando en el puerto [ ${server.address().port} ]`)
});
server.on("error", error => console.log(`Error en servidor: ${error}`));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static(__dirname + '/public'));

//------------------------------ 
// ROUTER
//------------------------------ 
const {Router} = express;
const routerProductos = Router();
const routerCarrito = Router();
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

//------------------------------ 
// MANEJO DE ERROR EN SERVIDOR
//------------------------------ 
app.use(function(err,req,res,next) {
    console.log(err.stack);
    res.status(500).send('Somenthing broke');
})

//------------------------------ 
// CREACION DE CLASES
//------------------------------ 

const Contenedor = require("./src/classContenedor");
// const { timeStamp } = require('console');
const productos = new Contenedor('productos');
const carrito = new Contenedor('carrito');

//------------------------------ 
//    TIMESTAMP
//------------------------------ 

const fecha = Date.now();
const timeStamp = {"timeStamp": new Date(fecha).toUTCString};

//------------------------------ 
//    PETICIONES PRODUCTOS
//------------------------------ 
// let admin = false;
let admin = true;


// LISTA PRODUCTOS (GET ALL)
routerProductos.get('/', async (req, res) => {
    let productosAll = await productos.getAll();
        if (!productosAll) {
            res.json({error: "Hubo un error en el archivo."});
        } else {
            res.json({titulo: "Listado de productos", productos: productosAll})
        }
    }
);

// PRODUCTO POR ID (GET BY ID) //
routerProductos.get('/:id', async (req, res) => {
    const {id} = req.params;
    const encontrado = await productos.getById(id);
    
    if (!encontrado) {
            res.json({mensajeError: "Producto no encontrado"});
        } else {
            res.json({titulo: `Detalle del producto ${encontrado.nombre} con id ${encontrado.id}`, producto: encontrado});
        }
    }
);

// AGREAGR UN PRODUCTO (SAVE) //
routerProductos.post('/', 
    (req, res, next) => {
        if(!admin) {
            res.json({error: -1, descripcion: `ruta ${req.baseUrl} método ${req.method} no autorizado`});
        } else {
            next();
        }
    },
    async (req,res) => {
        const {body} = req;
        const agregado = {...timeStamp, ...body};
        await productos.save(agregado);
        res.json({success: "ok", producto: agregado});
    }
)

// ACTUALIZAR UN PRODUCTO (PUT) //
routerProductos.put('/:id', 
    (req, res, next) => {
        if(!admin) {
            res.json({error: -1, descripcion: `ruta ${req.baseUrl} método ${req.method} no autorizado`});
        } else {
            next();
        }
    },
    async (req,res) => {
    const {id} = req.params
    const {body} = req;
    let productoActualizar = await productos.getById(id);

    if (productoActualizar) {
        productoActualizar = {...productoActualizar, ...body};
        await productos.update(id, productoActualizar);
        res.json({success: "ok", producto: productoActualizar});
    } else {
        res.json({error: "Producto no encontrado"});
    }
});

// ELIMINAR UN PRODUCTO (DELETE) //
routerProductos.delete('/:id', 
    (req, res, next) => {
        if(!admin) {
            res.json({error: -1, descripcion: `ruta ${req.baseUrl} método ${req.method} no autorizado`});
        } else {
            next();
        }
    },
    async (req,res) => {
    const {id} = req.params;
    const encontrado = await productos.deleteById(id);

    if (encontrado) {
        res.json({success: "ok", mensaje: "Producto eliminado"});
    } else {
        res.json({error: "Producto no encontrado"});
    }
});

//------------------------------ 
//    PETICIONES CARRITO
//------------------------------ 