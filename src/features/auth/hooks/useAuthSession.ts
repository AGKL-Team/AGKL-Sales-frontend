import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./useAuthStore";

export const useAuthSession = () => {
  const { authResponse, isAuthenticated, logout, setIsAuthenticated } =
    useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !authResponse?.expires_in) return;

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        logout();
        setIsAuthenticated(false);
      }
      navigate("/redirect");
    }, authResponse.expires_in);

    return () => clearTimeout(timer);
  }, [
    authResponse?.expires_in,
    isAuthenticated,
    logout,
    setIsAuthenticated,
    navigate,
  ]);
};
