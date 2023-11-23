import mongoose, { Schema } from "mongoose";

import bcrypt from "bcrypt";
import { IUser, UserModel, UserRole } from "./user.interface";

const UserSchema: Schema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.isUserExistLogin = async function (
  phoneNumber: string
): Promise<IUser | null> {
  return await User.findOne(
    { phoneNumber },
    { _id: 1, password: 1, role: 1, phoneNumber: 1 }
  );
};

UserSchema.statics.isUserExist = async function (
  id: string
): Promise<IUser | null> {
  return await User.findById(
    { _id: id },
    { _id: 1, password: 1, role: 1, phoneNumber: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// hashing password
UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 12);
  next();
});

const User = mongoose.model<IUser, UserModel>("User", UserSchema);

export default User;
