export interface CreateSaleRequest {
  products: CreateSaleDetailRequest[];
  sellerId: number;
  customerId: number;
  totalAmount: number;
}

export interface CreateSaleDetailRequest {
  productId: number;
  quantity: number;
  unitPrice: number;
  unitTax: number;
}
