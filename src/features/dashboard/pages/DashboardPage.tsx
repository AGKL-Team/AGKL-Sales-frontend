import React from "react";
import Header from "../components/Header";
import DashboardCard from "../components/dashboard-form";
import type { DashboardCardItem } from "../interfaces/types";

// IMPORTS DE IMÁGENES DESDE src/assets (sin espacios/Mayúsculas)
import imgCatalogo from "../../../assets/catalog.png";
import imgCuenta from "../../../assets/user.png";
import imgUsuarios from "../../../assets/contact.png";
import imgVentas from "../../../assets/Warehouse Shelf.png";
import imgMarcas from "../../../assets/r marca registrada.png";
import imgReportes from "../../../assets/Data Scientist.png";

const dashboardItems: DashboardCardItem[] = [
  { id: "catalogo", label: "Catalogo", href: "/dashboard/catalogo", iconUrl: imgCatalogo },
  { id: "cuenta",   label: "Cuenta",   href: "/dashboard/cuenta",   iconUrl: imgCuenta },
  { id: "usuarios", label: "Usuarios", href: "/dashboard/usuarios", iconUrl: imgUsuarios },
  { id: "ventas",   label: "Ventas",   href: "/dashboard/ventas",   iconUrl: imgVentas },
  { id: "marcas",   label: "Marcas",   href: "/dashboard/marcas",   iconUrl: imgMarcas },
  { id: "reportes", label: "Reportes", href: "/dashboard/reportes", iconUrl: imgReportes },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="theme-responsive" style={{ minHeight: "100vh" }}>
      <Header />

      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "28px 16px 16px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: ".3px",
            color: "var(--theme-text)",
          }}
        >
          Gestión de Ventas
        </h2>
      </section>

      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto 28px",
          padding: "0 16px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 22,
        }}
      >
        {dashboardItems.map((item) => (
          <DashboardCard key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
};

export default DashboardPage;
