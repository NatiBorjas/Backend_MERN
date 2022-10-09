import { chatSocket } from "./socketChat.js";

export const socketModel = (io) => {
  io.on("connection", async (socket) => {
    console.log("Nuevo usuario conectado: " + socket.id);
    chatSocket(socket, io);
  });
};
