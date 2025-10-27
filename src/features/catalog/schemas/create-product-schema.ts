import z from "zod";
import { BrandSchema } from "./brand-schema";
import { CategorySchema } from "./category-schema";

export const CreateProductSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre del producto es obligatorio")
    .max(50, "El nombre del producto no puede exceder 50 caracteres"),
  description: z
    .string()
    .max(255, "La descripción no puede exceder 255 caracteres")
    .optional(),
  price: z.number().min(0, "El precio no puede ser negativo"),
  brand: BrandSchema.nullable().refine((brand) => brand !== null, {
    message: "Debe seleccionar una marca",
  }),
  category: CategorySchema.nullable().refine((category) => category !== null, {
    message: "Debe seleccionar una categoría",
  }),
  image: z.url("La imagen debe ser una URL válida").optional(),
});

export type CreateProductSchemaType = z.infer<typeof CreateProductSchema>;
