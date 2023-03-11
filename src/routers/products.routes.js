import { Router } from "express";
const router = Router();
import { authJwt } from "../middlewares/index.js";


import * as productsCtrl from "../controllers/products.controllers.js";

router.post("/", [authJwt.veryfyToken, authJwt.isAdmin],productsCtrl.createProduct)
router.get("/", [authJwt.veryfyToken, authJwt.isAdmin],productsCtrl.getProducts)
router.get("/:productId", [authJwt.veryfyToken, authJwt.isAdmin],productsCtrl.getProductByid)
router.put("/:productId", [authJwt.veryfyToken,authJwt.isAdmin],productsCtrl.updateProductByid)

export default router;