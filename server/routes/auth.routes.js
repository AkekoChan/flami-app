import Router from "express";
import authController from "../controllers/auth.controller.js";
import otpController from "../controllers/otp.controller.js";

const router = Router();

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.post("/send-otp", otpController.setOTP);

export default router;
