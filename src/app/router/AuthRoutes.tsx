import EmailConfirmationPage from "../../features/auth/pages/EmailConfirmationPage";
import SignInPage from "../../features/auth/pages/log_in_page";
import SignUpPage from "../../features/auth/pages/sign_up_page";
import { AuthLayout } from "../../shared/layouts/AuthLayout";

const AuthRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "log-in", element: <SignInPage /> },
      { path: "sign-up", element: <SignUpPage /> },
      { path: "confirm-email", element: <EmailConfirmationPage /> },
      { path: "email-confirmed", element: <EmailConfirmationPage /> },
    ],
  },
];

export default AuthRoutes;
