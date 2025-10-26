import { useQuery } from "@tanstack/react-query";
import { GET_SALES } from "../constants";
import { getSales } from "../services/sale.service";

export const useGetSales = () => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_SALES],
    queryFn: async () => {
      return await getSales();
    },
  });

  return {
    sales: data || [],
    isLoading,
  };
};
