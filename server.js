"use strict";

const { request, response } = require("express");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const server = express();
const PORT = process.env.PORT;
server.use(cors());
const data = require("./data/weather.json");
const axios = require("axios");

class Forecast {
  constructor(value) {
    this.valid_date = value.valid_date;
    this.description = ` ${value.weather.description}`;
  }
}
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

server.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
