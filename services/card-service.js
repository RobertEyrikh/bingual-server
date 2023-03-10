const CardModel = require("../models/card-model");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");

class CardService {
  async addCard(accessToken, title, words) {
    if (!accessToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }
    const card = await CardModel.create({
      user: userData.id,
      title,
      words,
    })
    return card
  }
  async getCardsByUser(accessToken) {
    if (!accessToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }
    const userCards = await CardModel.find({user: userData.id})
    return userCards
  }
  async getCardById(accessToken, cardId) {
    if (!accessToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }
    const userCard = await CardModel.findOne({_id: cardId})
    return userCard
  }
  async deleteWordInCard() {

  }
  async changeWordInCard() {

  }
  async addWordInCard() {

  }
  async deleteCard(accessToken, cardId) {
    if (!accessToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }
    console.log(userData)
    const deletedCard = await CardModel.deleteOne({_id: cardId})
    return deletedCard
  }
}
module.exports = new CardService();
