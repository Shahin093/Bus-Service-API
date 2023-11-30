import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constrants/pagination";
import BusBooking from "./busBooking.model";
import { BusBookingService } from "./busBooking.service";
import { busBookingFilterableFields } from "./busBooking.constant";
import { IBooking } from "./busBooking.interface";

const createBusBooking = catchAsync(async (req: Request, res: Response) => {
  const { ...busBookingData } = req.body;
  const result = await BusBookingService.createBusBooking(busBookingData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bus created successfully.",
    data: result,
  });
});

const getAllBusesBooking = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, busBookingFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BusBookingService.getAllBusesBooking(
    filters,
    paginationOptions
  );

  sendResponse<IBooking[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Retrieved Successfully",
    meta: result.meta,
    data: result?.data,
  });
});

const getSingleBusBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BusBookingService.getSingleBusBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Retrieved Successfully",
    data: result,
  });
});

const updateBusBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const updatedData = req.body;

  const result = await BusBookingService.updateBusBooking(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking updated successfully",
    data: result,
  });
});

const deleteBusBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BusBookingService.deleteBusBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Deleted successfully",
    data: result,
  });
});

export const BusBookingController = {
  createBusBooking,
  getAllBusesBooking,
  getSingleBusBooking,
  updateBusBooking,
  deleteBusBooking,
};
