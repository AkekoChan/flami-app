import Router from "express";
import flamiController from "../controllers/flami.controller.js";

const router = Router();

router.get("/", flamiController.getFlami);
router.patch("/equip", flamiController.equipCosmetic);
router.post("/share", flamiController.share);
router.get("/paliers", flamiController.getPaliers);

export default router;