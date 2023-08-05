const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const rankingRouter = require("./controllers/rankingRouters");
const config = require("./utils/config");
const middlewares = require("./utils/middlewares");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const url = config.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose.connect(url);

app.use("/api/ranking", rankingRouter);

app.use(middlewares.unknownEndpoint);

module.exports = app;
