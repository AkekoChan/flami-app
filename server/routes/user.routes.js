import Router from "express";
import user from "../controllers/user.controller.js";

const router = Router();

router.get("/profile", user.getProfile);
router.get("/badges", user.getBadges);
router.get("/account", user.getAccount);
router.put("/account", user.updateAccount);

export default router;
