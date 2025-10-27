import { CategoryResponse } from "../interfaces/category-response.interface";

interface CategoryRowProps {
  category: CategoryResponse;
}

export default function CategoryRow({ category }: CategoryRowProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 140px 120px 120px",
        gap: 12,
        padding: "8px 12px",
      }}
    >
      <span>{category.name}</span>
      {/* <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button
          type="button"
          title="Editar"
          onClick={() =>
            navigate(`/dashboard/categories/${category.id}`, {
              state: { from: "categories" },
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
      </div> */}
    </div>
  );
}
