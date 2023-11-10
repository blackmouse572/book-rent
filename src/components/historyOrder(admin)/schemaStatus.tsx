import * as z from "zod";

export const upDateOrderStatusSchema = z.object({

  status:z.enum(["REJECTED" , "RETURNED","CANCELLED","PENDING"])
});
