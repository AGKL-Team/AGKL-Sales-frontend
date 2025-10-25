import { createBrowserRouter } from "react-router-dom";
import AdminRoutes from "./AdminRoutes"; // <--- importante
import AuthRoutes from "./AuthRoutes";
import MainRoutes from "./MainRoutes";
import SupportRoutes from "./SupportRoutes";

export const router = createBrowserRouter([
  ...AuthRoutes,
  ...SupportRoutes,
  ...MainRoutes,
  ...AdminRoutes, // <--- importante
]);
