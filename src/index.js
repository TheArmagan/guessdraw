const io = new (require('socket.io').Server)();
const { resolveSoa } = require("dns");
const express = require("express");
const stuffs = require("stuffs");
const app = express();
const httpServer = require("http").createServer(app);
io.listen(httpServer);
const mongoose = require('mongoose');
const wordLists = require("./data/wordLists");
const Game = require("./dataSchemas/Game");
mongoose.connect("mongodb://127.0.0.1/guessdraw", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  httpServer.listen(process.env.PORT || 3000);
  console.log("ready");
});
const { EventEmitter } = require("events");
const events = new EventEmitter();

app.use("/", express.static(__dirname + "/www"));
app.use(express.json());
app.use((req, res, next) => {
  res.ok = (data) => {
    res.send({ ok: true, data });
  };
  res.err = (error) => {
    res.send({ ok: false, error });
  };
  next();
});


app.post("/api/game/create", async (req, res) => {
  let ownerPlayer = req.body.ownerPlayer;
  let wordList = req.body.wordList || wordLists.list1;
  if (!ownerPlayer) return res.err("Owner player name required.");
  if (!Array.isArray(wordList)) return res.err("Invalid word list.");

  let game = await Game.create({
    wordList,
    ownerPlayer,
    wordList,
    playerList: [],
    currentWord: stuffs.randomPick(wordList)
  });

  await game.save();
  events.emit("game:create", game);
  res.ok(game);
});

app.get("/api/game/get/:_id", async (req, res) => {
  let _id = req.params._id;

  let game = await Game.findById(_id);
  if (!game) return res.err("Invalid game.");

  res.ok(game);
});