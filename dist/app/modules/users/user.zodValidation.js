"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: "Phone Number is Required",
        }),
        password: zod_1.z.string({
            required_error: "password is required!",
        }),
        role: zod_1.z.enum([...user_constant_1.Role], {
            required_error: "role is required",
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "FirstName is required!",
            }),
            lastName: zod_1.z.string({
                required_error: "lastName is required",
            }),
        }),
        address: zod_1.z.string({
            required_error: "address is required",
        }),
        img: zod_1.z.string({
            required_error: "Image is required!",
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum([...user_constant_1.Role]).optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        address: zod_1.z.string().optional(),
        img: zod_1.z.string().optional(),
    }),
});
exports.UserZodValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};
