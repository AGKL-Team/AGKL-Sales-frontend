import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SAVE_PRODUCT } from "../constants";
import { ProductResponse } from "../interfaces/product-response.interface";
import { saveProduct } from "../services/catalog.service";

export const useSaveProduct = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: [SAVE_PRODUCT],
    mutationFn: async (formData: Omit<ProductResponse, "id">) => {
      return await saveProduct(formData);
    },
    onSuccess: () => {
      navigate("/dashboard/products");
    },
  });

  return {
    save: mutate,
  };
};
