import * as z from 'zod';

export const createBookSchema = z.object({
  name: z.string().min(3).max(100),
  rental_price: z.coerce.number().min(0),
  description: z.string().min(10),
  category: z.string(), 
  keyword: z.string().min(10),
  genres: z.string(), 
  author: z.string().min(3).max(50),
  image: z.any(),
});
