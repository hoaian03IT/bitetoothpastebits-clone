import express from "express";
const router = express.Router();

router.get("/home", (req, res) => {
    res.render("home", { layout: false });
});

export default router;
