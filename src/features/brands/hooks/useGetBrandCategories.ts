import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GET_BRAND_CATEGORIES } from "../constants";
import { getCategoriesByBrand } from "../services/category.service";

export const useGetBrandCategories = (
  brandId: number | null,
  redirectOnError: boolean = true
) => {
  const navigate = useNavigate();

  /** Effect to ensure the brand ID is provided */
  useEffect(() => {
    if (!brandId) {
      toast.error("ID de marca no proporcionado", {
        duration: 3000,
      });

      if (redirectOnError)
        setTimeout(() => {
          navigate("/dashboard/brands");
        }, 3000);
    }
  }, [brandId, navigate, redirectOnError]);

  const { data, isLoading } = useQuery({
    queryKey: [GET_BRAND_CATEGORIES, brandId],
    queryFn: async () => {
      if (!brandId) return [];

      return await getCategoriesByBrand(brandId);
    },
    enabled: !!brandId,
  });

  return {
    categories: data || [],
    isLoading,
  };
};
