
const socket = io();

socket.on('arr-chat', (data)=>{
    console.log("data", data)
    const html = data.reduce((html, item)=> 
    '<div class="mensaje">' + `${item.correo}: ` + `[${item.fecha}]` +` ${item.mensaje} ` + '<div/>' + html, "");
    document.getElementById('arr-chat').innerHTML = html;
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
	let mensaje = {
		correo: document.getElementById("caja-correo").value,
		mensaje: document.getElementById("caja-msg").value,
		fecha: new Date().toLocaleDateString()
	}
    socket.emit('nuevoMensaje', mensaje);
    return false;
}