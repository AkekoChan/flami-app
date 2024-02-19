import mongoose from "mongoose";
import { mailSender } from "../helpers/mailSender.js";

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
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
      <p>Here is your OTP code: ${otp}</p>`
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
