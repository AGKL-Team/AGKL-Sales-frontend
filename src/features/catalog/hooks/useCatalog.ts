import { useMemo, useState } from "react";
import type { CatalogProduct } from "../interfaces/catalog.interface";

const DATA: CatalogProduct[] = [
  { id: "p1", nombre: "Producto 1", marca: "marca A", precio: 20000, activo: true },
  { id: "p2", nombre: "Producto 2", marca: "marca B", precio: 30000, activo: false },
  { id: "p3", nombre: "Producto 3", marca: "marca C", precio: 50000, activo: true },
  { id: "p4", nombre: "Producto 4", marca: "marca D", precio: 10000, activo: true },
  { id: "p5", nombre: "Producto 5", marca: "marca E", precio: 25000, activo: false },
];

export function useCatalog() {
  const [q, setQ] = useState("");
  const [soloActivos, setSoloActivos] = useState(false);

  const items = useMemo(() => {
    let arr = DATA;
    const t = q.trim().toLowerCase();
    if (t) {
      arr = arr.filter(
        (p) => p.nombre.toLowerCase().includes(t) || p.marca.toLowerCase().includes(t)
      );
    }
    if (soloActivos) arr = arr.filter((p) => p.activo);
    return arr;
  }, [q, soloActivos]);

  return { q, setQ, soloActivos, setSoloActivos, items };
}
