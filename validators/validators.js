const { body } = require("express-validator");

const validators = {
  registration: [
    body("email").isEmail(),
    body("password").isLength({ min: 5, max: 32 }),
  ],
  addCard: [
    body("title").isLength({min: 1, max: 25}),
  ],
  changeCardTitle: [
    body("title").isLength({min: 1, max: 25}),
  ],
  changeWordInCard: [
    body("word").isLength({min: 1, max: 30}),
    body("translation").isLength({min: 1, max: 30})
  ],
  createNewWord: [
    body("word").isLength({min: 1, max: 30}),
    body("translation").isLength({min: 1, max: 30})
  ]
};

module.exports = validators
