import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { DashboardCardItem } from "../interfaces/types";

interface DashboardCardProps {
  item: DashboardCardItem;
}

const baseShadow = "0 2px 0 rgba(0,0,0,.08), 0 8px 16px rgba(0,0,0,.06)";
const hoverShadow = "0 3px 0 rgba(0,0,0,.08), 0 12px 22px rgba(0,0,0,.08)";

const DashboardCard: React.FC<DashboardCardProps> = ({ item }) => {
  const [hover, setHover] = useState(false);
  const [broken, setBroken] = useState(false);

  // Log para ver exactamente qué valor llega:
  // (podés quitarlo cuando funcione)
  if (!item.iconUrl) {
    // eslint-disable-next-line no-console
    console.warn(`[DashboardCard] iconUrl vacío para ${item.id}`);
  }

  return (
    <Link
      to={item.href}
      className="theme-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textDecoration: "none",
        color: "inherit",
        background: "var(--theme-bg)",
        border: "1px solid var(--color-input-border)",
        borderRadius: 14,
        boxShadow: hover ? hoverShadow : baseShadow,
        padding: "18px 18px 12px",
        display: "grid",
        placeItems: "center",
        transform: hover ? "translateY(-3px)" : "none",
        transition: "transform .15s ease, box-shadow .15s ease",
      }}
      aria-label={item.label}
    >
      <div
        style={{
          background: "var(--color-result-bg)",
          border: "1px solid var(--color-input-border)",
          borderRadius: 12,
          width: 160,
          height: 140,
          display: "grid",
          placeItems: "center",
          marginBottom: 10,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.10)",
        }}
      >
        {!broken ? (
          <img
            src={item.iconUrl}
            alt={item.label}
            width={96}
            height={96}
            decoding="async"
            style={{ display: "block", objectFit: "contain", maxWidth: 96, maxHeight: 96 }}
            onError={(e) => {
              setBroken(true);
              // eslint-disable-next-line no-console
              console.error(`[DashboardCard] No cargó la imagen: ${item.iconUrl}`, e.currentTarget);
            }}
            onLoad={() => {
              // eslint-disable-next-line no-console
              console.log(`[DashboardCard] OK: ${item.iconUrl}`);
            }}
          />
        ) : (
          // Fallback visible si falla
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 10,
              border: "1px dashed var(--color-input-border)",
              display: "grid",
              placeItems: "center",
              color: "var(--theme-text)",
              opacity: 0.6,
              fontSize: 12,
            }}
            title={item.iconUrl}
          >
            Img no disponible
          </div>
        )}
      </div>

      <p
        style={{
          fontSize: 14,
          color: "var(--theme-text)",
          opacity: 0.9,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {item.label}
      </p>
    </Link>
  );
};

export default DashboardCard;
