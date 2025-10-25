import { BrandResponse } from "../../brands/interfaces/brand-response.interface";
import { CategoryResponse } from "../../brands/interfaces/category-response.interface";

export type ProductResponse = {
  id: number;
  name: string;
  description: string;
  category?: CategoryResponse;
  brand: BrandResponse;
  price: number;
  images: ProductImageResponse[];
};

export interface ProductImageResponse {
  id: number;
  url: string;
}
