const {Router} = require('express');
const routerApi = Router();
const ApiProductosMock = require('../api/products.js');

const apiProductos = new ApiProductosMock();

routerApi.post('/popular', async (req, res, next) => {
  try {
    res.json(await apiProductos.popular(req.query.cant))
  } catch (err) {
    next(err)
  }
})

routerApi.get("/", async (req, res, next) => {
  try {
    res.json(await apiProductos.getAll());
  } catch (err) {
    next(err);
  }
});

module.exports = routerApi
