const express = require('express');
const {productosDaos: Producto} = require('../daos/mainDaos');
const routerProductos = express.Router();

const producto = new Producto();

// LISTA PRODUCTOS (GET ALL)
// routerProductos.get('/:id', async (req, res) => {
// 		const id = req.params.id;
// 		if (id === "all") {
// 			try {
// 				const productos = await producto.getAll();
// 				res.status(200).send({
// 					status: 200,
// 					data: {
// 						productos
// 					},
// 					message: "Listado de productos"
// 				});
// 			} catch (error) {
// 				res.status(500).send({
// 					status: 500,
// 					message: error.message
// 				})				
// 			}
// 		} else {
// 			try {
// 				const prod = await producto.getById(id)
// 				res.status(200).send({
// 					status: 200,
// 					data: {
// 						prod
// 					},
// 					message: "detalle de producto"
// 				})
// 			} catch (error) {
// 				res.status(500).send({
// 					status: 500,
// 					message: error.message
// 			})
// 		}
// 	}
// })

// AGREAGR UN PRODUCTO (SAVE) //
// routerProductos.post('/', async (req, res, next) => {
//     if(req.query.admin == 1) {
//         console.log("Admin access granted")
//         next();
//     } else {
// 		res.send({message: "Admin access denied"})
//     }},
//     async (req,res) => {
// 		try {
// 			const prod = new Producto();
// 			const agregado = await prod.save(req.body)
// 			res.status(200).send({
// 				status: 200,
// 				data: {
// 					agregado
// 				},
// 				message: "Producto agregado"
// 			})
// 		} catch (error) {
// 			res.status(500).send({
// 				status: 500,
// 				message: error.message
// 			})			
// 		}
// })

// ACTUALIZAR UN PRODUCTO (PUT) //
// routerProductos.put('/:id', 
//     (req, res, next) => {
//         if(!admin) {
//             res.json({error: -1, descripcion: `ruta ${req.baseUrl} método ${req.method} no autorizado`});
//         } else {
//             next();
//         }
//     },
//     async (req,res) => {
//         const {id} = req.params
//         const {body} = req;
//         let productoActualizar = await productos.getById(id);

//         if (productoActualizar) {
//             productoActualizar = {...productoActualizar, ...body, ...timeStamp};
//             await productos.update(id, productoActualizar);
//             res.json({success: "ok", producto: productoActualizar});
//         } else {
//             res.json({error: "Producto no encontrado"});
//         }
//     }
// );

// ELIMINAR UN PRODUCTO (DELETE) //
// routerProductos.delete('/:id', (req, res, next) => {
//     if(req.query.admin == 1) {
//         console.log("Admin access granted")
//         next();
//     } else {
// 		res.send({message: "Admin access denied"})
//     }},
//     async (req,res) => {
// 		try {
// 			const prod = new Producto();
// 			const agregado = await prod.save(req.body)
// 			res.status(200).send({
// 				status: 200,
// 				data: {
// 					agregado
// 				},
// 				message: "Producto agregado"
// 			})
// 		} catch (error) {
// 			res.status(500).send({
// 				status: 500,
// 				message: error.message
// 			})			
// 		}
//         const {id} = req.params;
//         const encontrado = await productos.deleteById(id);
//         if (encontrado) {
//             res.json({success: "ok", mensaje: "Producto eliminado"});
//         } else {
//             res.json({error: "Producto no encontrado"});
//         }
//     }
// );
// routerProductos.delete('/:id', function(req, res, next){
//     if (req.query.admin == 1){
//         console.log("Se conecto un admin")
//         next()
//     }else {
//         res.send({ error: "No se logueo como admin"})
//     }
// }, async (req, res) => { 
//     const num = req.params.id
//     try {
//         let idProd = parseInt(num)
//         const prod = new Producto()
//         const borrar = await prod.deleteById(idProd)
//         res.status(200).send({
//             status: 200,
//             data: { 
//                 borrar,
//             },
//             message:'producto eliminado'
//             })
//     } catch (error) {
//         res.status(500).send({
//             status: 500,
//             message: error.message
//         })
//     }
    
// });

// module.exports = routerProductos


// const prod = new Producto()


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
            const prod = await prod.getById(num)
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
        let idProd = parseInt(num)
        const cambio = req.body
        const cambiado = await producto.updateById(idProd, cambio)
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
        let idProd = parseInt(num)
        const borrar = await producto.deleteById(idProd)
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