import Router from "express";
import user from "../controllers/user.controller.js";
import flami from "../controllers/flami.controller.js";

const router = Router();

router.get("/flami", flami.getFlami);
router.get("/badges", user.getBadges);
router.get("/profile", user.getProfile);

export default router;
