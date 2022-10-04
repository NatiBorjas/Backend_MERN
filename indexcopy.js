/* SERVIDOR EXPRESS */
const express = require("express");
const {engine} = require("express-handlebars");
const routerApi = require('./router/apiProducts');
// const routerProductos = require('./router/productos');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// app.use('/api/productos', routerProductos);
// app.use('/api/formulario', router);
app.use('/api/productos-test', routerApi);
app.use('/public', express.static(__dirname + '/public'));

/* SERVIDOR ESCUCHANDO */
const PORT = process.env.PORT || 8080;
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

const server = httpServer.listen(PORT, () => {
  console.log(`Hola, soy tu servidor escuchando en el puerto [ ${server.address().port} ]`)
});
server.on("error", error => console.log(`Error en servidor: ${error}`));

//------------------------------ 
// MANEJO DE ERROR EN SERVIDOR
//------------------------------ 

app.use(function(err,req,res,next) {
  console.log(err.stack);
  res.status(500).send('Somenthing broke');
})

//------------------------------ 
// CONFIGURACION MOTOR HBS
//------------------------------ 
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
		extname: '.hbs',
		defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
  })
);

// CREAR TABLA // 
// const KnexContenedor = require('./src/classKnex');

// const{options} = require('./options/configDB'); 
// const knexProd = require("knex")(options.mariaDB);
// const knexChat = require("knex")(options.sqliteDB);

// const productos = new KnexContenedor(knexProd, "productos");
// const mensajes = new KnexContenedor(knexChat, "mensajes");

// const { crearTablaProductos , crearTablaMensajes } = require('./src/crearTablaDb');

// PETICIONES // 

// router.get('/', async (req, res) => {
// 	try {
// 		crearTablaProductos();
// 		let productosAll = await productos.getAll();
//     if (!productosAll) {        
// 			res.json('error', {errorMessage: "Hubo un error con el archivo"});
//     } else {
//       res.render('productosLista', {productos: productosAll, existe: true});
//     }
// 	} catch (error) {
//     res.status(500).send({
//       status: 500,
//       message: error.message
//     })		
// 	}}
// );

// FORMULARIO //
// app.get('/formulario', async (req,res)=> {
// 	try {
// 		let admin = true;
// 		if (!admin){
// 			res.json({mensaje: "Acceso denegado"})
// 		} else {
// 		crearTablaMensajes();
// 		let productosAll = await productos.getAll();
// 		io.sockets.emit("productos", productosAll );
// 		res.render('formulario');
// 		}
// 	} catch (error) {
//     res.status(500).send({
//       status: 500,
//       message: error.message
//     })			
// 	}
// })

// SOCKETS //
// io.on('connection', async (socket) => {
//   console.log("me conecte!");

//   let productosLista = await productos.getAll();
// 	let chatData = await mensajes.getAll();

//   io.sockets.emit("productos", productosLista );
// 	io.sockets.emit("arr-chat", chatData );

//   socket.on('nuevoMensaje', async (mensaje)=>{
//     await mensajes.save(mensaje);
// 		let chat = await mensajes.getAll();
//     io.sockets.emit("arr-chat", chat);
//   });

//   socket.on('nuevoProducto', async (data) => {
//     await productos.save(data);
//     let agregado = await productos.getAll();
//     io.sockets.emit("productos", agregado )
//   });
// });
