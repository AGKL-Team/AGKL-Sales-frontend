import z from "zod";
import { selectRequiredNumber } from "../../../shared/utils/required-number";

export const AccountSchema = z.object({
  height: z
    .string()
    .refine(selectRequiredNumber, {
      message: "The height must be between 0.1 and 3",
    })
    .transform((value) => Number(value))
    .pipe(
      z
        .number()
        .min(0.1, { message: "The height must be between 0.1 and 3" })
        .max(3, { message: "The height must be between 0.1 and 3" })
    ),
});

export type AccountSchemaType = z.infer<typeof AccountSchema>;
