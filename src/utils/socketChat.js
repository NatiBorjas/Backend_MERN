import mensajesDaos from "../../daos/mensajesDaos.js";
import { mensajesNormalize } from "../normalizr/mensajesNormalize.js";

const mensajesContoller = new mensajesDaos();

export const chatSocket = (io) => {
  io.on("connection", async (socket) => {
    console.log("Nuevo usuarix Conectado: " + socket.id);
    io.sockets.emit(
      "mensajes",
      mensajesNormalize(await mensajesContoller.getAll())
    );
    socket.on("nuevo-mensaje", async (msje) => {
      await mensajesContoller.save(JSON.parse(msje));
      io.sockets.emit(
        "mensajes",
        mensajesNormalize(await mensajesContoller.getAll({ sort: true }))
      );
    });
  });
};