import * as z from "zod";

export const cardFormSchema = z.object({
  fullName: z.string().min(5),
  numberCard: z.string().refine((value) => isValidCardNumber(value), {
    message: "Invalid card number - refine 16 number",
  }),
  expirationDate: z.object({
    month: z.string().min(2).max(2),
    year: z.string().min(4).max(4),
  }),
  cvv: z.string().min(3).max(3),
});

function isValidCardNumber(value: string) {
  // Thêm mã kiểm tra thẻ tín dụng của bạn ở đây
  // Ví dụ: Kiểm tra độ dài và các quy tắc khác cho số thẻ tín dụng
  return /^\d{16}$/.test(value); // Ví dụ: Kiểm tra xem số thẻ có 16 chữ số hay không
}
