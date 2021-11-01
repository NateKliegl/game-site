require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 8080;
const userRoutes = require("./server/routes/user.routes");
const scoresRoutes = require("./server/routes/scores.routes");
const passport = require("./server/config/passport.conf");

app.use(express.json());
app.use(express.static(__dirname + "/build"));
app.use(cookieParser());
app.use(passport.initialize());
app.use("/users", userRoutes);
app.use("/scores", scoresRoutes);

app.get("*", (req, res) => {
  return res.sendFile("/build/index.html", { root: __dirname + "/" });
});

app.listen(PORT, () => console.log(`${PORT} is working`));
