socket.on('arr-chat', (data)=>{
    console.log(data);
    const html = data.reduce((html, item)=> '<div>' + item + '<div/>' +  html , "");

    document.getElementById('chat-container').innerHTML = html
})

// let chat = [];

function enviar(){
    const correo = document.getElementById("caja-correo").value;
    const msg = document.getElementById("caja-msg").value;
    socket.emit('data-generica', correo + " dice " + msg);
    return false;
}

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}