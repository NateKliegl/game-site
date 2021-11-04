const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();
const { addScore, byUserId } = require("../models/scores.models");

router.post("/add", auth, (req, res) => {
  const score = {
    user_id: req.user.id,
    game: req.body.game,
  };
  if (!score.game) {
    return res.send({
      success: false,
      error: "Invalid data provided",
      data: null,
    });
  }
  addScore(res, score);
});

router.get("/user", auth, (req, res) => {
  byUserId(res, req.user.id);
});

module.exports = router;
