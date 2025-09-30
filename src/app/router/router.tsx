import { createBrowserRouter } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import ImcRoutes from "./ImcRoutes";
import MainRoutes from "./MainRoutes";
import SupportRoutes from "./SupportRoutes";

export const router = createBrowserRouter([
  ...AuthRoutes,
  ...SupportRoutes,
  ...ImcRoutes,
  ...MainRoutes,
]);
