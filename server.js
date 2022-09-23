//------------------------------ 
//    TIMESTAMP
//------------------------------ 

// const fecha = Date.now();
// const timeStamp = {"timestamp": new Date(fecha).toUTCString()};

//------------------------------ 
//    PETICIONES 
//------------------------------ 

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
    const data = await productos.getById(id);
    console.log(data)
    // const encontrado = 
    // console.log(data)
    // if (!encontrado) {
    //     res.render('error', {errorMessage: "Producto no encontrado"});
    //     } else {
    //         res.render('unProducto', {producto: encontrado, titulo: `Detalle de ${encontrado.nombre}`})
    //     }
    }
);


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

