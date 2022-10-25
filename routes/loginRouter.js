import { Router } from "express";
const loginRouter = Router();
import { loginDaos } from "../daos/loginDaos.js";
import passport from "passport";

loginRouter.get("/", loginDaos.get);
loginRouter.post("/", loginDaos.postLogin);
loginRouter.get("/errorLogin", loginDaos.errorLogin);
loginRouter.post("/",passport.authenticate("login", { failureRedirect: "/login/errorlogin" }),
  loginDaos.postLogin
);

export default loginRouter;
