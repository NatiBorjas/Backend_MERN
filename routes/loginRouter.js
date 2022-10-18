import { Router } from "express";
const loginRouter = Router();
import { loginController } from "../daos/loginDaos.js";

loginRouter.get("/", loginController.get);

loginRouter.post("/", loginController.postLogin);

export default loginRouter;
