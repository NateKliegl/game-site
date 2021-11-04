const query = require("../config/mysql.conf");

async function addScore(res, game) {
  try {
    await query("INSERT INTO scores SET ?", game);
    return res.send({
      success: true,
      error: null,
      data: game,
    });
  } catch (e) {
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong",
    });
  }
}

async function byUserId(res, user_id) {
  try {
    const scores = await query(
      "SELECT * FROM scores WHERE scores.user_id = ?",
      [user_id]
    );
    return res.send({
      success: true,
      error: null,
      data: scores,
    });
  } catch (e) {
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong",
    });
  }
}

module.exports = { addScore, byUserId };
