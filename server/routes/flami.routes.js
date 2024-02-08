import Router from "express";
import flami from "../controllers/flami.controller.js";

const router = Router();

router.get("/", flami.getFlami);
router.put("/ranked", flami.ranked);

router.get("/share", flami.share);
router.get("/cosmetics", flami.getCosmetics);

export default router;