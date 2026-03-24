import {z} from 'zod';


export const createShortUrlSchema = z.object({
  url: z.string().url({ message: "Invalid URL format" }),

});


export type TCreateShortUrl = z.infer<typeof createShortUrlSchema>;