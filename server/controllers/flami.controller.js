import { readFile } from "fs/promises";
import flamiModel from "../models/flami.model.js";
import userModel from "../models/user.model.js";
import flamitradeModel from "../models/flamitrade.model.js";

const flamiController = {
    equipCosmetic: async (req, res) => {
        let userdata = res.locals.user;
        let cosmetic_id = req.body.cosmetic_id;
        let flami = await flamiModel.findOne({ _id: userdata.flami_id });
        if(userdata.owned_cosmetics.findIndex(e => e.id === cosmetic_id) === -1) return res.status(404).json({
            error: 404,
            message: "Tu ne possède pas ce cosmétique."
        });

        if(flami.cosmetics.findIndex((cosm) => cosm.id === cosmetic_id) !== -1) {
            console.log("deleted")
            flami.cosmetics = flami.cosmetics.filter((cosm) => cosm.id !== cosmetic_id);
        } else {
            console.log("psuhed")
            flami.cosmetics.push({ id: cosmetic_id });
        }

        await flami.save();
        return flamiController.getFlami(req, res);
    },
    getFlami: async (req, res) => {
        let userdata = res.locals.user;
        let flami = await flamiModel.findOne({ _id: userdata.flami_id });
        let kept_flami = userdata.kept_flami_id ? await flamiModel.findOne({ _id: userdata.kept_flami_id }) : null;
        let trade = await flamitradeModel.getLastUserTrade(userdata);
        
        let content = await readFile("./data/cosmetics.json", { encoding: "utf8" });
        let json = JSON.parse(content);

        let trailing = [];
        if(req.query.trail !== undefined) {
            let d = await flamitradeModel.getFlamiTrailing(flami);
            d.map(e => {
                trailing.push(e.flamis_positions.get(flami._id));
            });
        }

        return res.status(200).json({
            data: {
                my_flami: {
                    name: flami.name,
                    stats: flami.stats,
                    cosmetics: flami.cosmetics.map(item => json[item.id]),
                    location: trade?.flamis_positions.get(flami.id),
                    _id: flami.id,
                    owner: flami.owner_id,
                    trail: trailing
                },
                kept_flami: kept_flami ? {
                    name: kept_flami.name,
                    cosmetics: kept_flami.cosmetics.map(item => json[item.id]),
                    location: trade?.flamis_positions.get(kept_flami.id),
                    _id: kept_flami.id,
                    owner: kept_flami.owner_id
                } : null,
                last_trade_date: trade?.created_at || null
            }
        });
    },
    share: async (req, res) => {
        // ? IN THIS CONTEXT YOU ARE THE FLASHER !!

        let userdata = res.locals.user;
        const { shared_user_id, location, shared_location } = req.body;
        const flami_id = userdata.flami_id;

        let shared_user = await userModel.findOne({ _id: shared_user_id });

        if(!shared_user) {
            return res.status(404).json({
                message: `Ce Flami n'existe pas.`,
                error: 404
            });
        }

        let shared_flami = await flamiModel.findOne({ _id: shared_user.kept_flami_id || shared_user.flami_id });
        let flami = await flamiModel.findOne({ _id: userdata.kept_flami_id || flami_id });

        if(!shared_flami || !flami) {
            return res.status(404).json({
                message: `Ce Flami n'existe pas.`,
                error: 404
            });
        }

        if(shared_flami._id === flami._id) {
            return res.status(404).json({
                message: `Ce sont les mêmes Flamis.`,
                error: 404
            });
        }

        let sharer_last_trade = await flamitradeModel.getLastUserTrade(shared_user);
        if(sharer_last_trade?.created_at.toDateString() === new Date().toDateString()) return res.status(409).json({ message: "La personne avec qui tu échange a déjà fait un échange aujourd'hui.", error: 409 });

        let user_last_trade = await flamitradeModel.getLastUserTrade(userdata);
        if(user_last_trade?.created_at.toDateString() === new Date().toDateString()) return res.status(409).json({ message: "Tu as déjà fait un échange aujourd'hui.", error: 409 });

        let sharer_search_flami = await flamitradeModel.findOne({ $where: () => 
           Object.values(this.flamis).includes(shared_flami._id) && 
           Object.values(this.owners).includes(userdata._id)
        });

        if(sharer_search_flami) return res.status(409).json({ message: "Tu as déjà reçu ce Flami précédement.", error: 409 });
        
        let user_search_flami = await flamitradeModel.findOne({ $where: () => 
            Object.values(this.flamis).includes(flami._id) && 
            Object.values(this.owners).includes(shared_user_id)
         });
        
        if(sharer_search_flami) return res.status(409).json({ message: "La personne avec qui tu échange as déjà reçu ce Flami précedement.", error: 409 });

        await flamitradeModel.create({
            owners: {
                flasher: userdata._id,
                sender: shared_user._id
            },
            flamis: {
                flasher: flami_id,
                sender: shared_flami._id
            },
            flamis_positions: {
                [flami_id]: {
                    latitude: location.latitude,
                    longitude: location.longitude
                },
                [shared_flami._id]: {
                    latitude: shared_location.latitude,
                    longitude: shared_location.longitude
                },
            }
        });

        await flamiModel.updateOne({ owner_id: userdata._id }, { keeper_id: shared_user._id });
        await flamiModel.updateOne({ owner_id: shared_user._id }, { keeper_id: userdata._id });

        await userModel.updateOne({ _id: userdata._id }, { kept_flami_id: shared_flami._id });
        await userModel.updateOne({ _id: shared_user._id }, { kept_flami_id: flami._id });

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