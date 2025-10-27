// src/features/catalog/hooks/useCatalog.ts
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { GET_PRODUCTS } from "../constants";
import type { ProductResponse } from "../interfaces/product-response.interface";
import { getProducts } from "../services/catalog.service";

export function useCatalog() {
  const [q, setQ] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: [GET_PRODUCTS],
    queryFn: async () => await getProducts(),
    enabled: true,
  });

  const products: ProductResponse[] = useMemo(() => {
    if (!data) return [];

    const t = q.trim().toLowerCase();

    if (!t) return data || [];

    return data.filter(
      (p) =>
        p.name.toLowerCase().includes(t) ||
        p.brand.name.toLowerCase().includes(t) ||
        p.category?.name.toLowerCase().includes(t)
    );
  }, [q, data]);

  return { q, items: products, isLoading, setQ };
}
