import httpStatus from "http-status";
import config from "../../../config";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import User from "../users/user.model";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  //  access to our instance methods
  const isUserExists = await User.isUserExistLogin(phoneNumber);

  // check user exits
  if (!isUserExists) {
    throw new Error("User does not exits.");
  }

  // match password
  if (
    isUserExists?.password &&
    !(await User.isPasswordMatched(password, isUserExists?.password))
  ) {
    throw new Error("password do not matched!");
  }
  const { _id, role } = isUserExists;
  console.log("role: ", role);
  // create jwt access token
  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // create jwt refresh token
  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new Error("invalid Refresh Token");
  }
  const { _id } = verifiedToken;

  // checking deleted user refresh token
  const isUserExist = await User.isUserExist(_id);
  if (!isUserExist) {
    throw new Error("User does not exist");
  }
  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist?._id,
      role: isUserExist?.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
