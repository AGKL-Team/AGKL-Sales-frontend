import React from "react";

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

const Header: React.FC = () => {
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
        <section style={{ textAlign: "left" }}>
          <h1 style={{ fontWeight: 700, fontSize: 18 }}>Gestion Ventas</h1>
        </section>
        

        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...pill, background: "#5b9bd5" }}>Cuenta</button>
          <button style={{ ...pill, background: "#e57373" }}>Cerrar Sesion</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
