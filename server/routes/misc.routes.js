import Router from "express";
import auth from "../helpers/authMiddleware.js";
import flamitradeModel from "../models/flamitrade.model.js";
import flamiModel from "../models/flami.model.js";

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

router.get("/world/flamis", async (req, res) => {
    let allFlamis = await flamitradeModel.aggregate([
        {
            $addFields: {
                positionArray: {
                    $objectToArray: "$flamis_positions" // Convertir la map en tableau de paires clé-valeur
                }
            }
        },
        {
            $addFields: {
                validPositions: {
                    $filter: {
                        input: "$positionArray",
                        as: "item",
                        cond: {
                            $and: [
                                { $eq: ["$$item.k", { $toString: "$flami_id" }] }, // Filtrer par flami_id
                                { $ne: ["$$item.v.latitude", null] }, // Latitude ne doit pas être nulle
                                { $ne: ["$$item.v.longitude", null] }
                            ]
                        }
                    }
                }
            }
        },
        {
            $match: {
                "validPositions": { $ne: [] } // Garder uniquement les documents ayant des positions valides
            }
        },
        {
            $group: {
                _id: "$flami_id", // Grouper par flami_id
                doc: { $first: "$$ROOT" }, // Obtenir le document le plus récent par flami_id
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: "$doc._id",
                user_id: "$doc.user_id",
                flami_id: "$doc.flami_id",
                created_at: "$doc.created_at",
                position: { $arrayElemAt: ["$doc.validPositions.v", 0] },
                count: 1 // Sélectionner uniquement la valeur de la position
            }
        },
        {
            $sort: { created_at: -1 } // Trier par created_at décroissant
        }
    ]);

    return res.status(200).json({ data: allFlamis });
});

export default router;