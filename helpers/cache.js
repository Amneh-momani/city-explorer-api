class Cache {
  constructor(data) {
    this.weather = [];
    this.movies = [];
    this.timeStamp = Date.now();
  }
}

module.exports = Cache;