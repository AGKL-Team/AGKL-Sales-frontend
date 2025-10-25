import { useNavigate } from "react-router-dom";
import type { ProductResponse } from "../interfaces/product-response.interface";

type Props = { p: ProductResponse };

export default function ProductRow({ p }: Props) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 140px 120px 120px",
        gap: 12,
        padding: "8px 12px",
      }}
    >
      <span>{p.name}</span>
      <span style={{ textTransform: "capitalize" }}>{p.brand.name}</span>
      <span>
        $
        {p.price.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
          maximumFractionDigits: 0,
        })}
      </span>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button
          type="button"
          title="Editar"
          onClick={() =>
            navigate(`/dashboard/products/${p.id}`, {
              state: { product: p },
            })
          }
          style={{ padding: "4px 10px", borderRadius: 999, cursor: "pointer" }}
        >
          Editar
        </button>
        <button
          type="button"
          title="Borrar"
          style={{ padding: "4px 10px", borderRadius: 999, cursor: "pointer" }}
        >
          Borrar
        </button>
      </div>
    </div>
  );
}
