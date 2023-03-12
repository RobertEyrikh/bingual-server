const CardModel = require("../models/card-model");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");

class CardService {
  async addCard(userData, title, words) {
    const card = await CardModel.create({
      user: userData.id,
      title,
      words,
    })
    return card
  }
  async getCardsByUser(userData) {
    const userCards = await CardModel.find({user: userData.id})
    return userCards
  }
  async getCardById(cardId) {
    const userCard = await CardModel.findOne({_id: cardId})
    return userCard
  }
  async deleteWordInCard(userData, cardId, wordId) {

  }
  async changeWordInCard() {

  }
  async addWordToCard() {

  }
  async changeCardTitle(cardId, title) {
    console.log(title)
    const userCard = await CardModel.findOneAndUpdate({_id: cardId}, {title})
    return userCard.title
  }
  async deleteCard( cardId) {
    const deletedCard = await CardModel.deleteOne({_id: cardId})
    return deletedCard
  }
}
module.exports = new CardService();
