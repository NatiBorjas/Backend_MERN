/* SERVIDOR EXPRESS */
const express = require('express');
const routerProductos = require('./routers/productos.js');
const routerCarrito = require('./routers/carrito.js');

const app = express();
let acceso = true

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if(acceso === true) {
app.use('/api/carrito', routerCarrito);
app.use('/api/productos', routerProductos);
}
else {
	console.log("no tiene acceso")
}

/* SERVIDOR ESCUCHANDO */
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {console.log(`Servidor escuchando en el puerto [ ${server.address().port} ]`)});
server.on("error", error => console.log(`Error en servidor: ${error}`));

//------------------------------ 
// MANEJO DE ERROR EN SERVIDOR
//------------------------------ 
app.use(function(err,req,res,next) {
    console.log(err.stack);
    res.status(500).send('Somenthing broke');
})