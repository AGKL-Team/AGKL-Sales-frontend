import MainLayout from "../../shared/layouts/MainLayout";
import MainPage from "../../shared/pages/MainPage";

const MainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "", element: <MainPage /> }],
  },
];

export default MainRoutes;
