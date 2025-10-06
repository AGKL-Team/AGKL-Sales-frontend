import imagebag from "../../assets/Shopping bag.png";

export default function imageBag({
  size = 350,
  className = "",
}: { size?: number; className?: string }) {
  return (
    <img
      src={imagebag}
      alt=""
      style={{ width: size, height: size }}
      className={`object-contain ${className}`}
    />
  );
}
