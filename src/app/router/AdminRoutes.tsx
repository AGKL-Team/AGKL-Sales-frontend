import CreateBrandForm from "../../features/brands/components/CreateBrandForm";
import EditBrand from "../../features/brands/components/editBrand";
import BrandPage from "../../features/brands/pages/BrandPage";
import CreateProductForm from "../../features/catalog/components/CreateProductForm";
import EditProductForm from "../../features/catalog/components/EditProductForm";
import CatalogPage from "../../features/catalog/pages/CatalogPage";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import SalesPage from "../../features/sales/pages/SalesPage";

import CategoriesPage from "../../features/brands/pages/CategoriesPage";
import CuentaPage from "../../features/dashboard/pages/CuentaPage";

const AdminRoutes = [
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/dashboard/products", element: <CatalogPage /> },
  { path: "/dashboard/products/new", element: <CreateProductForm /> },
  { path: "/dashboard/products/:id", element: <EditProductForm /> },
  { path: "/dashboard/account", element: <CuentaPage /> },
  { path: "/dashboard/sales", element: <SalesPage /> },
  { path: "/dashboard/brands", element: <BrandPage /> },
  { path: "/dashboard/brands/new", element: <CreateBrandForm /> },
  { path: "/dashboard/brands/:id", element: <EditBrand /> },
  { path: "/dashboard/categories", element: <CategoriesPage /> },
  {
    path: "/dashboard/categories/:id",
    element: <CategoriesPage />,
  },
];

export default AdminRoutes;
