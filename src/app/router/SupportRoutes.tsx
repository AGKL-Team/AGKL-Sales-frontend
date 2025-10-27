import NotFoundPage from "../../shared/pages/NotFoundPage";
import RedirectTo from "./RedirectTo";

const SupportRoutes = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/redirect",
    element: <RedirectTo />,
  },
];
  
export default SupportRoutes;
