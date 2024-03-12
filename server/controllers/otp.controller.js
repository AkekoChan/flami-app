import otpGenerator from "otp-generator";
import otpModel from "../models/otp.model.js";
import userModel from "../models/user.model.js";
import auth from "../helpers/authMiddleware.js";

const otpController = {
  sendOTP: async (req, res) => {
    try {
      const { email } = req.body;

      const existingUser = await userModel.findOne({ email });

      if (!existingUser) {
        return res
          .status(404)
          .json({ message: "Ce compte n'existe pas.", error: 404 });
      }

      const existingOTP = await otpModel.findOne({ email });
      if (existingOTP) {
        return res.status(400).json({
          message:
            "Un code de vérification est déjà en cours d'utilisation. Veuillez attendre de recevoir votre code.",
          error: 400,
        });
      }

      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const otpPayload = { email, otp };
      await otpModel.create(otpPayload);

      res.status(200).json({
        data: {
          message: "Un code de vérification a été envoyé avec succès.",
          error: 200,
        },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Une erreur s'est produite.", error: 500 });
    }
  },

  verifyOTP: async (req, res) => {
    try {
      const { email, otp } = req.body;

      console.log(email, otp);
      const otpRecord = await otpModel.findOneAndDelete({ email, otp });
      if (!otpRecord) {
        return res.status(400).json({
          message: "Le code de vérification est incorrect.",
          error: 400,
        });
      }

      const otpExpiration = otpRecord.createdAt.getTime() + 5 * 60 * 1000;
      if (Date.now() > otpExpiration) {
        return res.status(400).json({
          message:
            "Le code de vérification a expiré. Veuillez en demander un nouveau.",
          error: 400,
        });
      }

      await userModel.findOneAndUpdate({ email }, { isVerified: true });
      let token = auth.encode({ email: email });

      res.status(200).json({
        data: {
          message: "Le code de vérification est valide.",
          token: token,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Une erreur s'est produite.", error: 500 });
    }
  },
};

export default otpController;
