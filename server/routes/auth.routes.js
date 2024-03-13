import Router from "express";
import authController from "../controllers/auth.controller.js";
import forgetPasswordController from "../controllers/forgetPassword.controller.js";
import auth from "../helpers/authMiddleware.js";
import otpController from "../controllers/otp.controller.js";
import ExpressBrute from "express-brute";
import MemcachedStore from "express-brute-memcached";

const router = Router();

let store;

if (process.env.ENVIRONMENT == "dev") {
  store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
} else {
  // stores state with memcached
  store = new MemcachedStore(["3.75.158.163:11211"], {
    prefix: "NoConflicts",
  });
}

let failCallback = function (req, res, next, nextValidRequestDate) {
  let timestamp = new Date().getTime();
  let diff = nextValidRequestDate - timestamp;
  return res.status(429).json({
    message: `Trop de tentative invalide dans un temps imparti. Réessayez dans ${
      diff / 1000 / 60
    } minute(s).`,
    error: 429,
  });
};

let handleStoreError = function (error) {
  throw {
    message: error.message,
    parent: error.parent,
  };
};

let bruteforce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 10 * 60 * 1000, // 1 hour,
  failCallback: failCallback,
  handleStoreError: handleStoreError,
});

router.post("/signin", bruteforce.prevent, authController.signin);
router.post("/signup", bruteforce.prevent, authController.signup);

router.get("/token", auth.require, authController.token);

router.post("/send-otp", bruteforce.prevent, otpController.sendOTP);
router.post("/verify-otp", bruteforce.prevent, otpController.verifyOTP);
router.post(
  "/forget-password",
  bruteforce.prevent,
  forgetPasswordController.forgetPassword
);
router.post(
  "/reset-password/:token",
  bruteforce.prevent,
  forgetPasswordController.resetPassword
);

export default router;
