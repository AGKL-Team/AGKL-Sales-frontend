import Header from "../../dashboard/components/Header";
import SalesForm from "../components/SalesForm"; // ← Case correcto

export default function SalesPage() {
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
          Ventas
        </h2>
      </section>

      <section
        className="theme-card"
        style={{
          maxWidth: 720,
          margin: "0 auto 28px",
          padding: 18,
          borderRadius: 14,
          boxShadow: "0 2px 0 rgba(0,0,0,.08), 0 8px 16px rgba(0,0,0,.06)",
        }}
      >
        <SalesForm />
      </section>
    </div>
  );
}
