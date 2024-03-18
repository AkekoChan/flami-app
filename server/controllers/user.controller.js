import userModel from "../models/user.model.js";
import auth from "../helpers/authMiddleware.js";
import bcrypt from "bcryptjs";
import { readFile } from "fs/promises";

const userController = {
  getProfile: async (req, res) => {
    let userdata = res.locals.user;
    let content = await readFile("./data/badges.json", { encoding: "utf8" });
    let json = JSON.parse(content);
    return res.status(200).json({
      data: {
        name: userdata.name,
        email: userdata.email,
        badges: [...userdata.badges.sports, ...userdata.badges.etapes]
          .slice(Math.max(0, userdata.badges.length - 3))
          .map((id) => json[id] || json[0]),
        created_at: new Date(userdata.created_at).toDateString(),
      },
    });
  },
  getCosmetics: async (req, res) => {
    let userdata = res.locals.user;

    let content = await readFile("./data/cosmetics.json", { encoding: "utf8" });
    let json = JSON.parse(content);

    return res.status(200).json({
      data: {
        cosmetics: userdata.owned_cosmetics.map(id => json[id])
      }
    });
  },
  getBadges: async (req, res) => {
    let userdata = res.locals.user;
    let content = await readFile("./data/badges.json", { encoding: "utf8" });
    let json = JSON.parse(content);
    return res.status(200).json({
      data: {
        badges_sports: json["badges_sports"].map(item => {
          userdata.badges.sports.findIndex((badge) => badge.id === item.id) !== -1 ? item.owned = true : item.owned = false
          return item;
        }),
        badges_etapes: json["badges_etapes"].map(item => {
          userdata.badges.etapes.findIndex((badge) => badge.id === item.id) !== -1 ? item.owned = true : item.owned = false
          return item;
        })
      }
    });
  },
  updateAccount: async (req, res) => {
    let userdata = res.locals.user;
    const { password, name, email } = req.body;

    let patch = {};

    if (password &&
      String(password).match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ))
      patch.password = bcrypt.hashSync(password, bcrypt.genSaltSync(11));
    if (name) patch.name = name;
    if (email) patch.email = email;

    await userModel.updateOne({ _id: userdata._id }, patch);

    let token = auth.encode({ email: email || userdata.email });
    return res.status(200).json({
      data: {
        message: "Informations de compte misent à jour.",
        token: token,
      },
    });
  },
};

export default userController;
