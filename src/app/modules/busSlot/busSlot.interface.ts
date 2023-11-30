import mongoose, { Document, Model, Types } from "mongoose";
import { IBus } from "../manageBus/manageBus.interface";

export interface ISlot extends Document {
  _id: string;
  bus?: Types.ObjectId | IBus;
  seat: [];
  slots: string;
  todayDate: string;
  createdAt: Date;
  updatedAt: Date;
}
export type ISlotModel = Model<ISlot, Record<string, unknown>>;
