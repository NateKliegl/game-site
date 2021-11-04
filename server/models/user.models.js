const query = require("../config/mysql.conf");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

async function signup(res, username, password) {
  try {
    const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (user) {
      return res.send({
        success: false,
        data: null,
        error: "Username Already Taken",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    await query(
      "INSERT INTO users (username, password, uuid) VALUES (?, ?, ?)",
      [username, hash, uuid]
    );
    return res.send({
      success: true,
      error: null,
      data: "Signed Up!",
    });
  } catch (e) {
    console.log(e);
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong, please try again",
    });
  }
}

async function login(res, username, password) {
  try {
    const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (!user) {
      return res.send({
        success: false,
        data: null,
        error: "Wrong Username",
      });
    }
    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.send({
        success: false,
        data: null,
        error: "Wrong Password",
      });
    }
    const payload = { uuid: user.uuid };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7 days",
    });
    return res.cookie("jwt", token, { httpOnly: true, maxAge: 36000 }).send({
      success: true,
      data: { username: user.username },
      error: null,
    });
  } catch (e) {
    return res.send({
      success: false,
      error: "Something went wrong, please try again later!",
      data: null,
    });
  }
}

module.exports = { signup, login };
