"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusZodValidation = void 0;
const zod_1 = require("zod");
const createBusZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        busName: zod_1.z.string({
            required_error: "Bus Name is Required",
        }),
        destination: zod_1.z.string({
            required_error: "destination is required",
        }),
        img: zod_1.z.string({
            required_error: "Image is required!",
        }),
        seat: zod_1.z.number({
            required_error: "seat is required!",
        }),
        description: zod_1.z.string({
            required_error: "description is required!",
        }),
    }),
});
const updateBusZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        busName: zod_1.z.string().optional(),
        destination: zod_1.z.string().optional(),
        img: zod_1.z.string().optional(),
        seat: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.BusZodValidation = {
    createBusZodSchema,
    updateBusZodSchema,
};
