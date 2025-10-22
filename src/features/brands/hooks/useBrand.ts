// src/features/catalog/hooks/useCatalog.ts
import { useMemo, useState } from "react";
import type { Brand } from "../interfaces/brand.interface";

export const DATA: Brand[] = [
  {
    id: "p1",
    nombre: "Producto 1",
    descripcion: "Descripción del producto 1",
    imagenUrl: null,
  },
  {
    id: "p2",
    nombre: "Producto 2",
    descripcion: "Descripción del producto 2",
    imagenUrl: null,
  },
  {
    id: "p3",
    nombre: "Producto 3",
    descripcion: "Descripción del producto 3",
    imagenUrl: null,
  },
];
export function useCatalog() {
  const [q, setQ] = useState("");
  const items: Brand[] = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return DATA;
    return DATA.filter(
      (p) =>
        p.nombre.toLowerCase().includes(t) ||
        p.descripcion.toLowerCase().includes(t)
    );
  }, [q]);

  return { q, setQ, items };
}
