import type { CatalogProduct } from "../interfaces/catalog.interface";


type Props = { p: CatalogProduct };

const money = (n: number) =>
  n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

export default function ProductRow({ p }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 140px 120px 120px",
        alignItems: "center",
        gap: 12,
        padding: "8px 12px",
      }}
    >
      <span>{p.nombre}</span>
      <span style={{ textTransform: "capitalize" }}>{p.marca}</span>
      <span>{money(p.precio)}</span>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button type="button" title="Editar" style={{ padding: "4px 10px", borderRadius: 999 }}>
          Editar
        </button>
        <button type="button" title="Borrar" style={{ padding: "4px 10px", borderRadius: 999 }}>
          Borrar
        </button>
      </div>
    </div>
  );
}
