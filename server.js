"use strict";
const express = require("express");
const server = express();
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
server.use(cors());

const Weather = require("./models/Weather");
const Moive = require("./models/Moive");
const PORT = process.env.PORT;
const WEATHER_URL = process.env.WEATHER_URL;
const WEATHER_KEY = process.env.WEATHER_KEY;
const MOIVE_KEY = process.env.MOIVE_KEY;
const MOIVE_URL = process.env.MOIVE_URL;

server.get("/", (req, res) => {
  res.send("Hello from main page in backend");
});

server.get("/weather-bit", async (req, res) => {
  const { lat, lon } = req.query;
  const para = {
    parameter: {
      key: WEATHER_KEY,
      lat: lat,
      lon: lon,
    },
  };
  const response = await axios.get(WEATHER_URL,para);
  const dataWeather = response.data.data.map((items) => new Weather(items));
  res.json(dataWeather);
});

server.get("/movie", async (req, res) => {
  const { MOIVE_KEY, city_name } = req.query;
  const para = {
    parameter: {
      api_key: MOIVE_KEY,
      query: city_name,
    },
  };
  const response = await axios.get(MOIVE_URL,para);
  const dataMoive = response.data.data.map((items) => new Moive(items));
  res.json(dataMoive);
});

server.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
