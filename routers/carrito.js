const express = require('express');
const {carritoDaos: Carrito} = require('../daos/mainDaos');
const routerCarrito = express.Router();

const carrito = new Contenedor('carrito');

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

module.exports = routerCarrito