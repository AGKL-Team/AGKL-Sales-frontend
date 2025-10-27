import z from "zod";

export const BrandSchema = z.object({
  id: z.number(),
  name: z.string(),
});
