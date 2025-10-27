import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GET_SALES, SAVE_SALE } from "../constants";
import { CreateSaleRequest } from "../interfaces/create-sale-request.interface";
import { saveSale } from "../services/sale.service";

export const useSaveSale = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [SAVE_SALE],
    mutationFn: async (data: CreateSaleRequest) => {
      return await saveSale(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_SALES] });
      navigate("/dashboard");
    },
  });

  return { save: mutateAsync, isSaving: isPending };
};
