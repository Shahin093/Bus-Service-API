import mongoose, { Schema } from "mongoose";
import { ISlot, ISlotModel } from "./busSlot.interface";

const SlotSchema: Schema = new Schema(
  {
    bus: {
      type: Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },
    seat: {
      type: Array,
      required: true,
    },
    todayDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.model<ISlot, ISlotModel>("Slot", SlotSchema);

export default Slot;
