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
                shared_flami: shared_flami ? {
                    owner: sharer_user.name,
                    cosmetics: shared_flami.cosmetics.map((id) => json[id] ?? json[0]),
                    location: shared_flami.location,
                    stamina: shared_flami.stamina,
                    stats: shared_flami.stats,
                    last_action: userdata.shared_flami.shared_date
                } : null
            }
        });
    },
    share: (req, res) => {

    },
    competition: (req, res) => {

    },
    training: (req, res) => {

    }
};

export default flamiController;