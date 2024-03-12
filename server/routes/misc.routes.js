import Router from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.get("/map", userController.getProfile);

export default router;