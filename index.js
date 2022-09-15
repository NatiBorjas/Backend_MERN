const express = require('express');
const routerProductos = require('./routers/productos');
const routerCarrito = require('./routers/carrito');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {console.log(`Servidor escuchando en el puerto [ ${server.address().port} ]`)});
server.on("error", error => console.log(`Error en servidor: ${error}`));


app.use('/public', express.static(__dirname + '/public'));

//------------------------------ 
// MANEJO DE ERROR EN SERVIDOR
//------------------------------ 
app.use(function(err,req,res,next) {
    console.log(err.stack);
    res.status(500).send('Somenthing broke');
})