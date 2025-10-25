import React from "react";
import Header from "../components/Header";
import DashboardCard from "../components/dashboard-form";
import type { DashboardCardItem } from "../interfaces/types";

// IMPORTS DE IMÁGENES DESDE src/assets
import imgVentas from "../../../assets/Warehouse Shelf.png";
import imgCatalogo from "../../../assets/catalog.png";
import imgMarcas from "../../../assets/r marca registrada.png";

const dashboardItems: DashboardCardItem[] = [
  {
    id: "products",
    label: "Catalogo",
    href: "/dashboard/products",
    iconUrl: imgCatalogo,
  },
  {
    id: "sales",
    label: "Ventas",
    href: "/dashboard/sales",
    iconUrl: imgVentas,
  },
  {
    id: "brands",
    label: "Marcas",
    href: "/dashboard/brands",
    iconUrl: imgMarcas,
  },
  {
    id: "categories",
    label: "Categorías",
    href: "/dashboard/categories",
    iconUrl: imgMarcas,
  },
  // {
  //   id: "reports",
  //   label: "Reportes",
  //   href: "/dashboard/reports",
  //   iconUrl: imgReportes,
  // },
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
