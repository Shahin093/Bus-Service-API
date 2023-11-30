"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zodValidateRequest_1 = __importDefault(require("../../middleware/zodValidateRequest"));
const manageBus_zodValidation_1 = require("./manageBus.zodValidation");
const manageBus_controller_1 = require("./manageBus.controller");
const router = express_1.default.Router();
router.get("/", manageBus_controller_1.BusController.getAllBuses);
router.get("/:id", manageBus_controller_1.BusController.getSingleBus);
router.patch("/:id", (0, zodValidateRequest_1.default)(manageBus_zodValidation_1.BusZodValidation.updateBusZodSchema), manageBus_controller_1.BusController.updateBus);
router.delete("/:id", manageBus_controller_1.BusController.deleteBus);
router.post("/create-bus", (0, zodValidateRequest_1.default)(manageBus_zodValidation_1.BusZodValidation.createBusZodSchema), manageBus_controller_1.BusController.createBus);
exports.BusRoutes = router;
