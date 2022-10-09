import { Router } from "express";
import { productosDaos } from "../daos/productosDaos.js";

const routerApi = Router();
routerApi.get("/", productosDaos.getData);

export default routerApi;
