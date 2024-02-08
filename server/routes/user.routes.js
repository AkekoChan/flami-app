import Router from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.get("/profile", userController.getProfile);
router.get("/badges", userController.getBadges);
router.get("/account", userController.getAccount);
router.put("/account", userController.updateAccount);

export default router;
