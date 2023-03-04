const { body } = require("express-validator");

const validators = {
  registration: [
    body("email").isEmail(),
    body("password").isLength({ min: 5, max: 32 }),
  ],
};

module.exports = validators
