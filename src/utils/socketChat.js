import mensajesDaos from "../../daos/mensajesDaos.js";
const mensajesContoller = new mensajesDaos();
import { mensajesNormalize } from "../normalizr/mensajesNormalize.js";

export async function chatSocket(socket, io) {
  let mensajes = await mensajesContoller.getAll();
  io.sockets.emit("mensajes", mensajesNormalize(mensajes));

  socket.on("nuevo-mensaje", async (msje) => {
    let mensaje = JSON.parse(msje);
    await mensajesContoller.save(mensaje);
    let chat = await mensajesContoller.getAll({ sort: true });

    io.sockets.emit("mensajes", mensajesNormalize(chat));
  });
}
