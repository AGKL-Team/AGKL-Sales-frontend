import { BrandResponse } from "../../brands/interfaces/brand-response.interface";
import { CategoryResponse } from "../../brands/interfaces/category-response.interface";

export interface CreateProductRequest {
  name: string;
  description: string;
  category?: CategoryResponse;
  brand: BrandResponse;
  price: number;
  images: File[];
}
