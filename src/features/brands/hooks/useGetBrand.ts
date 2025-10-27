import { useQuery } from "@tanstack/react-query";
import { GET_BRAND } from "../constants";
import { getBrandById } from "../services/brand.service";

export function useGetBrand(brandId: number) {
  const { data, isLoading } = useQuery({
    queryKey: [GET_BRAND, brandId],
    queryFn: async () => {
      return await getBrandById(brandId);
    },
    enabled: !!brandId,
  });

  return { brand: data, isLoading };
}
