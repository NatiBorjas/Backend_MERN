import { Router } from "express";
const homeRouter = Router();
import { loginDaos } from "../daos/loginDaos.js";

homeRouter.get("/", loginDaos.auth, (req, res, next) => {
  res.render("pages/home", { name: req.session.username });
});

export default homeRouter;
