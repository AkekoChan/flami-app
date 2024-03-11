import bcrypt from "bcryptjs";
import auth from "../helpers/authMiddleware.js";
import userModel from "../models/user.model.js";

const authController = {
  token: async (req, res) => {
    let userdata = res.locals.user;
    let token = auth.encode({ email: userdata.email });

    return res.status(201).json({
      data: {
        token: token,
      },
    });
  },
  signup: async (req, res) => {
    let userdata = req.body;

    if (!userdata.email ||
      !String(userdata.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
      return res.status(401).json({
        message: `E-mail invalide.`,
        error: 401,
      });
    }

    if (!userdata.password ||
      !String(userdata.password).match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )) {
      return res.status(401).json({
        message:
          "Le mot de passe doit contenir 8 caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
        error: 401,
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
        data: {
          message: `Inscription finalisée. Bienvenue ${new_user.name} !`,
          token: token,
        },
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
        console.error(error);
        return res.status(409).json({ message: "Une erreur s'est produite.", error: 409 });
      }
    }
  },
  signin: async (req, res) => {
    let userdata = req.body;

    try {
      let user = await userModel.findByEmail(userdata.email);

      if (!user) {
        return res
          .status(404)
          .json({ message: "E-mail ou mot de passe incorrect.", error: 404 });
      }

      if (!user.isVerified) {
        return res
          .status(403)
          .json({ message: "Code de vérification non vérifié.", error: 403 });
      }

      const isValid = bcrypt.compareSync(userdata.password, user.password);

      if (isValid) {
        let token = auth.encode({ email: user.email });
        req.brute.reset(); // reset brute counter
        return res.status(200).json({
          data: {
            message: "Bienvenue sur l'application Flami !",
            token: token,
          },
        });
      } else {
        return res
          .status(401)
          .json({ message: "E-mail ou mot de passe incorrect.", error: 401 });
      }
    } catch (error) {
      return res.status(404).json({ message: "Une erreur s'est produite.", error: 404 });
    }
  },
};

export default authController;
