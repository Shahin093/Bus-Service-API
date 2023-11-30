"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusBookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const busBooking_controller_1 = require("./busBooking.controller");
const router = express_1.default.Router();
router.get("/", busBooking_controller_1.BusBookingController.getAllBusesBooking);
router.get("/:id", busBooking_controller_1.BusBookingController.getSingleBusBooking);
router.patch("/:id", busBooking_controller_1.BusBookingController.updateBusBooking);
router.delete("/:id", busBooking_controller_1.BusBookingController.deleteBusBooking);
router.post("/create-busBooking", busBooking_controller_1.BusBookingController.createBusBooking);
exports.BusBookingRoutes = router;
