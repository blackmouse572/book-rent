import * as z from "zod";

export const upDateOrderSchema = z.object({
    rentalDate: z.date(),
    returnDate: z.date(),
    pickupLocation: z.string().min(10),
    returnLocation: z.string().min(10),
    depositType: z.enum(["COD", "ONLINE"]),
});
export const penaltyOrderSchema = z.object({
    penalty: z.coerce.number().min(0),
    penaltyReason: z.string().min(10),
});
