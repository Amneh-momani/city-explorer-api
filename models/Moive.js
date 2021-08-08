class Moive {
  constructor(value) {
    this.title = value.title;
    this.overview = value.overview;
    this.average_votes = value.average_votes;
    this.total_votes = value.total_votes;
    this.image_url = value.image_url;
    this.popularity = value.popularity;
    this.released_on = value.released_on;
  }
}

module.exports = Moive;
