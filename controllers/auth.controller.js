const BaseError = require("../errors/base.error");
const authService = require("../service/auth.service");
const { validationResult } = require("express-validator");

class AuthConroller {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          BaseError.BadRequest("Error with validation", errors.array()),
        );
      }

      const { email, password } = req.body;
      const data = await authService.register(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  async activation(req, res, next) {
    try {
      const userId = req.params.id;
      await authService.activation(userId);
      return res.json({ message: "User activated" });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json(data);
    } catch (error) {
      next(error);

      res.status(500).json(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json({ token });
    } catch (error) {
      next(error);

      res.status(500).json(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);
      res.cookie("refreshtoken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthConroller();
