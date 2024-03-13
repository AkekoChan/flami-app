import Router from "express";
import flamiController from "../controllers/flami.controller.js";

const router = Router();

router.get("/", flamiController.getFlami);
router.patch("/competition", flamiController.competition);
router.patch("/training", flamiController.training);

router.post("/share", flamiController.share);

export default router;