import * as z from "zod";
// export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // 8 characters, 1 uppercase, 1 lowercase, 1 number
export const LoginSchema = z.object({
  userNameOrEmail: z.string().min(3),
  password: z.string().min(6),
  // .regex(passwordRegex, 'Password must contain 8 characters, 1 uppercase, 1 lowercase, 1 number')
  remember: z.boolean(),
});
