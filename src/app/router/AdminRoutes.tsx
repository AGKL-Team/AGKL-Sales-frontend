import React from "react";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import CatalogPage from "../../features/catalog/pages/CatalogPage";
import CreateProductForm from "../../features/catalog/components/CreateProductForm"; // ← NUEVO

const AdminRoutes = [
  { path: "/dashboard", element: <DashboardPage /> },

  // Catálogo
  { path: "/dashboard/catalogo", element: <CatalogPage /> },
  { path: "/dashboard/catalogo/nuevo", element: <CreateProductForm /> }, // ← NUEVO

  // Otras secciones
  { path: "/dashboard/cuenta", element: <div>Cuenta</div> },
  { path: "/dashboard/usuarios", element: <div>Usuarios</div> },
  { path: "/dashboard/ventas", element: <div>Ventas</div> },
  { path: "/dashboard/marcas", element: <div>Marcas</div> },
  { path: "/dashboard/reportes", element: <div>Reportes</div> },
];

export default AdminRoutes;
