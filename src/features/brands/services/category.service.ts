import { toast } from "sonner";
import { httpClient } from "../../../shared/http/httpClient";
import { CategoryResponse } from "../interfaces/category-response.interface";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function getCategories() {
  const response = await httpClient.get<CategoryResponse[]>(
    `${API_URL}/categories`
  );

  if (!response || response.status !== 200) {
    toast.error("Error al obtener las categorías");
    return [];
  }

  return response.data;
}

export async function getCategoriesByBrand(brandId: number, filter?: string) {
  const response = await httpClient.get<CategoryResponse[]>(
    `${API_URL}/categories/brand/${brandId}`,
    {
      params: { filter },
    }
  );

  if (!response || response.status !== 200) {
    toast.error("Error al obtener las categorías");
    return null;
  }

  return response.data;
}
