import { toast } from "sonner";
import { httpClient } from "../../../shared/http/httpClient";
import type { ProductResponse } from "../interfaces/product-response.interface";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export async function saveProduct(input: {
  nombre: string;
  descripcion: string;
  categoria: string;
  marca: string;
  precio: number;
  imagenFile?: File | null;
}): Promise<void> {
  const fd = new FormData();
  fd.append("nombre", input.nombre);
  fd.append("descripcion", input.descripcion);
  fd.append("categoria", input.categoria);
  fd.append("marca", input.marca);
  fd.append("precio", String(input.precio));
  if (input.imagenFile) fd.append("imagen", input.imagenFile);

  const response = await httpClient(`${API_BASE}/products`, {
    method: "POST",
    data: fd,
  });

  if (!response || !response.status || response.status >= 400) {
    toast.error("No se pudo crear el producto");
  } else {
    toast.success("Producto creado con éxito");
  }
}

export async function getProducts(): Promise<ProductResponse[]> {
  const response = await httpClient.get<ProductResponse[]>(
    `${API_BASE}/products`
  );

  if (!response || !response.status || response.status >= 400) {
    toast.error("Error al recuperar los productos");
    return [];
  }

  return response.data;
}

export async function getProductById(id: number): Promise<ProductResponse> {
  const response = await httpClient.get<ProductResponse>(
    `${API_BASE}/products/${id}`
  );

  if (!response || !response.status || response.status >= 400) {
    toast.error("Error al recuperar el producto");
    throw new Error("Error al recuperar el producto");
  }

  return response.data;
}

// PUT /products/:id  (multipart si cambia la imagen)
export async function updateProductApi(
  id: string,
  input: {
    nombre: string;
    descripcion: string;
    categoria: string;
    marca: string;
    precio: number;
    imagenFile?: File | null; // si viene, re-subimos; si no, dejamos igual
  }
): Promise<ProductResponse> {
  const fd = new FormData();
  fd.append("nombre", input.nombre);
  fd.append("descripcion", input.descripcion);
  fd.append("categoria", input.categoria);
  fd.append("marca", input.marca);
  fd.append("precio", String(input.precio));
  if (input.imagenFile) fd.append("imagen", input.imagenFile);

  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: "PUT",
    body: fd,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Error ${res.status} al actualizar producto`);
  }

  return (await res.json()) as ProductResponse;
}
