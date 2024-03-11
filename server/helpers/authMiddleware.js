import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const auth = {
  encode: (data) => {
    return jwt.sign(data, process.env.PRIVATE, { expiresIn: 60 * 5 });
  },
  require: async (req, res, next) => {
    try {
      if (!req.headers.authorization)
        throw {
          code: 400,
          message:
            "Echec d'authentification, le header d'authorisation est manquant.",
        };

      let userdata = jwt.verify(
        req.headers.authorization.replace("Bearer ", ""),
        process.env.PRIVATE
      );

      let user = await userModel.findByEmail(userdata.email);

      if (!user) {
        throw {
          code: 404,
          message:
            "Echec d'authentification, l'utilisateur du jeton n'existe pas.",
        };
      }

      if (!user.isVerified) {
        throw {
          code: 403,
          message: "L'utilisateur n'est pas vérifié.",
        };
      }

      res.locals.user = user;
      return next();
    } catch (error) {
      return res
        .status(error.code ?? 401)
        .json({ message: "Une erreur s'est produite.", error: error.code ?? 401 });
    }
  },
};

export default auth;
