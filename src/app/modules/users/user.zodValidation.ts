import { z } from "zod";
import { Role } from "./user.constant";

const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone Number is Required",
    }),
    password: z.string({
      required_error: "password is required!",
    }),
    role: z.enum([...Role] as [string, ...string[]], {
      required_error: "role is required",
    }),
    name: z.object({
      firstName: z.string({
        required_error: "FirstName is required!",
      }),
      lastName: z.string({
        required_error: "lastName is required",
      }),
    }),
    address: z.string({
      required_error: "address is required",
    }),
    img: z.string({
      required_error: "Image is required!",
    }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string().optional(),
    password: z.string().optional(),
    role: z.enum([...Role] as [string, ...string[]]).optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    address: z.string().optional(),
    img: z.string().optional(),
  }),
});

export const UserZodValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
