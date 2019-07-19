import BaseController from "./base";
import AuthHandler from "../handlers/auth";
import TokenHandler from "../handlers/token";

const tokenHanhler = new TokenHandler();
let authHandler = new AuthHandler();
const config = require("../middlewares/config");

import moment from "moment";
import sha256 from "sha256";
const jwt = require("jsonwebtoken");
const tokenList = {};
//Import validate input scheme
import {
  UPDATE_AVATAR_VALIDATE_SCHEMA,
  CHANGE_PASSWORD_SCHEMA,
  VERIFY_EMAIL_SCHEMA,
  EMAIL_VALIDATE_SCHEMA,
  RESET_PASSWORD_SCHEMA,
  REGISTER_VALIDATION_SCHEMA,
  LOGIN_VALIDATION_SCHEMA
} from "../validationSchemes/auth";
import ValidationError from "../errors/validation";
import UserModel from "../models/User";

class AuthController extends BaseController {
  constructor() {
    super();
  }

  async register(req, res) {
    const { email, firstName, lastName, username, password } = req.body;
    //Validate input
    let errors = await this.getErrorsParameters(
      req,
      REGISTER_VALIDATION_SCHEMA
    );
    if (errors.length > 0)
      return this.response(res).onError("INVALID_ARGUMENT");
    try {
      //Handling
      // let username = changeToSlug(data.username);
      let isExistEmail = await UserModel.findOne({ email });
      if (isExistEmail) {
        throw new ValidationError("EMAIL_ALREADY_IN_USE_BY_ANOTHER_ACCOUNT");
      }
      let isExistUserName = await UserModel.findOne({ username });
      if (isExistUserName) {
        throw new ValidationError(
          "USER_NAME_ALREADY_IN_USE_BY_ANOTHER_ACCOUNT"
        );
      }
      const fullName = firstName + " " + lastName;

      let newUser = await authHandler.createNewUser(
        email,
        password,
        username,
        firstName,
        lastName,
        fullName
      );

      const token = jwt.sign(
        {
          userId: newUser._id
        },
        config.secret,
        {
          expiresIn: config.tokenLife
        }
      );

      const refreshToken = jwt.sign(
        { userId: newUser._id },
        config.refreshTokenSecret,
        {
          expiresIn: config.refreshTokenLife
        }
      );
      await tokenHanhler.createNewToken(token, refreshToken, newUser._id);
      if (newUser) {
        newUser = newUser.toObject();
        delete newUser.password;
      }
      const profile = newUser;
      if (!token) throw new ValidationError("USER_NOTFOUND");
      this.response(res).onSuccess({ token, profile });
    } catch (errors) {
      this.response(res).onError(null, errors);
    }
  }
  async login(req, res) {
    const { emailOrUserName, password, remember } = req.body;
    let errors = await this.getErrorsParameters(req, LOGIN_VALIDATION_SCHEMA);
    if (errors.length > 0)
      return this.response(res).onError("INVALID_ARGUMENT");
    try {
      // if (!user.isEmailVerified)
      //   throw new ValidationError("EMAIL_NOT_VERIFIED");
      let user = await authHandler.loginAccount(emailOrUserName, password);
      if (!user) {
        throw new ValidationError("PASSWORD_INCORRECT");
      }
      if (user) {
        user = user.toObject();
        delete user.password;
      }

      const profile = user;
      const token = jwt.sign(
        {
          userId: user._id
        },
        config.secret,
        {
          expiresIn: remember ? 2592000 : config.tokenLife // expires in 24 hours
        }
      );
      const dataToken = await tokenHanhler.getTokenByUser(user._id);
      if (dataToken) {
        await tokenHanhler.updateToken(token, dataToken.refreshToken);
        if (!token) throw new ValidationError("USER_NOTFOUND");
        console.log("ok");
        this.response(res).onSuccess({ profile, token });
      } else {
        const refreshToken = jwt.sign(
          { userId: user._id },
          config.refreshTokenSecret,
          {
            expiresIn: remember ? 3592000 : config.refreshTokenLife
          }
        );
        await tokenHanhler.createNewToken(token, refreshToken, user._id);
        if (!token) throw new ValidationError("USER_NOTFOUND");
        this.response(res).onSuccess({ profile, token });
      }
    } catch (errors) {
      console.log("errors", errors);
      this.response(res).onError(null, errors);
    }
  }

