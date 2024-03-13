import { readFile } from "fs/promises";
import flamiModel from "../models/flami.model.js";
import userModel from "../models/user.model.js";

const flamiController = {
    getFlami: async (req, res) => {
        let userdata = res.locals.user;

        let flami = await flamiModel.findById(userdata.flami_id);

        let shared_flami = await flamiModel.findById(userdata.shared_flami.id);
        let sharer_user;

        if(shared_flami) {
            sharer_user = await userModel.findById(shared_flami.owner_id);
        }
        
        let content = await readFile("./data/cosmetics.json", { encoding: "utf8" });
        let json = JSON.parse(content);

        return res.status(200).json({
            data: {
                owner: userdata.name,
                cosmetics: flami.cosmetics.map((id) => json[id] ?? json[0]),
                stamina: flami.stamina,
                stats: flami.stats,
                location: flami.location,
                last_action: flami.last_action_time,
                last_share: userdata.shared_flami?.shared_date || null,
                _id: flami._id,
                shared_flami: shared_flami ? {
                    owner: sharer_user.name,
                    cosmetics: shared_flami.cosmetics.map((id) => json[id] ?? json[0]),
                    location: shared_flami.location,
                    stamina: shared_flami.stamina,
                    stats: shared_flami.stats,
                    last_action: shared_flami.last_action_time,
                    _id: shared_flami._id
                } : null
            }
        });
    },
    share: async (req, res) => {
        let userdata = res.locals.user;
        const { flami_id, location, location_shared } = req.body;

        let user_flami = await flamiModel.findById(userdata.shared_flami?.id || userdata.flami_id);
        let shared_flami = await flamiModel.findById(flami_id);
        let sharer_user;

        if(shared_flami) {
            sharer_user = await userModel.findById(shared_flami.current_sharer_id || shared_flami.owner_id);

            if(!sharer_user) {
                return res.status(404).json({
                    message: `Cet utilisateur n'existe pas.`,
                    error: 404
                });
            }

            if(sharer_user._id === userdata._id) {
                return res.status(409).json({
                    message: `Ces utilisateurs sont identiques.`,
                    error: 409
                });
            }

            if(user_flami._id === shared_flami._id) {
                return res.status(409).json({
                    message: `Ce sont les mêmes Flami..?`,
                    error: 409
                });
            }

            if(userdata.shared_flami?.shared_date && userdata.shared_flami.shared_date === new Date().toDateString()) {
                return res.status(409).json({
                    message: `Votre Flami a déjà été échangé aujourd'hui.`,
                    error: 409
                }); 
            }

            if(sharer_user.shared_flami?.shared_date && sharer_user.shared_flami.shared_date === new Date().toDateString()) {
                return res.status(409).json({
                    message: `Le Flami de ${sharer_user.name} a déjà été échangé aujourd'hui.`,
                    error: 409
                });
            }

            await userModel.updateOne({ _id: userdata._id }, {
                shared_flami: {
                    id: shared_flami._id,
                    shared_date: new Date().toDateString()
                }
            });

            await userModel.updateOne({ _id: sharer_user._id }, {
                shared_flami: {
                    id: user_flami._id,
                    shared_date: new Date().toDateString()
                }
            });

            await flamiModel.updateOne({ _id: user_flami._id }, {
                current_sharer_id: sharer_user._id,
                location: {
                    lat: location_shared.lat,
                    long: location_shared.long
                }
            });

            await flamiModel.updateOne({ _id: shared_flami._id }, {
                current_sharer_id: userdata._id,
                location: {
                    lat: location.lat,
                    long: location.long
                }
            });

            return res.status(202).json({
                data: {
                    owner: sharer_user.name,
                    location: shared_flami.location,
                    _id: shared_flami._id
                }
            });
        } else {
            return res.status(404).json({
                message: `Ce Flami n'existe pas.`,
                error: 404
            });    
        }
    },
    competition: (req, res) => {

    },
    training: (req, res) => {

    }
};

export default flamiController;