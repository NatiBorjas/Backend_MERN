const express = require('express');
const {productosDaos: Producto} = require('../daos/mainDaos');
const routerProductos = express.Router();

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

module.exports = routerProductos

