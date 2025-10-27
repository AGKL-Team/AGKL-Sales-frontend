import z from "zod";
import { ProductSchema } from "../../catalog/schemas/product-schema";

export const CreateDetailSaleSchema = z.object({
  product: ProductSchema.nullable().refine((product) => product !== null, {
    message: "Debe seleccionar un producto",
  }),
  quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
  unitPrice: z.number(),
  unitTax: z.number(),
});

export type CreateDetailSaleSchemaType = z.infer<typeof CreateDetailSaleSchema>;

export const CreateSaleSchema = z.object({
  date: z.string().transform((date) => new Date(date)),
  sellerEmail: z.string().min(1, "El vendedor es obligatorio"),
  customer: z
    .object({
      id: z.number(),
      name: z.string(),
      lastName: z.string(),
    })
    .nullable()
    .refine((customer) => customer !== null, {
      message: "Debe seleccionar un cliente",
    }),
  products: z
    .array(CreateDetailSaleSchema)
    .min(1, "Debe agregar al menos un producto"),
});

export type CreateSaleSchemaType = z.infer<typeof CreateSaleSchema>;
