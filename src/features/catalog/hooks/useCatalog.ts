// src/features/catalog/hooks/useCatalog.ts
import { useMemo, useState } from "react";
import type { CatalogProduct } from "../interfaces/product.interface";

export const DATA: CatalogProduct[] = [
  {
    id: "p1",
    nombre: "Producto 1",
    descripcion: "Descripción del producto 1",
    categoria: "Electrónica",
    marca: "marca A",
    precio: 20000,
    imagenUrl: null,
  },
  {
    id: "p2",
    nombre: "Producto 2",
    descripcion: "Descripción del producto 2",
    categoria: "Hogar",
    marca: "marca B",
    precio: 30000,
    imagenUrl: null,
  },
  {
    id: "p3",
    nombre: "Producto 3",
    descripcion: "Descripción del producto 3",
    categoria: "Bebidas",
    marca: "marca C",
    precio: 50000,
    imagenUrl: null,
  },
];
export function useCatalog() {
  const [q, setQ] = useState("");
  const items: CatalogProduct[] = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return DATA;
    return DATA.filter(
      (p) =>
        p.nombre.toLowerCase().includes(t) ||
        p.marca.toLowerCase().includes(t) ||
        p.categoria.toLowerCase().includes(t)
    );
  }, [q]);

  return { q, setQ, items };
}
