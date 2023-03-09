const cardService = require("../services/card-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class CardController {
  async addCard(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }

      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader.split(" ")[1];

      const { title, words } = req.body;
      const cardData = await cardService.addCard(accessToken, title, words);
      return res.json(cardData);
    } catch (e) {
      next(e);
    }
  }
  async getCardsByUser(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader.split(" ")[1];

      const cardsData = await cardService.getCardsByUser(accessToken)
      return res.json(cardsData);
    } catch (e) {
      next(e);
    }
  }
  async getCardById(req, res, next) {
    try {
      console.log(req.body)
      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader.split(" ")[1];
      const { cardId } = req.body

      const cardData = await cardService.getCardById(accessToken, cardId)
      return res.json(cardData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CardController();
