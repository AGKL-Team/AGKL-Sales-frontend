import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../../../shared/components/LoaderIndicator";
import Header from "../../dashboard/components/Header";
import ProductRow from "../components/ProductRow";
import { useCatalog } from "../hooks/useCatalog";

export default function CatalogPage() {
  const { q, items, isLoading, setQ } = useCatalog();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingIndicator isLoading message="Cargando productos..." />;
  }

  return (
    <div className="theme-responsive" style={{ minHeight: "100vh" }}>
      <Header />

      <section style={{ textAlign: "center", padding: "24px 16px 16px" }}>
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: ".2px",
            color: "var(--theme-text)",
          }}
        >
          Catalogo
        </h2>
      </section>

      <section
        className="theme-card"
        style={{
          maxWidth: 920,
          margin: "0 auto 28px",
          padding: 18,
          borderRadius: 14,
          boxShadow: "0 2px 0 rgba(0,0,0,.08), 0 8px 16px rgba(0,0,0,.06)",
        }}
      >
        {/* Buscar + botón “+” */}
        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              display: "block",
              fontWeight: 700,
              marginBottom: 6,
              color: "var(--theme-text)",
              opacity: 0.9,
            }}
          >
            Buscar
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 42px",
              gap: 10,
              alignItems: "center",
            }}
          >
            <input
              placeholder="Producto o marca…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ width: "100%" }}
            />

            {/* “+” → va a CreateProductForm */}
            <button
              type="button"
              title="Añadir producto"
              aria-label="Añadir producto"
              style={{
                borderRadius: 999,
                border: "1px solid var(--color-input-border)",
                background: "#5b9bd5",
                color: "#fff",
                fontWeight: 800,
                fontSize: 18,
                lineHeight: "38px",
                width: 42,
                height: 42,
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/dashboard/products/new")} // ← AQUÍ
            >
              +
            </button>
          </div>
        </div>

        {/* Lista productos */}
        <div style={{ marginTop: 18 }}>
          <div
            style={{
              fontWeight: 700,
              marginBottom: 8,
              color: "var(--theme-text)",
              opacity: 0.9,
            }}
          >
            Lista Productos
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 140px 120px 120px",
              gap: 12,
              padding: "8px 12px",
              background: "var(--color-input-bg)",
              borderRadius: 8,
              marginBottom: 6,
            }}
          >
            <span>Producto</span>
            <span>Marca</span>
            <span>Precio</span>
            <span style={{ textAlign: "right" }}>Acciones</span>
          </div>

          <div className="theme-table" style={{ borderRadius: 8 }}>
            {items.map((p) => (
              <ProductRow key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
