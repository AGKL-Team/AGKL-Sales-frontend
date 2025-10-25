import CreateBrandForm from "../../features/brands/components/CreateBrandForm";
import EditBrand from "../../features/brands/components/editBrand";
import BrandPage from "../../features/brands/pages/BrandPage";
import CreateProductForm from "../../features/catalog/components/CreateProductForm";
import EditProductForm from "../../features/catalog/components/EditProductForm";
import CatalogPage from "../../features/catalog/pages/CatalogPage";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import SalesPage from "../../features/sales/pages/SalesPage";

import CuentaPage from "../../features/dashboard/pages/CuentaPage";

const AdminRoutes = [
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/dashboard/catalogo", element: <CatalogPage /> },
  { path: "/dashboard/catalogo/nuevo", element: <CreateProductForm /> },
  { path: "/dashboard/catalogo/:id/editar", element: <EditProductForm /> },
  { path: "/dashboard/cuenta", element: <CuentaPage /> },
  { path: "/dashboard/ventas", element: <SalesPage /> },
  {path: "/dashboard/marca", element: <BrandPage />},
  {path: "/dashboard/marca/nuevo", element: <CreateBrandForm />},
  {path: "/dashboard/marca/:id/editar", element: <EditBrand />},
];

export default AdminRoutes;
