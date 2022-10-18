import { Router } from "express";
import { productosDaos } from "../daos/productosDaos.js";

const productosRouter = Router();
productosRouter.get("/", productosDaos.getData);

export default productosRouter;
