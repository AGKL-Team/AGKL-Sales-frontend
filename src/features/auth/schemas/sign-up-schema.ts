import { z } from "zod";
import { selectRequiredNumber } from "../../../shared/utils/required-number";

export const SignUpSchema = z
  .object({
    email: z
      .email({ message: "Invalid email." })
      .max(255, { message: "The email cannot exceed 255 characters" }),
    password: z.string({ message: "Invalid password." }).refine(
      (value) => {
        return (
          value.length >= 8 &&
          value.length <= 16 &&
          /\d/.test(value) &&
          /[a-z]/.test(value) &&
          /[A-Z]/.test(value)
        );
      },
      {
        message:
          "The password must be between 8 and 16 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
      }
    ),
    confirmPassword: z.string({ message: "Invalid password." }).min(1, {
      message: "You must confirm your password.",
    }),
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpData = z.infer<typeof SignUpSchema>;
