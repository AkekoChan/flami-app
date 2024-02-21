import Router from "express";
import authController from "../controllers/auth.controller.js";
import forgetPasswordController from "../controllers/forgetPassword.controller.js";
import otpController from "../controllers/otp.controller.js";
import auth from "../helpers/authMiddleware.js";

const router = Router();

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.post("/send-otp", otpController.setOTP);
router.post("/forget-password", forgetPasswordController.forgetPassword);
router.post("/reset-password/:token", forgetPasswordController.resetPassword);
router.post("/verify", auth.verify);

export default router;
