import { Router } from "express";
const loginRouter = Router();
import { loginDaos } from "../daos/loginDaos.js";

loginRouter.get("/", loginDaos.get);

loginRouter.post("/", loginDaos.postLogin);

export default loginRouter;
