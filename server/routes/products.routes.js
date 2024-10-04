import express from "express";
const router = express.Router();
import productCtrl from "../controllers/products.controller.js";

router.route("/store/supplements").get(productCtrl.list);
router.route("/store/supplements/:id").get(productCtrl.productByID);
router.route("/store/supplements").post(productCtrl.create);
router.route("/store/supplements").delete(productCtrl.remove);
router.route("/store/supplements/:id").delete(productCtrl.removeByID);

export default router;
