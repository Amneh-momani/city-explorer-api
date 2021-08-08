const MOIVE_KEY = process.env.MOIVE_KEY;
const MOIVE_URL = process.env.MOIVE_URL;
const axios = require("axios");
const Moive = require("../models/Moive");
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
  res.json(dataMoive);
};

module.exports = MoiveContro;
