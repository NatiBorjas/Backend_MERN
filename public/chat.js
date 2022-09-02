socket.on('arr-chat', (data)=>{
    console.log(data)
    const html = data.reduce((html, item)=> 
    '<div class="mensaje">' + item + '<div/>' + html, "");
    document.getElementById('chat-history').innerHTML = html;
})

socket.on('productos', (data)=>{
    let productosLista = data.reduce((lista, item) => lista + `
    <tr class="item-lista">
        <td>${item.nombre}</td>
        <td>${item.precio}</td>
        <td><img src="${item.img}"/></td>
    </tr>`, '')
    
    document.querySelector('tbody').innerHTML = productosLista;
});

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
    let fecha = new Date().toLocaleDateString();
    socket.emit('nuevoMensaje', correo +  " [" + fecha + "] : " + msg);
    return false;
}