const express = require('express');
const {productosDaos: Producto} = require('../daos/mainDaos');
const routerProductos = express.Router();

const producto = new Producto();

routerProductos.get('/:id', async (req, res) => {   
    const num = req.params.id
    if (num === "all")
    {
        try {
            const productos = await producto.getAll()
            res.status(200).send({
                status: 200,
                data: {
                    productos,
                },
                message:'productos encontrados'
                })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: error.message
            })
        }
        
    }else{
        try {
            const prod = await producto.getById(num)
			console.log(prod)
            res.status(200).send({
                status: 200,
                data: {
                    prod,
                },
                message:'producto encontrado'
                })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: error.message
            })
        }
    } 
})

routerProductos.post('/', function(req, res, next){
    if (req.query.admin == 1){
        console.log("Se conecto un admin")
        next()
    }else {
        res.send({ error: "No se logueo como admin"})
    }
},async (req, res) => { 
    try {
        const id = await producto.save(req.body)
        res.status(200).send({
            status: 200,
            data: {
                id,
            },
            message:'producto agregado'
            })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}
);

routerProductos.put('/:id', function(req, res, next){
    if (req.query.admin == 1){
        console.log("Se conecto un admin")
        next()
    }else {
        res.send({ error: "No se logeo como admin"})
    }
}, async (req, res) => { 
    const num = req.params.id
    try {
        const cambio = req.body
        const cambiado = await producto.updateById(num, cambio)
        res.status(200).send({
            status: 200,
            data: { 
                cambiado,
            },
            message:'producto actualizado'
            })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
});


routerProductos.delete('/:id', function(req, res, next){
    if (req.query.admin == 1){
        console.log("Se conecto un admin")
        next()
    }else {
        res.send({ error: "No se logeo como admin"})
    }
}, async (req, res) => { 
    const num = req.params.id
    try {
        const borrar = await producto.deleteById(num)
        res.status(200).send({
            status: 200,
            data: { 
                borrar,
            },
            message:'producto eliminado'
            })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
    
});

module.exports = routerProductos