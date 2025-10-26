import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { httpClient } from "../../../shared/http/httpClient";
import { CreateSaleRequest } from "../interfaces/create-sale-request.interface";
import { SaleResponse } from "../interfaces/sale-response.interface";

const SALE_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL}/sales`;

export async function saveSale(request: CreateSaleRequest): Promise<void> {
  const response = await httpClient.post(SALE_ENDPOINT, request);

  if (!response || response.status !== 201) {
    toast.error("Error al guardar la venta");
  } else {
    toast.success("Venta registrada exitosamente");
  }
}

export async function getSales() {
  const response = await httpClient.get<SaleResponse[]>(SALE_ENDPOINT);

  if (!response || (await response).status !== HttpStatusCode.Ok) {
    toast.error("Error al recuperar las ventas");
  }

  return response.data;
}
