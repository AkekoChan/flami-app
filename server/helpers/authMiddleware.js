import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const auth = {
  encode: (data) => {
    return jwt.sign(data, process.env.PRIVATE, { expiresIn: 1209600 });
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
      
      if (!user[0])
        throw {
          code: 404,
          message:
            "Echec d'authentification, l'utilisateur du jeton n'existe pas.",
        };
      res.locals.user = user[0];
      return next();
    } catch (error) {
      return res
        .status(error.code ?? 401)
        .json({ message: error.message, error: error.code ?? 401 });
    }
  }
};

export default auth;
