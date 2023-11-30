"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const manageBus_route_1 = require("../modules/manageBus/manageBus.route");
const busBooking_route_1 = require("../modules/busBooking/busBooking.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/bus",
        route: manageBus_route_1.BusRoutes,
    },
    {
        path: "/bus-booking",
        route: busBooking_route_1.BusBookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
