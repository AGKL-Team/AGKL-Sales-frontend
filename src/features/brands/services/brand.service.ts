import { toast } from "sonner";
import { httpClient } from "../../../shared/http/httpClient";
import { BrandResponse } from "../interfaces/brand-response.interface";
import { CreateBrandRequest } from "./../interfaces/create-brand-request.interface";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function getBrands(): Promise<BrandResponse[]> {
  const response = await httpClient.get<BrandResponse[]>(`${API_URL}/brands`);

  if (!response || response.status !== 200) {
    toast.error("Error al cargar las marcas");
    throw new Error("Error fetching brands");
  }

  return response.data;
}

export async function saveBrand(request: CreateBrandRequest) {
  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("description", request.description);
  formData.append("logo", request.image);

  const response = await httpClient.post(`${API_URL}/brands`, formData);

  if (response.status !== 201) {
    toast.error("Error al crear la marca");
  } else {
    toast.success("Marca creada con éxito");
  }
}

export async function getBrandById(
  brandId: number
): Promise<BrandResponse | null> {
  const response = await httpClient.get<BrandResponse>(
    `${API_URL}/brands/${brandId}`
  );

  if (!response || response.status === 404) {
    toast.error("Marca no encontrada");
    return null;
  }

  return response.data;
}
