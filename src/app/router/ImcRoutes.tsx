import AccountPage from "../../features/auth/pages/AccountPage";
import ImcEvolutionPage from "../../features/imc/pages/ImcEvolutionPage";
import ImcHistoryPage from "../../features/imc/pages/ImcHistoryPage";
import { ImcPage } from "../../features/imc/pages/ImcPage";
import ImcLayout from "../../shared/layouts/ImcLayout";
import HomePage from "../../shared/pages/HomePage";

const ImcRoutes = [
  {
    path: "/imc",
    element: <ImcLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "calculate",
        element: <ImcPage />,
      },
      {
        path: "history",
        element: <ImcHistoryPage />,
      },
      {
        path: "evolution",
        element: <ImcEvolutionPage />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
    ],
  },
];

export default ImcRoutes;
