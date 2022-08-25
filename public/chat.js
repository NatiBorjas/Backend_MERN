socket.on('arr-chat', (data)=>{
    const html = data.reduce((html, item)=> '<div class="mensaje">' + item + '<div/>' + html, "");
    document.getElementById('chat-history').innerHTML = html;
})

// socket.on('data-generica', (data)=>{
//     console.log(data);
// })

socket.on('productos', (data)=>{
    console.log(data)
    // const productosLista = data
    // render(data);
})

function agregar(){
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const img = document.getElementById("img").value;
    socket.emit('nuevoProducto', {nombre: nombre, precio: precio, img: img});
    return false;
}

function enviar(){
    const correo = document.getElementById("caja-correo").value;
    const msg = document.getElementById("caja-msg").value;
    socket.emit('nuevoMensaje', correo + " dice: " + msg);
    return false;
}

function render(data) {
    const html = data.map((item) => {
            (`<tr>
                <td>
                    ${item.nombre}
                </td>:
                <td>
                    ${item.precio}
                </td>
                <td>
                    ${item.img}
                </td>  
            </tr>`)
    }).join(" ");
    document.getElementsByTagName('tbody').innerHTML = html;
}