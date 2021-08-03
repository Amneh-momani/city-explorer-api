const { request, response } = require("express");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
app.use(cors());
const data = require("./data/weather.json");

app.get("/weather", (request, response) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "weather/json",
    },
    body: JSON.stringify(data),
    searchQuery: false,
    lon: data.lon,
    lat: data.lat,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", options)
    .then((data) => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });

  response.send(data);
});
const searching = (lat, lon, searchQuery) => {
  return (lat.value,lon.value,!searchQuery);
};
data.find(searching);

<div>
<form>
  <row>
    <lable>City Name:</lable>
    <input name="CityName" type="text" placeholder="Amman" />
    <button type="submit" value="Explore!" class="btn btn-primary">
      Explore!
    </button>
  </row>
</form>
<h1>Location information</h1>
{this.state.lon && <p>{this.state.lat}</p>}
<div>
</div>
</div>

class Forecast extends express {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      description: "",
    };
  }
}
