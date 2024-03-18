import { readFile } from "fs/promises";
import flamiModel from "../models/flami.model.js";
import userModel from "../models/user.model.js";
import flamitradeModel from "../models/flamitrade.model.js";
import { cp } from "fs";
import mongoose from "mongoose";

const flamiController = {
    getFlami: async (req, res) => {
        let userdata = res.locals.user;
        let flami = await flamiModel.findById(userdata.flami_id);
        let keeped_flami = userdata.keeped_flami ? await flamiModel.findById(userdata.keeped_flami_id) : null;
        let trade = await flamitradeModel.getLastUserTrade(userdata._id);
        
        let content = await readFile("./data/cosmetics.json", { encoding: "utf8" });
        let json = JSON.parse(content);

        return res.status(200).json({
            data: {
                my_flami: {
                    name: flami.name,
                    stats: flami.stats,
                    cosmetics: flami.cosmetics.map(item => json[item.id]),
                    location: trade?.flamis_positions[flami._id] ?? { lat: null, long: null },
                    _id: flami.id
                },
                keeped_flami: keeped_flami ? {
                    name: flami.name,
                    cosmetics: flami.cosmetics.map(item => json[item.id]),
                    location: trade?.flamis_positions[keeped_flami._id] ?? { lat: null, long: null },
                    _id: keeped_flami.id
                } : null,
                last_trade_date: trade?.created_at ?? null
            }
        });
    },
    share: async (req, res) => {
        // IN THIS CONTEXT YOU ARE THE FLASHER !!
        let userdata = res.locals.user;
        const { shared_flami_id, location, shared_location } = req.body;
        const flami_id = userdata.flami_id;

        let shared_user = userModel.findOne({ flami_id: shared_flami_id });

        if(!shared_user) {
            return res.status(404).json({
                message: `Ce Flami n'existe pas.`,
                error: 404
            });
        }

        let shared_flami = flamiModel.findOne({ _id: shared_flami_id });
        let flami = flamiModel.findOne({ _id: userdata.keeped_flami_id ?? flami_id });

        let sharer_last_trade = flamitradeModel.getLastUserTrade(shared_user._id);
        if(sharer_last_trade.created_at.toDateString() === new Date().toDateString()) return res.status(401).json({ message: "La personne avec qui tu échange a déjà fait un échange aujourd'hui.", error: 401 });

        let user_last_trade = flamitradeModel.getLastUserTrade(userdata._id);
        if(user_last_trade.created_at.toDateString() === new Date().toDateString()) return res.status(401).json({ message: "Tu as déjà fait un échange aujourd'hui.", error: 401 });

        await flamitradeModel.create({
            owners: {
                flasher: userdata._id,
                sender: shared_user._id
            },
            flamis: {
                flasher: flami_id,
                sender: shared_flami_id
            },
            flamis_positions: {
                [flami_id]: {
                    lat: location.latitude,
                    long: location.longitude
                },
                [shared_flami_id]: {
                    lat: shared_location.latitude,
                    long: shared_location.longitude
                },
            }
        });

        shared_flami.keeper_id = userdata._id;
        flami.keeper_id = shared_user._id;

        shared_flami.save();
        flami.save();

        return res.status(202).json({
            data: {
                message: `Tu as bien reçu le ${shared_flami.name} !`
            }
        });
    },
    competition: (req, res) => {

    },
    training: async (req, res) => {
        let userdata = res.locals.user;
        const { worked_stat } = req.body;

        const f = await flamiModel.findOne({ _id: userdata.flami_id });
        f["stats"][worked_stat]++;
        f.save();

        return res.status(202).json({
            data: {
                message: `Flami a gagner en ${worked_stat} !`
            }
        });
    }
};

export default flamiController;