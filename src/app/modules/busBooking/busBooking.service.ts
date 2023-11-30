import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/PaginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOption } from "../../../interfaces/pagination";
import { IBooking, IBookingFilters } from "./busBooking.interface";
import BusBooking from "./busBooking.model";
import { busBookingSearchableFields } from "./busBooking.constant";
import Slot from "../busSlot/busSlot.model";

// bus - 655f1baf055ea2f8c1f1b8a8
// user -
const createBusBooking = async (
  payload: IBooking
): Promise<IBooking | null> => {
  const today = new Date();
  console.log("today", today.toISOString().slice(0, 10).slice(0, 10));

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const todayBookingSeat = await Slot.find({
    slot: payload.destination,
    todayDate: today.toISOString().slice(0, 10).slice(0, 10),
  });

  const busSeatData = {
    bus: payload.bus,
    seat: payload.seat,
    slot: payload.destination,
    todayDate: today.toISOString().slice(0, 10).slice(0, 10),
  };

  if (todayBookingSeat.length > 0) {
    // if you already booking , so you can update
    const oldSeat = todayBookingSeat[0].seat;
    const newSeat = payload.seat;
    await Slot.findByIdAndUpdate(
      { _id: todayBookingSeat[0]._id },
      { seat: [...oldSeat, ...newSeat] },
      {
        new: true,
      }
    );
  } else {
    // if you already booking , so you can create
    await Slot.create(busSeatData);
  }

  const result = (
    await (await BusBooking.create(payload)).populate("user")
  ).populate("bus");
  return result;
};

const getAllBusesBooking = async (
  filters: IBookingFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IBooking[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: busBookingSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andCondition?.length > 0 ? { $and: andCondition } : {};

  const result = await BusBooking.find(whereConditions)
    .populate("manager")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await BusBooking.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBusBooking = async (id: string): Promise<IBooking | null> => {
  const result = await BusBooking.findById({ _id: id }).populate("manager");
  return result;
};

const updateBusBooking = async (
  id: string,
  payload: IBooking
): Promise<IBooking | null> => {
  const result = await BusBooking.findByIdAndUpdate({ _id: id }, payload);

  return result;
};

const deleteBusBooking = async (id: string): Promise<IBooking | null> => {
  const result = await BusBooking.findByIdAndDelete(id);
  return result;
};

export const BusBookingService = {
  createBusBooking,
  getAllBusesBooking,
  getSingleBusBooking,
  updateBusBooking,
  deleteBusBooking,
};
