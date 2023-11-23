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

export const BusService = {
  createBus,
};
