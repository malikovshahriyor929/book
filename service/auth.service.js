const UserDto = require("../dtos/user.dto");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const mailService = require("./mail.service");
const BaseError = require("../errors/base.error");

class AuthService {
  async register(email, password) {
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      throw BaseError.BadRequest(`${email}: already exist, please try another email`);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ email, password: hashPassword });

    const userDto = new UserDto(user);

    await mailService.sendMails(
      email,
      `${process.env.API_URL}/api/auth/activation/${userDto.id}`,
    );

    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
  async activation(userId) {
    const user = await userModel.findById(userId);
    if (!user) throw BaseError.BadRequest("User isn't defined");
    user.isActiveted = true;
    await user.save();
  }

  async login(email, password) {
    const existUser = await userModel.findOne({ email });
    if (!existUser) throw BaseError.BadRequest("User not found");
    const access = await bcrypt.compare(password, existUser.password);
    if (!access) throw BaseError.BadRequest("access denied!");
    const userDto = new UserDto(existUser);

    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }
  async refresh(refreshToken) {
    if (!refreshToken) throw BaseError.UnauthorizedError("Bad authorization");
    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenDB = await tokenService.findToken(refreshToken);
    if (!tokenDB || !userPayload) throw BaseError.UnauthorizedError("Bad authorization");

    const user = await userModel.findById(userPayload.id);
    if (!user) throw BaseError.BadRequest("User not found");
    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, tokens };
  }
}

module.exports = new AuthService();
