"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = __importDefault(require("../users/user.model"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    //  access to our instance methods
    const isUserExists = yield user_model_1.default.isUserExistLogin(phoneNumber);
    // check user exits
    if (!isUserExists) {
        throw new Error("User does not exits.");
    }
    // match password
    if ((isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password) &&
        !(yield user_model_1.default.isPasswordMatched(password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password))) {
        throw new Error("password do not matched!");
    }
    const { _id, role } = isUserExists;
    console.log("role: ", role);
    // create jwt access token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // create jwt refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_secret_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // verify token
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new Error("invalid Refresh Token");
    }
    const { _id } = verifiedToken;
    // checking deleted user refresh token
    const isUserExist = yield user_model_1.default.isUserExist(_id);
    if (!isUserExist) {
        throw new Error("User does not exist");
    }
    // generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    loginUser,
    refreshToken,
};
