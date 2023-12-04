import mongoose, { Document, Model } from "mongoose";
export enum UserRole {
  User = "user",
  Admin = "admin",
  Manager = "manager",
  employee = "employee",
}

export type UserName = {
  firstName: string;
  lastName: string;
};

export interface IUser extends Document {
  _id: string;
  phoneNumber: string;
  email: string;
  role?: UserRole;
  password?: string;
  name: UserName;
  img: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserModel = {
  isUserExistLogin(
    phoneNumber: string
  ): Promise<
    Pick<IUser, "_id" | "phoneNumber" | "password" | "role" | "address">
  >;
  isUserExist(
    id: string
  ): Promise<
    Pick<IUser, "_id" | "phoneNumber" | "password" | "role" | "address">
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  searchTerm?: string;
  phoneNumber?: string;
  role?: string;
  firstName?: string;
  address?: string;
};
