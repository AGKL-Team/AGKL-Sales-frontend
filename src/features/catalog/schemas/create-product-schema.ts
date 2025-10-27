import z from "zod";
import { selectRequiredNumber } from "../../../shared/utils/required-number";
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
  price: z
    .string()
    .refine(selectRequiredNumber, {
      message: "Indique el precio del producto",
    })
    .transform((value) => Number(value))
    .pipe(z.number().min(0, { message: "El precio debe ser mayor que 0" })),
  brand: BrandSchema.nullable().refine((brand) => brand !== null, {
    message: "Debe seleccionar una marca",
  }),
  category: CategorySchema.nullable().refine((category) => category !== null, {
    message: "Debe seleccionar una categoría",
  }),
  image: z.url("La imagen debe ser una URL válida").optional(),
});

export type CreateProductSchemaType = z.infer<typeof CreateProductSchema>;
