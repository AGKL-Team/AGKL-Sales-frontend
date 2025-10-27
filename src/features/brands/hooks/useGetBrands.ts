import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { GET_BRANDS } from "../constants";
import { getBrands } from "../services/brand.service";

export const useGetBrands = () => {
  const [filter, setFilter] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: [GET_BRANDS],
    queryFn: async () => {
      return await getBrands();
    },
  });

  const brands = useMemo(() => {
    if (!data) return [];
    if (filter.trim() === "") return data;

    return data.filter((brand) =>
      brand.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  return {
    brands,
    isLoading,
    filter,
    setFilter,
  };
};
