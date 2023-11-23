import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BusService } from "./manageBus.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { busFilterableFields } from "./manageBus.constant";
import { paginationFields } from "../../../constrants/pagination";
import { IBus } from "./manageBus.interface";

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

const getAllBuses = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, busFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BusService.getAllBuses(filters, paginationOptions);

  sendResponse<IBus[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Buses Retrieved Successfully",
    meta: result.meta,
    data: result?.data,
  });
});

const getSingleBus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BusService.getSingleBus(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bus Retrieved Successfully",
    data: result,
  });
});

export const BusController = {
  createBus,
  getAllBuses,
  getSingleBus,
};
