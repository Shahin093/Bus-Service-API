import { z } from "zod";

const createBusZodSchema = z.object({
  body: z.object({
    busName: z.string({
      required_error: "Bus Name is Required",
    }),

    destination: z.string({
      required_error: "destination is required",
    }),
    img: z.string({
      required_error: "Image is required!",
    }),
    seat: z.string({
      required_error: "seat is required!",
    }),
    description: z.string({
      required_error: "description is required!",
    }),
  }),
});

const updateBusZodSchema = z.object({
  body: z.object({
    busName: z.string().optional(),
    destination: z.string().optional(),
    img: z.string().optional(),
    seat: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const BusZodValidation = {
  createBusZodSchema,
  updateBusZodSchema,
};
