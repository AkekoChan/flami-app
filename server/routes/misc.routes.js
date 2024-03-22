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
    } else {
        return res.status(409).json({ error: 409, message: "Tu possède déjà ce badge." });
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
    return res.status(201).json({ data: { message: "done" }});
});

export default router;