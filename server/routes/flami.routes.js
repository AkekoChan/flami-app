import Router from "express";
import flamiController from "../controllers/flami.controller.js";

const router = Router();

router.get("/", flamiController.getFlami);
router.put("/ranked", flamiController.rankup);

router.get("/share", flamiController.share);
router.get("/cosmetics", flamiController.getCosmetics);

export default router;