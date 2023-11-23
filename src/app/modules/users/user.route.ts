import express from "express";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { UserController } from "./user.controller";
import { UserZodValidation } from "./user.zodValidation";

const router = express.Router();

router.get(
  "/my-profile",
  //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.EMPLOYEE),
  UserController.getMyProfile
);

router.patch(
  "/my-profile",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.updateMyProfile
);

router.get("/:id", UserController.getSingleUser);

router.patch(
  "/:id",
  zodValidateRequest(UserZodValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);

router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

router.get(
  "/",
  //  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getAllUser
);

export const UserRoutes = router;
