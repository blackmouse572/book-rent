import * as z from "zod";
// export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // 8 characters, 1 uppercase, 1 lowercase, 1 number
export const CheckoutFormSchema = z.object({
  type: z.enum(["creditCard", "cashOnDelivery"], {
    required_error: "You need to select a notification type.",
  }),
});