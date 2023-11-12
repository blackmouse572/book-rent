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
  citizenId: z.string().min(9).max(12),
  citizenIdType: z.enum(["old"
  , "new"
  , "cccd_chip_front"
  , "old_back"
  , "new_back"
  , "chip_front"
  , "chip_back"
  , "cccd_chip_back"]),
  citizenIdIssueDate: z.date(),
  citizenIdPlaceOfIssue: z.string(),
  citizenIdDateOfBirth: z.date(),
});
