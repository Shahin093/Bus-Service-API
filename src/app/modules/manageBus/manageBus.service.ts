import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/PaginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOption } from "../../../interfaces/pagination";
import { busSearchableFields } from "./manageBus.constant";
import { IBus, IBusFilters } from "./manageBus.interface";
import Bus from "./manageBus.model";

const createBus = async (payload: IBus): Promise<IBus | null> => {
  const result = (await Bus.create(payload)).populate("manager");
  return result;
};

const getAllBuses = async (
  filters: IBusFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IBus[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: busSearchableFields.map((field) => ({
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

  const result = await Bus.find(whereConditions)
    .populate("manager")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Bus.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBus = async (id: string): Promise<IBus | null> => {
  const result = await Bus.findById({ _id: id }).populate("manager");
  return result;
};

const updateBus = async (id: string, payload: IBus): Promise<IBus | null> => {
  const result = await Bus.findByIdAndUpdate({ _id: id }, payload);

  return result;
};

const deleteBus = async (id: string): Promise<IBus | null> => {
  const result = await Bus.findByIdAndDelete(id);
  return result;
};

export const BusService = {
  createBus,
  getAllBuses,
  getSingleBus,
  updateBus,
  deleteBus,
};
