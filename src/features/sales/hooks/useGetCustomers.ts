import { useQuery } from "@tanstack/react-query";
import { GET_CUSTOMERS } from "../constants";
import { getCustomers } from "../services/customer.service";

export const useGetCustomers = () => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_CUSTOMERS],
    queryFn: async () => {
      return await getCustomers();
    },
  });

  return {
    customers: data || [],
    isLoading,
  };
};
