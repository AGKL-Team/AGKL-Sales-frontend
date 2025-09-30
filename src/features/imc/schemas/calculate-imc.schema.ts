import z from "zod";
import { selectRequiredNumber } from "../../../shared/utils/required-number";

export const CalculateImcSchema = z.object({
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
  weight: z
    .string()
    .refine(selectRequiredNumber, {
      message: "The weight must be between 1 and 500",
    })
    .transform((value) => Number(value))
    .pipe(
      z
        .number()
        .min(1, { message: "The weight must be between 1 and 500" })
        .max(500, { message: "The weight must be between 1 and 500" })
    ),
});

export type CalculateImcSchema = z.infer<typeof CalculateImcSchema>;
