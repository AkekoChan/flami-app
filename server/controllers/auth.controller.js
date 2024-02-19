import bcrypt from "bcryptjs";
import auth from "../helpers/authMiddleware.js";
import OTPModel from "../models/otp.model.js";
import userModel from "../models/user.model.js";

const authController = {
  signup: async (req, res) => {
    let userdata = req.body;

    const otpResponse = await OTPModel.find({ email: userdata.email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (otpResponse.length === 0 || userdata.otp !== otpResponse[0].otp) {
      return res.status(400).json({
        message: "Le code n'est pas correct.",
      });
    }

    userdata.password = bcrypt.hashSync(
      userdata.password,
      bcrypt.genSaltSync(11)
    );

    let new_user = new userModel(userdata);

    try {
      await new_user.save();
      let token = auth.encode({ email: new_user.email });

      return res.status(201).json({
        message: `Inscription finalisé. Bienvenue ${new_user.name} !`,
        data: { jwt: token },
      });
    } catch (error) {
      if (error.keyValue && error.keyValue.email) {
        return res.status(409).json({
          message: `Un compte avec cet email (${error.keyValue.email}) existe déjà.`,
          error: 409,
        });
      } else if (error.keyValue && error.keyValue.name) {
        return res.status(409).json({
          message: `Un compte avec ce nom (${error.keyValue.name}) existe déjà.`,
          error: 409,
        });
      } else if (error.keyValue && error.keyValue.age) {
        return res.status(409).json({
          message: `L'âge requis pour utiliser cette application est de 13 ans.`,
          error: 409,
        });
      } else {
        return res.status(409).json({ message: error.message, error: 409 });
      }
    }
  },
  signin: async (req, res) => {
    let userdata = req.body;
    try {
      let user = await userModel.findByEmail(userdata.email);

      if (!user[0]) {
        return res
          .status(404)
          .json({ message: "Ce compte n'existe pas.", error: 404 });
      }

      user = user[0];

      const isValid = bcrypt.compareSync(userdata.password, user.password);
      if (isValid) {
        let token = auth.encode({ email: user.email });
        return res
          .status(200)
          .json({ message: "Authentification réussie.", data: { jwt: token } });
      } else {
        return res
          .status(401)
          .json({ message: "Mot de passe incorrect.", error: 401 });
      }
    } catch (error) {
      return res.status(404).json({ message: error.message, error: 404 });
    }
  },
};

export default authController;
