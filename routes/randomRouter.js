import { Router } from "express";
import { apiRandomDaos } from "../daos/randomDaos.js";
const randomsRouter = Router();

randomsRouter.get("/", apiRandomDaos.get);
randomsRouter.post("/", apiRandomDaos.post);

export default randomsRouter;