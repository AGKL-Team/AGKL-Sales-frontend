import { CategoryResponse } from "./category-response.interface";

export interface ImcResponse {
  id: number;
  date: string;
  height: number;
  weight: number;
  category: CategoryResponse;
  imc: number;
  userId: string;
}
