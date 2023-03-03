const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`Пользователь с адресом: ${email} уже зарегистрирован`);
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email: email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(email, activationLink);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: UserDto,
    };
  }
}

module.exports = new UserService();
