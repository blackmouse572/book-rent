import * as z from "zod";

export const userSchema = z.object({
  email: z.string().min(10).max(100),
  fullName: z.string().min(1).max(30),
  phone: z.string().min(10).max(14),
  password: z.string().min(6).max(50),
  username: z.string().min(6).max(100),
  address: z.string(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "USER"]),
  blocked: z.boolean(),
});

