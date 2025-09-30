import { zodResolver } from "@hookform/resolvers/zod";
import {
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import { ZodObject, ZodRawShape, z } from "zod";

/**
 * Hook genérico para formularios con Zod + React Hook Form
 * T = ZodObject que representa la forma del formulario
 */
export function useZodForm<TSchema extends ZodObject<ZodRawShape>>(
  schema: TSchema,
  options?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">
): UseFormReturn<z.infer<TSchema>> {
  return useForm<z.infer<TSchema>>({
    ...options,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as unknown as any,
  });
}
