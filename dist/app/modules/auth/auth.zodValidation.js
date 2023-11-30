"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthZodValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: "PhoneNumber is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh Token is required",
        }),
    }),
});
exports.AuthZodValidation = {
    loginZodSchema,
    refreshTokenZodSchema,
};
