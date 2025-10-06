import { Link, Outlet } from "react-router-dom";

import ImageBag from "../components/imageBag";
export function AuthLayout() {
  return (
    <div className="d-flex flex-column vh-100 fadeInUp theme-responsive">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom theme-navbar">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              Calculadora IMC
            </Link>
          </div>
        </nav>
      </header>
      <main className="d-flex justify-content-evenly flex-grow-1 m-4 theme-main gap-5">
        <section
          style={{ backgroundColor: "#9cabfdff", borderRadius: 20 }}
          className="d-none d-lg-flex flex-grow-1 align-items-center justify-content-center"
        >
          <ImageBag />
        </section>
        <section
          className="d-flex flex-grow-1 align-items-center justify-content-center"
          style={{
            borderRadius: 20,
            boxShadow: "0 2px 10px 0px var(--color-text)",
          }}
        >
          <Outlet />
        </section>
      </main>
      <footer className="text-center p-3 border-top mt-auto theme-footer">
        &copy; 2025 Calculadora IMC
      </footer>
    </div>
  );
}
