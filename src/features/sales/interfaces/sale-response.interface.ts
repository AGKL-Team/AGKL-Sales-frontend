import { ProductResponse } from "../../catalog/interfaces/product-response.interface";

export interface SaleResponse {
  id: number;
  products: SaleDetailResponse[];
  date: Date;
  number: number;
  totalAmount: number;
}

export interface SaleDetailResponse {
  id: number;
  product: ProductResponse;
  quantity: number;
  unitPrice: number;
  unitTax: number;
}
