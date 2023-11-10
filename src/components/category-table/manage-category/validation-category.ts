import * as z from "zod";

export const categogySchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});

export const categogyUpdateSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  status: z.enum(["ENABLE", "DISABLE"]),
});
