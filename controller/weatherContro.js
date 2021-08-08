const WEATHER_URL = process.env.WEATHER_URL;
const WEATHER_KEY = process.env.WEATHER_KEY;

const axios = require("axios");
const Weather = require("../models/Weather");
WeatherContro = (req, res) => {
  const { lat, lon } = req.query;
  const para = {
    parameter: {
      key: WEATHER_KEY,
      lat: lat,
      lon: lon,
    },
  };
  const response = axios.get(WEATHER_URL, para);
  const dataWeather = response.data.data.map((items) => new Weather(items));
  res.json(dataWeather);
};

module.exports = WeatherContro;
