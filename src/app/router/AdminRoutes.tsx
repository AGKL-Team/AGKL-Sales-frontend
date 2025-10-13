import React from "react";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import CatalogPage from "../../features/catalog/pages/CatalogPage";
import CreateProductForm from "../../features/catalog/components/CreateProductForm";
import EditProductForm from "../../features/catalog/components/EditProductForm"; 
import CuentaPage from "../../features/dashboard/pages/CuentaPage";

const AdminRoutes = [
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/dashboard/catalogo", element: <CatalogPage /> },
  { path: "/dashboard/catalogo/nuevo", element: <CreateProductForm /> },
  { path: "/dashboard/catalogo/:id/editar", element: <EditProductForm /> },
  { path: "/dashboard/cuenta", element: <CuentaPage /> },
  // ...
];

export default AdminRoutes;
