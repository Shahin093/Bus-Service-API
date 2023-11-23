import mongoose, { Schema } from "mongoose";
import { BusModel, IBus } from "./manageBus.interface";

const BusSchema: Schema = new Schema(
  {
    busName: {
      type: String,
      required: true,
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    seat: {
      type: Number,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bus = mongoose.model<IBus, BusModel>("Bus", BusSchema);

export default Bus;
