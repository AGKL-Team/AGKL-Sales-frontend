import { Link, Outlet } from "react-router-dom";
import "../../app/global.css";

export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 theme-responsive">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom theme-navbar">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              Gestión de Ventas
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/auth/log-in" className="btn btn-outline-primary">
                    Log In
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="container-fluid theme-main" style={{ padding: 20 }}>
        <Outlet />
      </main>

      <footer className="text-center p-3 border-top mt-auto theme-footer">
        &copy; 2025 - AGKL Team
      </footer>
    </div>
  );
}
