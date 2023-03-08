module.exports = class CardDto {
  id;
  title;
  words;

  constructor(model) {
    this.id = model._id;
    this.title = model.title;
    this.words = model.words;
  }
}