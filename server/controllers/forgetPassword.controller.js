import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import jwt from "jsonwebtoken";
import { mailSender } from "../mail/mailSender.js";
import userModel from "../models/user.model.js";

dotenv.config();

const forgetPasswordController = {
  forgetPassword: async (req, res) => {
    try {
      const user = await userModel.findByEmail(req.body.email);

      if (!user) {
        return res
          .status(404)
          .json({ message: "Ce compte n'existe pas.", error: 404 });
      }

      const token = jwt.sign({ email: user.email }, process.env.PRIVATE, {
        expiresIn: "10m",
      });

      let content = await readFile("./mail/forget-base.html", {
        encoding: "utf8",
      });

      const info = await mailSender(
        user.email,
        "Mot de passe oublié ? - Flami vient à votre aide !",
        content.replace(
          "${link}",
          `${
            process.env.ENVIRONMENT === "dev"
              ? process.env.URL_APP_DEV
              : process.env.URL_APP_PROD
          }/reset-password/${token}`
        )
      );

      if (!info) {
        return res
          .status(500)
          .json({ data: { message: "E-mail non envoyé.", error: 500 } });
      }

      return res
        .status(200)
        .json({ data: { message: "E-mail envoyé.", error: 200 } });
    } catch (error) {
      return res.status(500).json({ message: error.message, error: 500 });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const decodedToken = jwt.verify(req.params.token, process.env.PRIVATE);

      if (!decodedToken) {
        return res.status(401).json({ message: "Token invalide.", error: 401 });
      }

      const user = await userModel.findOneAndUpdate(
        { email: decodedToken.email },
        {
          password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(11)),
        }
      );
      if (!user) {
        return res
          .status(401)
          .json({ message: "Ce compte n'existe pas.", error: 401 });
      }

      return res.status(200).json({
        data: {
          message: "Mot de passe mis à jour.",
          email: decodedToken.email,
          error: 200,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, error: 500 });
    }
  },
};

export default forgetPasswordController;
