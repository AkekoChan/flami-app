import Router from "express";
import auth from "../helpers/authMiddleware.js";

const router = Router();

router.get("/", async (req, res) => {
    return res.json({ context: "sandbox" });
});

router.get("/give/badge/:id", auth.require, async (req, res) => {
    let userdata = res.locals.user;
    let id = req.params.id;
    if(userdata.badges.findIndex((item) => item.id === id) === -1) {
        userdata.badges.push({
            id: id
        });
    } else {
        return res.status(401).json({ error: "T'as déjà le badge bg" });
    }

    await userdata.save();
    return res.status(201).json({ context: "sandbox", message: "done" });
});

router.get("/give/cosmetic/:id", auth.require, async (req, res) => {
    let userdata = res.locals.user;
    let id = req.params.id;
    if(userdata.owned_cosmetics.findIndex((item) => item.id === id) === -1) {
        userdata.badges.push({
            id: id
        });
    } else {
        return res.status(401).json({ error: "T'as déjà le cosmetic bg" });
    }

    await userdata.save();
    return res.status(201).json({ context: "sandbox", message: "done" });
});

export default router;