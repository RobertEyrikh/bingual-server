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

      const { title, words } = req.body;
      const userData = req.user;
      const cardData = await cardService.addCard(userData, title, words);
      return res.json(cardData);
    } catch (e) {
      next(e);
    }
  }
  async getCardsByUser(req, res, next) {
    try {
      const userData = req.user
      const cardsData = await cardService.getCardsByUser(userData)
      return res.json(cardsData);
    } catch (e) {
      next(e);
    }
  }
  async getCardById(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Неизвестные данные", errors.array()));
      }
      const { cardId } = req.body

      const cardData = await cardService.getCardById(cardId)
      return res.json(cardData);
    } catch (e) {
      next(e);
    }
  }
  async deleteCard(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Неизвестные данные", errors.array()));
      }
      const { cardId } = req.body;

      const cardData = await cardService.deleteCard(cardId);
      return res.json(cardData);
    } catch (e) {
      next(e);
    }
  }
  async changeCardTitle(req, res, next) {
    console.log(req.body)
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Неизвестные данные", errors.array()));
      }
      const { cardId, title } = req.body;
      console.log(cardId)
      const cardData = await cardService.changeCardTitle(cardId, title);
      return res.json(cardData);
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new CardController();
