"use strict";

const { request, response } = require("express");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const server = express();
const axios = require("axios");

server.use(cors());

const data = require("./data/weather.json");
const Weather = require("./models/Weather");
const Moive = require("./models/Moive");
const Forecast = require("./models/Forecast");
const PORT = process.env.PORT;
const WEATHER_URL = process.env.WEATHER_URL;
const WEATHER_KEY = process.env.WEATHER_KEY;

const MOIVE_KEY = process.env.MOIVE_KEY;
const MOIVE_URL = process.env.MOIVE_URL;

server.get("/", (req, res) => {
  res.send("Hello from main page in backend");
});

server.get("/weather", (req, res) => {
  try {
    let { searchQuery, lat, lon } = req.query;
    let cityData = data.find(
      (element) =>
        element.city_name.toLowerCase() === searchQuery.toLowerCase() ||
        (`${element.lat}` === lat && `${element.lon}` === lon)
    );
    let forecastArr = cityData.data.map((items) => new Forecast(items));
    console.log(forecastArr);
    res.send(forecastArr);
  } catch (e) {
    res.status(404).send("No Data for this City");
  }
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
  const response = await axios.get(`${(WEATHER_URL, para)}`);
  const data = response.data.data.map((items) => new Weather(items));
  console.log(data);
  res.json(data);
});

server.get("/moive", async (req, res) => {
  const { MOIVE_KEY, searchQ } = req.query;
  const para = {
    parameter: {
      api_key: MOIVE_KEY,
      query: city_name,
    },
  };
  const response = await axios.get(`${(MOIVE_URL, para)}`);
  const data = response.data.data.map((items) => new Moive(items));
  console.log(response);
  res.json(data);
});

server.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
