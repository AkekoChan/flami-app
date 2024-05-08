import bcrypt from "bcryptjs";
import { readFile } from "fs/promises";
import auth from "../helpers/authMiddleware.js";
import flamiModel from "../models/flami.model.js";
import flamitradeModel from "../models/flamitrade.model.js";
import userModel from "../models/user.model.js";

const userController = {
  getProfile: async (req, res) => {
    let userdata = res.locals.user;
    let content = await readFile("./data/badges.json", { encoding: "utf8" });
    let json = JSON.parse(content);
    return res.status(200).json({
      data: {
        name: userdata.name,
        email: userdata.email,
        badges: userdata.badges
          .map((item) => json[item.id])
          .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
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
      feet: [],
    };

    // userdata.owned_cosmetics = Object.values(json).map(e => ({ id: e.id }));
    // await userdata.save();

    Object.values(json).forEach((cosmetic) => {
      let owned = userdata.owned_cosmetics.find((c) => c.id === cosmetic.id);
      cosmetic["owned"] = !!owned;
      owned
        ? sorted_cosmetics[cosmetic.category].unshift(cosmetic)
        : sorted_cosmetics[cosmetic.category].push(cosmetic);
    });

    return res.status(200).json({
      data: {
        cosmetics: sorted_cosmetics,
      },
    });
  },
  getBadges: async (req, res) => {
    let userdata = res.locals.user;
    let content = await readFile("./data/badges.json", { encoding: "utf8" });
    let badges = JSON.parse(content);

    userdata.badges.forEach((badge) => {
      badges[badge.id].owned = true;
    });

    return res.status(200).json({
      data: Object.values(badges),
    });
  },
  getFlamiCollection: async (req, res) => {
    let userdata = res.locals.user;
    let user_trades = await flamitradeModel.getAllUserTrade(userdata._id);

    const flami_collection = [];

    let content = await readFile("./data/cosmetics.json", { encoding: "utf8" });
    let json = JSON.parse(content);

    for (let index = 0; index < user_trades.length; index++) {
      const trade = user_trades[index];
      const flami = await flamiModel.findOne({ _id: trade.flami_id });

      if (flami) {
        flami_collection.push({
          name: `Flami de ${(await userModel.findById(flami.owner_id))?.name}`,
          cosmetics: flami.cosmetics.map((item) => json[item.id]),
          _id: flami.id,
          last_trade: trade.created_at,
          self: false,
        });
      }
    }

    return res.status(200).json({
      data: flami_collection,
    });
  },
  getBadge: async (req, res) => {
    let userdata = res.locals.user;
    let content = await readFile("./data/badges.json", { encoding: "utf8" });
    let badges = JSON.parse(content);
    let badge = Object.values(badges).find(
      (badge) => badge.id === req.params.badge
    );

    if (!userdata.badges.find((b) => b.id === badge.id))
      return res.status(403).json({
        message: `Tu ne possèdes pas ce badge.`,
        error: 403,
      });

    return res.status(200).json({
      data: badge,
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

    try {
      await userModel.updateOne({ _id: userdata._id }, patch);
    } catch ($err) {
      return res.status(403).json({
        message: "Ce nom de compte ou cet e-mail est déjà attribué",
        error: 403
      });
    }

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
