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

export async function associateCategoryToBrand(
  brandId: number,
  categoryId: number
) {
  const response = await httpClient.post(
    `${API_URL}/categories/associate-brand`,
    {
      brandId,
      categoryId,
    }
  );

  if (!response || response.status !== 200) {
    toast.error("Error al asociar la categoría a la marca");
  } else {
    toast.success("Categoría asociada a la marca correctamente");
  }
}
