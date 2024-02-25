import otpGenerator from "otp-generator";
import otpModel from "../models/otp.model.js";
import userModel from "../models/user.model.js";

const otpController = {
  sendOTP: async (req, res) => {
    try {
      const { email } = req.body;

      const existingUser = await userModel.findOne({ email });
      console.log(existingUser);
      if (!existingUser) {
        return res.status(404).json({ message: "Ce compte n'existe pas." });
      }

      const existingOTP = await otpModel.findOne({ email });
      if (existingOTP) {
        return res.status(400).json({
          message:
            "Un OTP est déjà en cours d'utilisation. Veuillez attendre de recevoir votre code.",
        });
      }

      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const otpPayload = { email, otp };
      await otpModel.create(otpPayload);

      res.status(200).json({ message: "OTP envoyé avec succès." });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  },

  verifyOTP: async (req, res) => {
    try {
      const { email, otp } = req.body;

      const otpRecord = await otpModel.findOne({ email, otp });
      if (!otpRecord) {
        return res
          .status(400)
          .json({ message: "Le code de vérification est incorrect." });
      }

      const otpExpiration = otpRecord.createdAt.getTime() + 5 * 60 * 1000;
      if (Date.now() > otpExpiration) {
        return res.status(400).json({
          message:
            "Le code de vérification a expiré. Veuillez en demander un nouveau.",
        });
      }

      await otpRecord.remove();

      res.status(200).json({ message: "Le code de vérification est valide." });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  },
};

export default otpController;
