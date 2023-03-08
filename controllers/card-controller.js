const cardService = require("../services/card-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class CardController {
  async addCard(req, res, next) {
    try {
      const { title, user, words } = req.body;
      const cardData = await cardService.addCard(title, user, words)
      console.log(cardData)
      return res.json(cardData);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new CardController()
