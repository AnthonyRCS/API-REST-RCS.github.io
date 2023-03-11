import { Router } from "express";
const routes = Router();
import { authJwt } from "../middlewares/index.js";
import *as userCtrl from "../controllers/user.controller.js"

routes.post("/",[authJwt.veryfyToken,authJwt.isAdmin],userCtrl.createUsuario)
routes.get("/",[authJwt.veryfyToken,authJwt.isAdmin],userCtrl.getUsuario)
routes.get("/:userId",[authJwt.veryfyToken,authJwt.isAdmin], userCtrl.getUsuarioByid)
routes.put("/:userId",[authJwt.veryfyToken,authJwt.isAdmin],userCtrl.updateUsuarioByid)
export default routes;