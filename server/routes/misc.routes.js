import Router from "express";

const router = Router();

router.get("/", async (req, res) => {
    return res.json({ context: "sandbox" });
});

export default router;