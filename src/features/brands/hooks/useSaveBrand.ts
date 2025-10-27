import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SAVE_BRAND } from "../constants";
import { CreateBrandRequest } from "../interfaces/create-brand-request.interface";
import { saveBrand } from "../services/brand.service";

export const useSaveBrand = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [SAVE_BRAND],
    mutationFn: async (request: CreateBrandRequest) => {
      return await saveBrand(request);
    },
    onSuccess: () => {
      navigate("/dashboard/brands");
    },
  });

  return {
    save: mutateAsync,
    isPending,
  };
};
