import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SAVE_PRODUCT } from "../constants";
import { CreateProductRequest } from "../interfaces/create-product-request.interface";
import { saveProduct } from "../services/catalog.service";

export const useSaveProduct = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationKey: [SAVE_PRODUCT],
    mutationFn: async (request: CreateProductRequest) => {
      return await saveProduct(request);
    },
    onSuccess: () => {
      navigate("/dashboard/products");
    },
  });

  return {
    save: mutateAsync,
  };
};
