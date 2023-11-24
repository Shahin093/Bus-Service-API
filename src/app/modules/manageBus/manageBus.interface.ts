import mongoose, { Document, Model, Types } from "mongoose";
import { IUser } from "../users/user.interface";

// export enum destination {
//   Morning = "9:00AM",
//   Afternoon = "12:00AM",
//   noon = "2:00PM",
//   evening = "5:00PM",
//   night = "8:00PM",
//   Tonight = "10:00PM",
// }
export interface IBus extends Document {
  _id: string;
  busName: string;
  manager?: Types.ObjectId | IUser;
  img: string;
  seat: number;
  destination: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// export type UserModel = {} & Model<IUser>;

export type BusModel = Model<IBus, Record<string, unknown>>;

export type IBusFilters = {
  searchTerm?: string;
  busName?: string;
  destination?: string;
};
