import userModel from "../models/user.model.js";
import auth from "../helpers/authMiddleware.js";
import bcrypt from "bcryptjs";

const userController = {
  getProfile: (req, res) => {
    let userdata = res.locals.user;
    return res.status(200).json({
      data: {
        name: userdata.name,
        email: userdata.email,
        created_at: new Date(userdata.date).toDateString(),
      },
    });
  },
  // getAccount: (req, res) => {

  // },
  getBadges: (req, res) => {
    let userdata = res.locals.user;
    return res.status(200).json({
      data: {
        badges: userdata.badges,
      },
    });
  },
  updateAccount: async (req, res) => {
    let userdata = res.locals.user;
    const { password, name, email } = req.body;

    let patch = {};

    if (
      password &&
      String(password).match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    )
      patch.password = bcrypt.hashSync(password, bcrypt.genSaltSync(11));
    if (name) patch.name = name;
    if (email) patch.email = email;

    await userModel.updateOne({ _id: userdata._id }, patch);

    let token = auth.encode({ email: email ?? userdata.email });
    return res.status(200).json({
      data: {
        message: "Informations de compte misent à jour.",
        token: token,
      },
    });
  },
};

export default userController;
