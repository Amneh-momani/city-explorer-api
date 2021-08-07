const WEATHER_URL = process.env.WEATHER_URL;
const WEATHER_KEY = process.env.WEATHER_KEY;

const axios = require("axios");
const Weather = require("../models/Weather");

const Cache = require("../helpers/cache");
let cacheObject = new Cache();
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
  cacheObject.weather.push({
    lat: lat,
    lon: lon,
    data: data,
  });

  return data;
};
const getWeather = async (req, res) => {
  const { lat, lon } = req.query;

  if (Date.now() - cacheObject.timeStamp > 86400000) {
    console.log("Reset Cache");
    cacheObject = new Cache();
  }
  if (cacheObject.weather.length) {
    const filteredData = cacheObject.weather.find((location) => {
      return location.lat === lat && location.lon === lon;
    });

    if (filteredData) {
      console.log("getting the data from the cache");
      res.json(filteredData.data);
    } else {
      res.json(await getWeatherBitData(lat, lon));
    }
  } else {
    res.json(await getWeatherBitData(lat, lon));
  }
};

module.exports = WeatherContro;
