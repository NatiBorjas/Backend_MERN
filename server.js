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
const productos = new Contenedor('productos');
const carritos = new Contenedor('carrito');

//------------------------------ 
//    TIMESTAMP
//------------------------------ 

const fecha = Date.now();
const timeStamp = {"timestamp": new Date(fecha).toUTCString()};

//------------------------------ 
//    VARIABLE ADMIN
//------------------------------
let admin = true;
// let admin = false;

//------------------------------ 
//    PETICIONES PRODUCTOS
//------------------------------

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
        const agregado = {...body , ...timeStamp};
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
            productoActualizar = {...productoActualizar, ...body, ...timeStamp};
            await productos.update(id, productoActualizar);
            res.json({success: "ok", producto: productoActualizar});
        } else {
            res.json({error: "Producto no encontrado"});
        }
    }
);

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
    }
);

//------------------------------ 
//    PETICIONES CARRITO
//------------------------------

// CREAR CARRITO VACIO //
routerCarrito.post("/", async (req,res) => {
    let productos = {"productos": []};
    let nuevoCarrito = {...productos, ...timeStamp};
    await carritos.save(nuevoCarrito);
    res.json({success: "ok", mensaje: `Carrito creado con id: ${nuevoCarrito.id}`});
    }
);

// MOSTRAR PRODUCTOS EN CARRITO//
routerCarrito.get("/:id/productos", async (req, res) => {
    const {id} = req.params;
    let datosCarrito = await carritos.getById(id);

    if (datosCarrito) {
        let productosCarrito = datosCarrito.productos;
        res.json({titulo: "Productos en carrito", productos: productosCarrito})
    } else {
        res.json({mensaje: `No se encontro el carrito con id ${id}`});
    }
});

// AGREGAR PRODUCTO (POR SU ID) AL CARRITO//
routerCarrito.post("/:id/productos", async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    let productoAgregar = await productos.getById(body.id);
    let carritoActualizar = await carritos.getById(id);

    if (productoAgregar) {
        carritoActualizar.productos.push(productoAgregar);
        carritos.update(id, carritoActualizar);
        res.json({success: "ok", mensaje: `Se agrego el producto ${productoAgregar.nombre}`});
    } else {
        res.json({error: `Producto con id ${body.id} no encontrado`});
    }
});

// ELIMINAR CARRITO POR SU ID //
routerCarrito.delete("/:id", async (req, res) => {
    const {id} = req.params;
    let carritoBorrar = await carritos.getById(id);

    if (carritoBorrar) {
        carritos.deleteById(id);
        res.json({success: "ok", mensaje: "Carrito eliminado correctamente"});
    } else {
        res.json({mensaje: `No se encontro el carrito con id ${id}`});      
    }
});

// ELIMINAR PRODUCTO (POR SU ID) DEL CARRITO //
routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
    const {id, id_prod} = req.params;
    let carritoActualizar = await carritos.getById(id);
    let productoEliminar = await productos.getById(id_prod);
    let indexEliminarProd = carritoActualizar.productos.findIndex((prod) => prod.id == productoEliminar.id);
    console.log(indexEliminarProd)

    if (indexEliminarProd != -1) {
        carritoActualizar.productos.splice(indexEliminarProd, 1);
        carritos.update(id, carritoActualizar);
        res.json({success: "ok", mensaje: `Producto ${productoEliminar.nombre} eliminado correctamente`});
    } else {
        res.json({error: `No se encontro el producto con id ${id_prod}`});          
    }
});