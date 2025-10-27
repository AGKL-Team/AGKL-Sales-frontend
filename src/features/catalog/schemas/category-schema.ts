import z from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, "El nombre de la categoría es obligatorio")
    .max(30, "El nombre de la categoría no puede exceder 30 caracteres"),
});
