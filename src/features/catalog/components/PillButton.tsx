import React from "react";

type Props = {
  color: "blue" | "red";
  label: string;
  onClick?: () => void;
};

const stylesByColor: Record<Props["color"], React.CSSProperties> = {
  blue: { background: "#5b9bd5" },
  red:  { background: "#e57373" },
};

export default function PillButton({ color, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        border: "1px solid rgba(0,0,0,.10)",
        color: "#fff",
        fontWeight: 700,
        fontSize: 12,
        cursor: "pointer",
        ...stylesByColor[color],
      }}
      onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.06)")}
      onMouseLeave={e => (e.currentTarget.style.filter = "none")}
    >
      {label}
    </button>
  );
}
