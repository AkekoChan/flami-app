import Router from "express";
import auth from "../helpers/authMiddleware.js";

const router = Router();


router.get("/g/badge/:id", auth.require, async (req, res) => {
    let userdata = res.locals.user;
    let id = req.params.id;
    if(userdata.badges.findIndex((item) => item.id === id) === -1) {
        userdata.badges.push({
            id: id
        });

        let collector_badges = { 20: "bronze", 40: "silver", 60: "gold", 64: "diamond" };
        if(collector_badges[userdata.badges.length]) {
            userdata.badges.push({
                id: `collector_${collector_badges[userdata.badges.length]}`
            });
        }
    } else {
        return res.status(409).json({ error: 409, message: "Tu possèdes déjà ce badge." });
    }

    await userdata.save();
    return res.status(201).json({data: {
        message: "Tu as reçu le badge de cette étape."
    }});
});

router.get("/g/cosmetic/:id", auth.require, async (req, res) => {
    let userdata = res.locals.user;
    let id = req.params.id;
    if(userdata.owned_cosmetics.findIndex((item) => item.id === id) === -1) {
        userdata.badges.push({
            id: id
        });
    } else {
        return res.status(409).json({ error: 409, message: "Tu possède déjà ce cosmetique." });
    }

    await userdata.save();
    return res.status(201).json({ data: { message: "Tu as reçu le cosmetique !" }});
});

export default router;