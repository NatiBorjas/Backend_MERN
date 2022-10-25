import { Router } from "express";
const signupRouter = Router();
import { registroDaos } from "../daos/registroDaos.js";
import passport from "passport";

signupRouter.get("/", registroDaos.get);
signupRouter.get("/errorregistro", registroDaos.errorSignup);
signupRouter.post("/",passport.authenticate("signup", { failureRedirect: "/registro/errorregistro" }),
  registroDaos.postsignup
);

export default signupRouter;
