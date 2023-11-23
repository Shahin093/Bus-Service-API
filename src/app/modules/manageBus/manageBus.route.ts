import express from "express";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { BusZodValidation } from "./manageBus.zodValidation";
import { BusController } from "./manageBus.controller";

const router = express.Router();

router.get("/", BusController.getAllBuses);
router.get("/:id", BusController.getSingleBus);

router.patch(
  "/:id",
  zodValidateRequest(BusZodValidation.updateBusZodSchema),
  BusController.updateBus
);

router.delete("/:id", BusController.deleteBus);

router.post(
  "/create-bus",
  zodValidateRequest(BusZodValidation.createBusZodSchema),
  BusController.createBus
);

export const BusRoutes = router;
