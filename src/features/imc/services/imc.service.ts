import { toast } from "sonner";
import { httpClient } from "../../../shared/http/httpClient";
import { CalculateImcResponse } from "../interfaces/calculate-imc-response.interface";
import { CalculateImcRequest } from "../interfaces/imc-request.interface";
import { ImcResponse } from "../interfaces/imc-response.interface";

const CALCULATE_IMC_ENDPOINT = import.meta.env.VITE_BACKEND_URL;

export async function calculateImc(
  request: CalculateImcRequest
): Promise<CalculateImcResponse> {
  const response = await httpClient.post<CalculateImcResponse>(
    `${CALCULATE_IMC_ENDPOINT}/imc/calcular`,
    {
      height: request.height,
      weight: request.weight,
    }
  );
  return response.data;
}

export async function getImcHistory(filters: {
  dateFrom?: string | undefined;
  dateTo?: string | undefined;
}): Promise<ImcResponse[]> {
  const requestParams: Record<string, unknown> = {};

  if (filters.dateFrom) {
    requestParams.startDate = filters.dateFrom;
  }
  if (filters.dateTo) {
    requestParams.endDate = filters.dateTo;
  }

  const response = await httpClient.get<ImcResponse[]>(
    `${CALCULATE_IMC_ENDPOINT}/imc/history`,
    {
      params: requestParams,
    }
  );

  if (response.status !== 200) {
    toast.error("Ocurrió un error al obtener el historial de IMC");
  }

  return response.data;
}
