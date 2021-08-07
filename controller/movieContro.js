const MOIVE_KEY = process.env.MOIVE_KEY;
const MOIVE_URL = process.env.MOIVE_URL;
const axios = require("axios");
const Moive = require("../models/Moive");

const Cache = require('../helpers/cache');
let cacheObject = new Cache();

MoiveContro = (req, res) => {
  const { city_name } = req.query;
  const para = {
    parameter: {
      api_key: MOIVE_KEY,
      query: city_name,
    },
  };
  const response = axios.get(MOIVE_URL, para);
  const dataMoive = response.data.data.map((items) => new Moive(items));
  cacheObject.movies.push({
    
    api_key: MOIVE_KEY,
    query: city_name,
    data: data,
  });

  return data;
};
const getMoive = async (req, res) => {
  const { city_name} = req.query;

  if (Date.now() - cacheObject.timeStamp > 86400000) {
    console.log("Reset Cache");
    cacheObject = new Cache();
  }
  if (cacheObject.movies.length) {
    const filteredData = cacheObject.movies.find((location) => {
      return location.city_name ===city_name ;
    });

    if (filteredData) {
      console.log("getting the data from the cache");
      res.json(filteredData.data);
    } else {
      res.json(await getMoiveBitData(city_name));
    }
  } else {
    res.json(await getMoiveBitData(city_name));
  }
};

module.exports = MoiveContro;
