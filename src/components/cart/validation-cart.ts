import * as z from "zod";
// export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // 8 characters, 1 uppercase, 1 lowercase, 1 number
export const CartSchema = z.object({
  addressRental: z.string().min(10),
  addressReturn: z.string().min(10),
  dateReturn: z.string(),
  dateRental: z.string(),
  type: z.enum(["creditCard", "cashOnDelivery"], {
    required_error: "You need to select a notification type.",
  }),
  // .regex(passwordRegex, 'Password must contain 8 characters, 1 uppercase, 1 lowercase, 1 number')
});