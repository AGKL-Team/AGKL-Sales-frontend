import type { CatalogProduct } from "../interfaces/product.interface";


const API_BASE = "/api";

export async function createProductApi(input: {
  nombre: string;
  descripcion: string;
  categoria: string;
  marca: string;
  precio: number;
  imagenFile?: File | null;
}): Promise<CatalogProduct> {
  const fd = new FormData();
  fd.append("nombre", input.nombre);
  fd.append("descripcion", input.descripcion);
  fd.append("categoria", input.categoria);
  fd.append("marca", input.marca);
  fd.append("precio", String(input.precio));
  if (input.imagenFile) fd.append("imagen", input.imagenFile);

  const res = await fetch(`${API_BASE}/products`, {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Error ${res.status} al crear producto`);
  }

  const data = (await res.json()) as CatalogProduct;
  return data;
}

export async function listProductsApi(): Promise<CatalogProduct[]> {
  const res = await fetch(`${API_BASE}/products`, { method: "GET" });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Error ${res.status} al obtener productos`);
  }
  return (await res.json()) as CatalogProduct[];
}

export async function getProductApi(id: string): Promise<CatalogProduct> {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error(`No se pudo cargar el producto (${res.status})`);
  return (await res.json()) as CatalogProduct;
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
    imagenFile?: File | null;  // si viene, re-subimos; si no, dejamos igual
  }
): Promise<CatalogProduct> {
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

  return (await res.json()) as CatalogProduct;
}