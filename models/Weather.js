class Weather {
  constructor(value) {
    this.valid_date = value.valid_date;
    this.description = ` ${value.weather.description}`;
  }
}

module.exports = Weather;

  