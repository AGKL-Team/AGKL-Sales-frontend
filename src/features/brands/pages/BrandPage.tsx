import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../../../shared/components/LoaderIndicator";
import Header from "../../dashboard/components/Header";
import BrandRow from "../components/BrandRow";
import { useGetBrands } from "../hooks/useGetBrands";

export default function BrandPage() {
  const navigate = useNavigate();
  const { brands, isLoading, filter, setFilter } = useGetBrands();

  return (
    <div className="theme-responsive" style={{ minHeight: "100vh" }}>
      <Header />

      {isLoading && <LoadingIndicator isLoading message="Cargando marcas..." />}

      <section style={{ textAlign: "center", padding: "24px 16px 16px" }}>
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: ".2px",
            color: "var(--theme-text)",
          }}
        >
          Marcas
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
              placeholder="Marca…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ width: "100%" }}
            />

            {/* “+” → va a CreateProductForm */}
            <button
              type="button"
              title="Añadir Marca"
              aria-label="Añadir Marca"
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
              onClick={() => navigate("/dashboard/brands/new")} // ← AQUÍ
            >
              +
            </button>
          </div>
        </div>

        {/* Lista de marcas */}
        <div style={{ marginTop: 18 }}>
          <div
            style={{
              fontWeight: 700,
              marginBottom: 8,
              color: "var(--theme-text)",
              opacity: 0.9,
            }}
          >
            Lista Marcas
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
              padding: "8px 12px",
              background: "var(--color-input-bg)",
              borderRadius: 8,
              marginBottom: 6,
            }}
          >
            <span>Imagen</span>
            <span>Marca</span>
            <span style={{ textAlign: "left" }}>Acciones</span>
          </div>

          <div className="theme-table" style={{ borderRadius: 8 }}>
            {brands.map((brand) => (
              <BrandRow key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
