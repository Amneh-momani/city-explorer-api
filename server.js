"use strict";

const express = require("express");
const server = express();
require("dotenv").config();
const cors = require("cors");
server.use(cors());

const PORT = process.env.PORT;
const WeatherContro = require("./controller/weatherContro");

const MoiveContro = require("./controller/movieContro");

server.get("/", (req, res) => {
  res.send("Hello from main page in backend");
});

server.get("/weather", WeatherContro);
server.get("/movie", MoiveContro);
server.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
