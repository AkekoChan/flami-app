import Router from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.get("/profile", userController.getProfile);
router.get("/badges", userController.getBadges);
router.patch("/account", userController.updateAccount);

export default router;
