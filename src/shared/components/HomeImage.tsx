import homeimage from "../../assets/Wearing a Cap.png";

export default function HomeImage({
  size = 64,
  className = "",
}: { size?: number; className?: string }) {
  return (
    <img
      src={homeimage}
      alt=""
      style={{ width: size, height: size }}
      className={`object-contain ${className}`}
    />
  );
}
