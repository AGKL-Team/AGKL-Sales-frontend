import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { GET_CATEGORIES } from "../constants";
import { getCategories } from "../services/category.service";

export const useGetCategories = (brandId?: number) => {
  const [filter, setFilter] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: [GET_CATEGORIES, brandId],
    queryFn: async () => {
      return await getCategories();
    },
  });

  const categories = useMemo(() => {
    if (!data) return [];

    if (filter.trim() === "") {
      return data;
    }

    return data.filter((category) =>
      category.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  return { categories, isLoading, error, filter, setFilter };
};
