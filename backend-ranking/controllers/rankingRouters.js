const rankingRouter = require("express").Router();
const User = require("../schemas/user");
const Player = require("../schemas/player");
const Match = require("../schemas/match");
const bcrypt = require("bcrypt");
const sendUpdate = require("../discordBot.js");

rankingRouter.get("/", (req, res) => {
  Player.find({}).then((result) => {
    res.json(result);
  });
});

rankingRouter.get("/players", (req, res) => {
  Player.find({}).then((result) => {
    res.send(result);
  });
});

rankingRouter.get("/players/:id", (req, res) => {
  const id = req.params.id;
  Player.findById(id).then((player) => {
    res.send(player);
  });
});

rankingRouter.post("/players", (req, res) => {
  const body = req.body;
  const newPlayer = new Player({
    name: body.name,
    position: body.position,
    playedMatches: body.playedMatches,
    wonMatches: body.wonMatches,
    lostMatches: body.lostMatches,
  });
  newPlayer.save().then((result) => {
    res.status(200).end();
  });
});

rankingRouter.get("/matches", (req, res) => {
  Match.find({}).then((result) => {
    res.send(result).status(200).end();
  });
});

rankingRouter.get("/matches/:id", (req, res) => {
  Match.findById(req.params.id).then((result) => {
    res.send(result).status(200).end();
  });
});

rankingRouter.post("/matches", (req, res) => {
  const body = req.body;
  const newMatch = new Match({
    date: body.date,
    place: body.place,
    coupleOne: body.coupleOne,
    coupleTwo: body.coupleTwo,
    firstSet: body.firstSet,
    secondSet: body.secondSet,
    thirdSet: body.thirdSet,
  });
  newMatch.save().then((result) => {
    sendUpdate(newMatch);
    res.status(200).end();
  });
});

rankingRouter.post("/register", async (req, res) => {
  const { username, name, password } = req.body;
  const saltRounds = 10;
  const passwordHashed = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    username: username,
    passwordHash: passwordHashed,
    name: name,
  });
  newUser.save().then((result) => {
    res.json(result);
    res.send(200).end();
  });
});

rankingRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(404).end();
  }
  const correctPassword = await bcrypt.compare(password, user.passwordHash);
  if (correctPassword == true) {
    res.json(user);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

module.exports = rankingRouter;
