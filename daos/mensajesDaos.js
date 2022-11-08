// import mongoose from "mongoose";
const mongoose = require("mongoose");
const Messages = require("../models/mensajeSchema.js") ;
const { MONGOPSW } = require("../config.js");

class mensajesDaos {
  constructor() {
    try {
      mongoose.connect(
        `mongodb+srv://admin:${MONGOPSW}@ecommerce.nflhe41.mongodb.net/?retryWrites=true&w=majority`,
        { useNewUrlParser: true }
      )
    } catch (e) {
      console.log(e);
    }
  }

  async save(mensaje) {
    try {
      let timestamp = new Date();
      mensaje.timestamp = timestamp;
      await Messages.create(mensaje);
      return mensaje;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getAll(options) {
    try {
      let mensajes;
      if (options?.sort == true) {
        mensajes = await Messages.find({}).sort({ timestamp: -1 });
      } else {
        mensajes = await Messages.find({});
      }
      return mensajes;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = mensajesDaos