import mongoose from "mongoose";
import { mailSender } from "../mail/mailSender.js";
import templateOTP from "../mail/templateOTP.mjs";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

const sendVerificationEmail = async (email, otp) => {
  try {
    await mailSender(
      email,
      "Code de confirmation pour Flami",
      templateOTP(otp)
    );
  } catch (error) {
    throw error;
  }
};

otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

export default mongoose.model("OTP", otpSchema);