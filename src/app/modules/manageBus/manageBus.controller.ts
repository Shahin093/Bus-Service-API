import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BusService } from "./manageBus.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createBus = catchAsync(async (req: Request, res: Response) => {
  const { ...busData } = req.body;
  const result = await BusService.createBus(busData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bus created successfully.",
    data: result,
  });
});

export const BusController = {
  createBus,
};
