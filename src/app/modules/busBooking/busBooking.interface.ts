import mongoose, { Document, Model, Types } from "mongoose";
import { IUser } from "../users/user.interface";
import { IBus } from "../manageBus/manageBus.interface";

export interface IBooking extends Document {
  _id: string;
  user?: Types.ObjectId | IUser;
  bus?: Types.ObjectId | IBus;
  seat: [];
  destination: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingModel = Model<IBooking, Record<string, unknown>>;

export type IBookingFilters = {
  searchTerm?: string;
  busName?: string;
  destination?: string;
};
