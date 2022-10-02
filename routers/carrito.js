const express = require('express');
const {carritoDaos: Carrito} = require('../daos/mainDaos');
const routerCarrito = express.Router();

const Carro = new Carrito();

// CREAR CARRITO VACIO //
routerCarrito.post("/", async (req,res) => {
	try {
		const carrito = await Carro.nuevoCarrito();
		res.status(200).send({
			status: 200,
			message:'carrito agregado',
			data: {
				carrito
			},
			});
		} catch (error) {
			res.status(500).send({
				status: 500,
				message: error.message
			})
		}
    }
);

// VER CARRITOS (clg) //
routerCarrito.get("/", async (req,res) => {
	try {
		const carritos = await Carro.getAll();
		res.status(200).send({
			status: 200,
			data: {
				carritos
			},
			message:'carritos'
			});
		} catch (error) {
			res.status(500).send({
				status: 500,
				message: error.message
			})
		}
    }
);

// ELIMINAR CARRITO //
routerCarrito.delete('/:id', async function(req, res){
  const num = req.params.id
    try {
      const borrado = await Carro.deleteById(num)
      res.status(200).send({
        status: 200,
        message:'carrito borrado',
        data: {
          borrado,
        },
      })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message
    })
  }
});

// AGREGAR PRODUCTO //
routerCarrito.post('/productos', async function(req, res){
  try {
    let idCarrito = req.body.cart_id
    let idProducto = req.body.prod_id
    await Carro.agregarProducto(idCarrito, idProducto);
      res.status(200).send({
        status: 200,
        message:'producto agregado a carrito',
        data: {
					idCarrito,
          idProducto
        },
      })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message
    })
  }
});

//ELIMINAR PRODUCTO DE CARRITO //
routerCarrito.delete('/borrarProducto/:idC', async function(req, res){
  const idCart = req.params.idC
    try {
      let idEnCarrito = req.body.cart_id
      let idProducto = req.body.prod_id
      const eliminado = await Carro.deleteProductById(idCart, idProducto, idEnCarrito)
      res.status(200).send({
        status: 200,
        message:'producto eliminado del carrito',
        data: {
          eliminado,
        },
      })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message
    })
  }
});

module.exports = routerCarrito