  async updateInformationByUserId(req, res, next) {
    let data = req.body;
    try {
      let updated;
      let isAllFieldsUpdate = await authHandler.checkFieldsCanUpdate(data);
      if (isAllFieldsUpdate)
        updated = await authHandler.updateInformationByUserId(req.userId, data);
      this.response(res).onSuccess(updated);
    } catch (errors) {
      this.response(res).onError(null, errors);
    }
  }
  async findUserByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user;
  }
  async findUserBySoponr(sponsorCode) {
    const listuser = await UserModel.find({ sponsorCode }).select({
      _id: 1,
      username: 1
    });
    return listuser;
  }

  async updateAvatarByUserId(req, res, next) {
    let data = req.body;
    try {
      //validate input
      let errors = await this.getErrorsParameters(
        req,
        UPDATE_AVATAR_VALIDATE_SCHEMA
      );
      if (errors.length > 0) throw new ValidationError(errors);

      let updated = await authHandler.updateAvatarByUserId(
        req.userId,
        data.avatarUrl
      );
      this.response(res).onSuccess(updated);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }

  async updatePasswordByUserId(req, res, next) {
    let data = req.body;
    try {
      const errors = await this.getErrorsParameters(
        req,
        CHANGE_PASSWORD_SCHEMA
      );
      if (errors.length > 0) throw new ValidationError(errors);
      let update = await authHandler.updatePasswordByUserId(
        req.userId,
        data.oldPassword,
        data.newPassword
      );

      return this.response(res).onSuccess("SUCCESS");
    } catch (errors) {
      return this.response(res).onError(errors);
    }
  }

  async verifyEmail(req, res, next) {
    let { email, codeVerify } = req.query;
    try {
      const errors = await this.getErrorsParameters(
        req,
        null,
        VERIFY_EMAIL_SCHEMA
      );
      if (errors.length > 0) throw new ValidationError(errors);

      //Check valid email
      let user = await authHandler.getInformationByEmail(email);
      if (!user) throw new ValidationError("NOT_FOUND_EMAIL");

      //Check code verify
      if (user.codeVerify != codeVerify)
        throw new ValidationError("CODE_VERIFY_NOT_MATCH");

      //Check email is varified
      if (user.isEmailVerified === true) {
        throw new ValidationError("EMAIL_IS_VERIFIED");
      }

      //Update verify
      await authHandler.updateInformationByUserId(user._id, {
        isEmailVerified: true
      });

      //+ 20CSE for user
      let userid = user._id;
      await authHandler.coupon20CSE(userid);

      // + 20CSE for sponsor
      let sponsorCode = await UserModel.findById(userid).select("sponsorCode");
      let sponsor = await UserModel.findById(sponsorCode.sponsorCode);
      if (sponsor && sponsor.isEmailVerified === true)
        await authHandler.coupon20CSE(sponsor._id);

      return this.response(res).onSuccess("SUCCESS");
    } catch (error) {
      return this.response(res).onError(error);
    }
  }

  async reSendVerifyEmail(req, res, next) {
    let { email } = req.body;
    try {
      const errors = await this.getErrorsParameters(req, EMAIL_VALIDATE_SCHEMA);
      if (errors.length > 0) throw new ValidationError(errors);

      let code = sha256(moment().toISOString());
      //Check valid email
      let user = await authHandler.getInformationByEmail(email);
      if (!user) throw new ValidationError("NOT_FOUND_EMAIL");

      //Update code verify
      await authHandler.updateInformationByUserId(user._id, {
        codeVerify: code
      });
      // send email verify
      const payload = {
        to: email,
        from: '"CSE Token" <support@csetoken.io>',
        subject: "CSE Email Verification - no reply",
        html: contentEmail(
          `https://dashboard.` +
            emailConfig.domain +
            `/verifyemail?email=` +
            email +
            `&codeVerify=` +
            code
        )
        // "<a href='http://"+emailConfig.domain+"/?email=" +
        // email +
        // "&codeVerify=" +
        // code +
        // "'>Click me</a> to verify your email."
      };
      await emailHandler.sendEmail(payload);
      return this.response(res).onSuccess("SUCCESS");
    } catch (error) {
      return this.response(res).onError(error);
    }
  }
  /**
   * Function : Get all information of user
   * Params: token
   * Result: information of user
   */
  async me(req, res, next) {
    const { _id, refreshToken } = req.body;
    try {
      if (
        refreshToken in refreshTokens &&
        refreshTokens[refreshToken] === _id
      ) {
        const token = jwt.sign({ userId: _id }, config.refreshTokenSecret, {
          expiresIn: 7200
        });
        this.response(res).onSuccess({ token });
      } else throw new ValidationError("INVAIL_TOKEN");
    } catch (errors) {
      console.log(errors);
      return this.response(res).onError(null, errors);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email } = req.body;
      const errors = await this.getErrorsParameters(
        req,
        RESET_PASSWORD_SCHEMA,
        null
      );
      if (errors.length > 0) throw new ValidationError(errors);
      const user = await authHandler.getInformationByEmail(email);
      if (!user) throw new ValidationError("EMAIL_IS_NOT_REGISTER");
      const newpass = await authHandler.randomPassword(6);
      const payload = {
        to: email,
        from: '"CSE Token" <support@csetoken.io>',
        subject: "CSE Email Reset Password - no reply",
        html: contentEmail(
          `New Password is <h3>${newpass}</h3>.Please change password `
        )
      };
      await authHandler.updatePassworByEmail(email, newpass);
      await emailHandler.sendEmail(payload);
      /*   console.log(updateCodeVerify); */
      return this.response(res).onSuccess("SUCCESS");
    } catch (error) {
      console.log(error);
      return this.response(res).onError(error);
    }
  }
}

export default AuthController;
