import mongoose, { Schema } from "mongoose";
import { IBooking } from "./busBooking.interface";

const busBooking: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bus: {
      type: Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    seat: {
      type: Array,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BusBooking = mongoose.model<IBooking>("BusBooking", busBooking);

export default BusBooking;
