import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { GET_PRODUCT } from "../constants";
import { getProductById } from "../services/catalog.service";

export const useGetProduct = (productId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_PRODUCT, productId],
    queryFn: async () => {
      try {
        if (!productId || productId <= 0) {
          throw new Error("Invalid product ID");
        }

        return await getProductById(productId);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Error al obtener el producto"
        );
      }
    },
  });

  return {
    product: data,
    isLoading,
  };
};
