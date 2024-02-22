import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mailSender } from "../mail/mailSender.js";
import userModel from "../models/user.model.js";
import templateForgotPassword from "../mail/templateForgotPassword.mjs";

const forgetPasswordController = {
  forgetPassword: async (req, res) => {
    try {
      const user = await userModel.findByEmail(req.body.email);

      if (!user) {
        return res
          .status(404)
          .json({ message: "Ce compte n'existe pas.", error: 404 });
      }

      console.log(user[0]._id);

      const token = jwt.sign({ email: user[0].email }, process.env.PRIVATE, {
        expiresIn: "10m",
      });

      console.log(token);

      const info = await mailSender(
        user[0].email,
        "Mot de passe oublié ? - Flami vient à votre aide ! 🔥",
        templateForgotPassword(`${res.domain}/reset-password/${token}`)
      );

      if (!info) {
        return res.status(500).json({ message: "Email non envoyé." });
      }

      return res.status(200).json({ message: "Email envoyé." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const decodedToken = jwt.verify(req.params.token, process.env.PRIVATE);

      if (!decodedToken) {
        return res.status(401).json({ message: "Token invalide." });
      }

      const user = await userModel.findOneAndUpdate(decodedToken.email, {
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(11)),
      });
      if (!user) {
        return res.status(401).json({ message: "Ce compte n'existe pas." });
      }

      return res.status(200).json({ message: "Mot de passe mis à jour." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default forgetPasswordController;
