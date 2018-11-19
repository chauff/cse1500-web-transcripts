const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/splash", (req, res) => {
    res.sendFile("splash.html", { root: "./public" });
});

/* Pressing the 'PLAY' button, returns this page */
router.get("/play", (req, res) => {
    res.sendFile("game.html", { root: "./public" });
});

module.exports = router;
