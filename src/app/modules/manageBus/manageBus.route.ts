import express from "express";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { BusZodValidation } from "./manageBus.zodValidation";
import { BusController } from "./manageBus.controller";

const router = express.Router();

router.post(
  "/create-bus",
  zodValidateRequest(BusZodValidation.createBusZodSchema),
  BusController.createBus
);

export const BusRoutes = router;
