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
        badges: userdata.badges.map((item) => json[item.id])
        .sort((a, b) => a.created_at < b.created_at ? 1 : -1)
        .slice(0, 3),
        created_at: new Date(userdata.created_at).toDateString(),
      },
    });
  },
  getCosmetics: async (req, res) => {
    let userdata = res.locals.user;

    let content = await readFile("./data/cosmetics.json", { encoding: "utf8" });
    let json = JSON.parse(content);

    let sorted_cosmetics = {
      head: [],
      back: [],
      hands: [],
      feet: []
    }

    let items = userdata.owned_cosmetics.map(item => {
      let jitem = json[item.id];
      if(jitem) sorted_cosmetics[jitem.category]?.push(jitem)
    });

    return res.status(200).json({
      data: {
        cosmetics: sorted_cosmetics
      }
    });
  },
  getBadges: async (req, res) => {
    let userdata = res.locals.user;
    let content = await readFile("./data/badges.json", { encoding: "utf8" });
    let badges = JSON.parse(content);

    userdata.badges.forEach(badge => {
      badges[badge.id].owned = true;
    });

    return res.status(200).json({
      data: Object.values(badges)
    });
  },
  getBadge: async (req, res) => {
    let userdata = res.locals.user;
    let content = await readFile("./data/badges.json", { encoding: "utf8" });
    let badges = JSON.parse(content);
    let badge = Object.values(badges).find(badge => badge.id === req.params.badge);

    if(!userdata.badges.find(b => b.id === badge.id)) return res.status(403).json({
      message: `Tu ne possède pas ce badge.`,
      error: 403
    });

    return res.status(200).json({
      data: badge
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
