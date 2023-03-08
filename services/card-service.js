const CardModel = require("../models/card-model");
const CardDto = require("../dtos/card-dto");

class CardService {
  async addCard(userId, title, words) {
    const card = {
      user: userId,
      title,
      words,
    }
    return card
    // const card = CardModel.create({
    //   user: userId,
    //   title,
    //   words,
    // })
  }
  async changeCard() {

  }
  async getCards() {

  }
}
module.exports = new CardService();
