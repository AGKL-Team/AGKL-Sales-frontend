import { RouterProvider } from "react-router-dom";
import { router } from "../router/router";

export default function RoutesProvider() {
  return <RouterProvider router={router} />;
}
