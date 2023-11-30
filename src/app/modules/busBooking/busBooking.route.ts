import express from "express";
import { BusBookingController } from "./busBooking.controller";

const router = express.Router();

router.get("/", BusBookingController.getAllBusesBooking);
router.get("/:id", BusBookingController.getSingleBusBooking);

router.patch("/:id", BusBookingController.updateBusBooking);

router.delete("/:id", BusBookingController.deleteBusBooking);

router.post("/create-busBooking", BusBookingController.createBusBooking);

export const BusBookingRoutes = router;
