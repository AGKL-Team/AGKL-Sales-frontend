import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

const pill: React.CSSProperties = {
  padding: "6px 14px",
  borderRadius: 999,
  border: "1px solid var(--color-btn-border)",
  background: "var(--color-btn-bg)",
  color: "var(--color-btn-text)",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
};

export default function Header() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const onLogOut = () => {
    logout();
    navigate("/redirect");
  };

  return (
    <header
      className="theme-navbar"
      style={{
        border: "1px solid var(--color-input-border)",
        boxShadow: "inset 0 -1px 0 rgba(0,0,0,.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <section style={{ textAlign: "center" }}>
          <h1 style={{ fontWeight: 700, fontSize: 18 }}>
            <a
              href="/redirect"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Gestion de Ventas
            </a>
          </h1>
        </section>

        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...pill, background: "#5b9bd5" }}>
            <a
              style={{ color: "inherit", textDecoration: "none" }}
              href="/dashboard/account"
            >
              Cuenta
            </a>
          </button>
          <button style={{ ...pill, background: "#e57373" }} onClick={onLogOut}>
            Cerrar Sesion
          </button>
        </div>
      </div>
    </header>
  );
}
