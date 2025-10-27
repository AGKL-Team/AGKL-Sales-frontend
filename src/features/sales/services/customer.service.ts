import { toast } from "sonner";
import { httpClient } from "../../../shared/http/httpClient";
import { CustomerResponse } from "../interfaces/customer-response.interface";

const CUSTOMER_ENDOPINT = `${import.meta.env.VITE_BACKEND_URL}/customers`;

export async function getCustomers() {
  const response = await httpClient.get<CustomerResponse[]>(CUSTOMER_ENDOPINT);

  if (!response || response.status !== 200) {
    toast.error("Ocurrió un error al recuperar los clientes.");
    throw new Error("Ocurrió un error al recuperar los clientes.");
  }

  return response.data;
}
