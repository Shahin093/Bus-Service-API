import express from "express";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { AuthZodValidation } from "./auth.zodValidation";
import { AuthController } from "./auth.controller";
import { UserZodValidation } from "../users/user.zodValidation";
import { UserController } from "../users/user.controller";
const router = express.Router();

router.post(
  "/login",
  zodValidateRequest(AuthZodValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  "/signup",
  zodValidateRequest(UserZodValidation.createUserZodSchema),
  UserController.createUser
);

router.post(
  "/refresh-token",
  zodValidateRequest(AuthZodValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
