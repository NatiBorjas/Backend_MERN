const express = require('express');
const {productosDaos: Producto} = require('../daos/mainDaos');
const routerProductos = express.Router();

const producto = new Producto();

routerProductos.get('/:id', async (req, res) => {   
  const num = req.params.id
    if (num === "all") {
      try {
        const productos = await producto.getAll()
        res.status(200).send({
          status: 200,
          message:'productos encontrados',
          data: {
            productos,
          },
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
          message:'producto encontrado',
          data: {
            prod,
          },
        })
      } catch (error) {
        res.status(500).send({
          status: 500,
          message: error.message
        })
      }
		} 
	}
)

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
      message:'producto agregado',
      data: {
        prod_id: id,
      },
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
        message:'producto actualizado',
        data: { 
          cambiado,
        },
      })
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: error.message
      })
    }
	}
);

routerProductos.delete('/:id', function(req, res, next){
  if (req.query.admin == 1){
    console.log("Se conecto un admin");
    next()
  }else {
    res.send({ error: "No se logeo como admin"})
  }
}, async (req, res) => { 
  const num = req.params.id
  try {
    const borrar = await producto.deleteById(num);
		res.status(200).send({
      status: 200,
      message:'producto eliminado',
      data: { 
        borrar,
      },
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message
    })
  }
});

module.exports = routerProductos