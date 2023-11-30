"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zodValidateRequest_1 = __importDefault(require("../../middleware/zodValidateRequest"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../../enums/user");
const user_controller_1 = require("./user.controller");
const user_zodValidation_1 = require("./user.zodValidation");
const router = express_1.default.Router();
router.get("/my-profile", 
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.EMPLOYEE),
user_controller_1.UserController.getMyProfile);
router.patch("/my-profile", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), user_controller_1.UserController.updateMyProfile);
router.get("/:id", user_controller_1.UserController.getSingleUser);
router.patch("/:id", (0, zodValidateRequest_1.default)(user_zodValidation_1.UserZodValidation.updateUserZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.updateUser);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.deleteUser);
router.get("/", 
//  auth(ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.getAllUser);
exports.UserRoutes = router;
