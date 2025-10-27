import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  ASSOCIATE_CATEGORY_TO_BRAND,
  GET_BRAND_CATEGORIES,
} from "../constants";
import { CategoryResponse } from "../interfaces/category-response.interface";
import { associateCategoryToBrand } from "../services/category.service";

export const useAssociateCategoryToBrand = (brandId: number | null) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!brandId) {
      toast.error("ID de marca no proporcionado");

      setTimeout(() => {
        navigate("/dashboard/brands");
      }, 3000);
      return;
    }
  }, [brandId, navigate]);

  const [category, setCategory] = useState<CategoryResponse | null>(null);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [ASSOCIATE_CATEGORY_TO_BRAND, brandId],
    mutationFn: async (categoryId: number) => {
      if (!brandId) throw new Error("ID de marca no proporcionado");

      return await associateCategoryToBrand(brandId, categoryId);
    },
    onSuccess: () => {
      navigate("/dashboard/brands/categories/" + brandId);

      queryClient.invalidateQueries({
        queryKey: [GET_BRAND_CATEGORIES, brandId],
      });
    },
  });

  return {
    associate: mutateAsync,
    isPending,
    category,
    setCategory,
  };
};
