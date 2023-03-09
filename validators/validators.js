const { body } = require("express-validator");

const validators = {
  registration: [
    body("email").isEmail(),
    body("password").isLength({ min: 5, max: 32 }),
  ],
  addCard: [
    body("title").isLength({min: 1, max: 25}),
  ]
};

module.exports = validators
