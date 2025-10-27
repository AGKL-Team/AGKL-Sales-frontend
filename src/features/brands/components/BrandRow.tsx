import { useNavigate } from "react-router-dom";
import type { BrandResponse } from "../interfaces/brand-response.interface";

type Props = { brand: BrandResponse };

export default function BrandRow({ brand }: Props) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 12,
        padding: "8px 12px",
      }}
    >
      <div>
        <img src={brand.logoUrl!} alt={brand.name} height={100} width={100} />
      </div>
      <span>{brand.name}</span>
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <button
          type="button"
          title="Editar"
          onClick={() =>
            navigate(`/dashboard/brands/${brand.id}`, {
              state: { brand: brand },
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
        <button
          type="button"
          title="Categorías"
          style={{ padding: "4px 10px", borderRadius: 999, cursor: "pointer" }}
          onClick={() => navigate(`/dashboard/brands/categories/${brand.id}`)}
        >
          Categorías
        </button>
      </div>
    </div>
  );
}
