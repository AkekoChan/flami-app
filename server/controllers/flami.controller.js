import { readFile } from "fs/promises";
import flamiModel from "../models/flami.model.js";
import flamitradeModel from "../models/flamitrade.model.js";
import userModel from "../models/user.model.js";

const flamiController = {
  equipCosmetic: async (req, res) => {
    let userdata = res.locals.user;
    let cosmetic_id = req.body.cosmetic_id;
    let flami = await flamiModel.findOne({ _id: userdata.flami_id });

    let content = await readFile("./data/cosmetics.json", { encoding: "utf8" });
    let json = JSON.parse(content);

    if (userdata.owned_cosmetics.findIndex((e) => e.id === cosmetic_id) === -1)
      return res.status(404).json({
        error: 404,
        message: "Tu ne possède pas ce cosmétique.",
      });

    if (flami.cosmetics.findIndex((cosm) => cosm.id === cosmetic_id) !== -1) {
      flami.cosmetics = flami.cosmetics.filter(
        (cosm) => cosm.id !== cosmetic_id
      );
    } else {
      flami.cosmetics.push({ id: cosmetic_id });
    }

    await flami.save();
    return res.status(200).json({
      data: {
        name: `Flami de ${userdata.name}`,
        cosmetics: flami.cosmetics.map((item) => json[item.id]),
        _id: flami.id,
        self: true,
      },
    });
  },
  getFlami: async (req, res) => {
    let userdata = res.locals.user;
    let flami = await flamiModel.findOne({ _id: userdata.flami_id });

    let trades = await flamitradeModel.getAllUserTrade(userdata._id);

    let traded_flami = trades[0] ? await flamiModel.findOne({
      _id: trades[0].flami_id,
    }) : null;

    let content = await readFile("./data/cosmetics.json", { encoding: "utf8" });
    let json = JSON.parse(content);

    let trailing = [];
    let d = await flamitradeModel.getAllFlamiTrade(flami._id);
    d.map((e) => {
      trailing.push(e.flamis_positions.get(flami._id));
    });

    return res.status(200).json({
      data: [
        {
          name: `Flami de ${userdata.name}`,
          cosmetics: flami.cosmetics.map((item) => json[item.id]),
          location: trailing[0] || null,
          _id: flami.id,
          owner_id: userdata._id,
          trail: trailing,
          last_trade: trades[0]?.created_at || null,
          self: true,
        },
        traded_flami
          ? {
              name: `Flami de ${(await userModel.findOne({ _id: traded_flami.owner_id }))?.name}`,
              cosmetics: traded_flami.cosmetics.map((item) => json[item.id]),
              _id: traded_flami.id,
              owner_id: traded_flami.owner_id,
              self: false,
            }
          : null,
      ],
    });
  },
  getPaliers: async (req, res) => {
    let userdata = res.locals.user;
    let user_palier = userdata.trade_palier;
    let user_trades = await flamitradeModel.getAllUserTrade(userdata._id);
    let message = null;

    let paliers = [1, 3, 5, 8, 10, 14, 18, 20, 22, 25, 30, 35, 40, 45, 50, 55, 60, 64, 68, 70, 75, 80, 84, 88, 90, 100];
    if (user_palier < user_trades.length) {
      if (paliers.includes(user_trades.length)) {
        let content = await readFile("./data/cosmetics.json", {
          encoding: "utf8",
        });
        let json = JSON.parse(content);
        let shuffled = Object.values(json)
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
        let cosm = shuffled.filter(
          (cosmetic) =>
            !userdata.owned_cosmetics.find((cosm) => cosm.id === cosmetic.id)
        );
        if (cosm[0]) {
          userdata.owned_cosmetics.push({
            id: cosm[0].id,
          });

          message = `Tu as reçu une cosmétique (${cosm[0].name}) !`;
        }
      }

      // ! IMPORTANT UPDATE TRADE PALIER
      userdata.trade_palier = user_trades.length;
    }

    let closest_palier =
      paliers.filter(
        (v, k) => v > user_trades.length && paliers[k + 1] > user_trades.length
      )[0] || null;

    if (!closest_palier) {
      closest_palier = user_trades.length - (user_trades.length % 10) + 8;
    }

    await userdata.save();
    return res.status(200).json({
      data: {
        message: message,
        next_palier: closest_palier,
        current_palier: userdata.trade_palier,
      },
    });
  },
  share: async (req, res) => {
    // ? IN THIS CONTEXT YOU ARE THE FLASHER !!

    let userdata = res.locals.user;
    const { shared_user_id, location, shared_location } = req.body;

    let shared_user = await userModel.findOne({ _id: shared_user_id });

    if (!shared_user) {
      return res.status(404).json({
        message: `Ce Flami n'existe pas.`,
        error: 404,
      });
    }

    let shared_user_trades = await flamitradeModel.getAllUserTrade(shared_user_id);
    let user_trades = await flamitradeModel.getAllUserTrade(userdata._id);

    let flami = await flamiModel.findOne({
      _id: (user_trades[0]?.flami_id || userdata.flami_id),
    });

    let shared_flami = await flamiModel.findOne({
      _id: (shared_user_trades[0]?.flami_id || shared_user.flami_id),
    });

    if (!shared_flami || !flami) {
      return res.status(404).json({
        message: `Ce Flami n'existe pas.`,
        error: 404,
      });
    }

    if (shared_flami._id.equals(flami._id)) {
      return res.status(404).json({
        message: `Ce sont les mêmes Flamis.`,
        error: 404,
      });
    }

    if (shared_user_trades[0]?.created_at.toDateString() === new Date().toDateString())
      return res.status(409).json({
        message:
          "La personne avec qui tu échange a déjà fait un échange aujourd'hui.",
        error: 409,
      });

    if (user_trades[0]?.created_at.toDateString() === new Date().toDateString())
      return res.status(409).json({
        message: "Tu as déjà fait un échange aujourd'hui.",
        error: 409,
      });

    let sharer_search_flami = await flamitradeModel.findOne({
      user_id: userdata._id,
      flami_id: shared_flami._id
    });

    if (sharer_search_flami || shared_flami._id.equals(userdata.flami_id))
      return res
        .status(409)
        .json({ message: "Tu as déjà reçu ce Flami précédement.", error: 409 });

    let user_search_flami = await flamitradeModel.findOne({
      user_id: shared_user._id,
      flami_id: flami._id
    });

    if (user_search_flami || flami._id.equals(shared_user.flami_id))
      return res.status(409).json({
        message:
          "La personne avec qui tu échange as déjà reçu ce Flami précedement.",
        error: 409,
      });

    await flamitradeModel.create({
      user_id: userdata._id,
      flami_id: shared_flami._id,
      flamis_positions: {
        [flami._id]: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        [shared_flami._id]: {
          latitude: shared_location.latitude,
          longitude: shared_location.longitude,
        },
      },
    });

    await flamitradeModel.create({
      user_id: shared_user._id,
      flami_id: flami._id,
      flamis_positions: {
        [flami._id]: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        [shared_flami._id]: {
          latitude: shared_location.latitude,
          longitude: shared_location.longitude,
        },
      },
    });

    return res.status(202).json({
      data: {
        message: `Tu as bien reçu le Flami de ${(await userModel.findOne({ _id: shared_flami.owner_id }))?.name} !`,
      },
    });
  },
};

export default flamiController;
