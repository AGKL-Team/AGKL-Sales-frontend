// src/schemas/user.ts
import { z } from "zod";

export const LogInSchema = z.object({
  email: z
    .email({ message: "Invalid email" })
    .max(255, { message: "The email cannot exceed 255 characters" }),
  password: z
    .string()
    .min(8, { message: "Minimum 8 characters" })
    .max(16, { message: "Maximum 16 characters" }),
});

export type LoginData = z.infer<typeof LogInSchema>;
