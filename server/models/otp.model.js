import mongoose from "mongoose";
import { mailSender } from "../mail/mailSender.js";
import { readFile } from "fs/promises";

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
    let content = await readFile('./mail/otp-base.html', { encoding: "utf8" });
    await mailSender(
      email,
      "Code de confirmation pour Flami",
      content.replace("${otp}", otp)
    );
  } catch (error) {
    console.error(error);
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