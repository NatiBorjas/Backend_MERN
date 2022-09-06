//------------------------------ 
// SERVIDOR EXPRESS y WEBSOCKS
//------------------------------ 
const express = require('express');
const {engine} = require('express-handlebars');
const {Router} = express;
const app = express();
const router = Router();
const PORT = process.env.PORT || 8080;
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);


const server = httpServer.listen(PORT, () => {
    console.log(`Hola, soy tu servidor escuchando en el puerto [ ${server.address().port} ]`)
});
server.on("error", error => console.log(`Error en servidor: ${error}`));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', router);
app.use('/public', express.static(__dirname + '/public'));

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

//------------------------------ 
// CREACION DE CLASES
//------------------------------ 

const Contenedor = require("./src/classContenedor");
const productos = new Contenedor('productos');
const carritos = new Contenedor('carrito');

//------------------------------ 
//    TIMESTAMP
//------------------------------ 

const fecha = Date.now();
const timeStamp = {"timestamp": new Date(fecha).toUTCString()};

//------------------------------ 
//    PETICIONES 
//------------------------------ 
let chat = [];

// METODO GET ALL
router.get('/', async (req, res) => {
    let productosAll = await productos.getAll();
        if (!productosAll) {
            res.render('error', {errorMessage: "Hubo un error con el archivo"});
        } else {
            res.render('productosLista', {productos: productosAll, existe: true});
        }
    }
);

// METODO GET BY ID //
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const encontrado = await productos.getById(id);
    
    if (!encontrado) {
        res.render('error', {errorMessage: "Producto no encontrado"});
        } else {
            res.render('unProducto', {producto: encontrado, titulo: `Detalle de ${encontrado.nombre}`})
        }
    }
);

// FORMULARIO //
app.get('/formulario', async (req,res)=> {
    const productosLista = await productos.getAll();
    io.sockets.emit("productos", productosLista );
    res.render('formulario');
})

// METODO SAVE//
// router.post('/', async (req,res) => {
//     const agregado = req.body;
//     await productos.save(agregado);
//     res.redirect('/formulario')
// })

// ACTUALIZAR UN PRODUCTO //
// router.put('/:id', async (req,res) => {
//     const {id} = req.params
//     const {body} = req;

//     if (!id) {
//         res.json({error: "Producto no encontrado"});

//     } else {
//         await productos.update(id, body);
//         res.json({mensaje: "Se ha actualizado correctamente el producto"});
//     }

// });

// ELIMINAR UN PRODUCTO //
// router.delete('/:id', async (req,res) => {
//     const {id} = req.params;
//     const encontrado = await productos.deleteById(id);

//     if (!encontrado) {
//         res.json({error: "Producto no encontrado"});
//     } else {
//         res.json({mensaje: "Se ha elliminado el producto correctamente."});
//     }
// });


//------------------------------ 
//    WEBSOCKS
//------------------------------ 

io.on('connection', async (socket) => {
    const productosLista = await productos.getAll();
    io.sockets.emit("productos", productosLista );

    chat.push('Usuarix conectadx: ' + socket.id);
    io.sockets.emit("arr-chat", chat);

    socket.on('nuevoMensaje',(mensaje)=>{
        chat.push(mensaje);
        io.sockets.emit("arr-chat", chat);
    });
    
    socket.on('data-generica',(data)=>{
        chat.push(data);
        io.sockets.emit("arr-chat", chat)
    });

    socket.on('nuevoProducto', async (data) => {
        await productos.save(data);
        let agregado = await productos.getAll();
        io.sockets.emit("productos", agregado )
    });
});

