import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/hooks/useAuthStore";

export default function ImcLayout() {
  const { isAuthenticated, authResponse, logout } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column vh-100 theme-responsive">
      <header>
        <nav className="navbar navbar-expand-lg border-bottom theme-navbar">
          <div className="container-fluid">
            <Link to="/imc" className="navbar-brand">
              Calculadora IMC
            </Link>
            {/* Botón toggler para menú hamburguesa */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/imc/calculate" className="nav-link">
                    Calcular IMC
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/imc/history" className="nav-link">
                    Historial
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/imc/evolution" className="nav-link">
                    Evolución
                  </Link>
                </li>
              </ul>

              {/* Botón de cuenta si autenticado */}
              {isAuthenticated && authResponse && (
                <div className="d-flex align-items-center m-3">
                  <Link to="/imc/account" className="btn btn-outline-primary">
                    <img
                      src="https://img.icons8.com/?size=100&id=492ILERveW8G&format=png&color=000000"
                      alt="usuario"
                      style={{
                        marginRight: "8px",
                        width: "20px",
                        height: "20px",
                        marginBottom: "3px",
                      }}
                    />
                    Cuenta
                  </Link>
                </div>
              )}

              {/* Botón para cerrar sesión */}
              {isAuthenticated && (
                <div className="d-flex align-items-center m-3">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      logout();
                      navigate("/redirect");
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className="d-flex justify-content-evenly flex-grow-1 flex-column theme-main">
        <Outlet />
      </main>
      <footer className="text-center p-3 border-top mt-auto theme-footer">
        &copy; 2025 AGKL Team
      </footer>
    </div>
  );
}
