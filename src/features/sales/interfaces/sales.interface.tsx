export interface Sale {
  id?: string;
  nombre: string;
  fecha: string;
  productos: string[];
  vendedor: string;
  cliente: string;
  total?: number;
}

/*export interface SaleFormData {
  nombre: string;
  fecha: string;
  productos: string[];
  vendedor: string;
  cliente: string;
}*/