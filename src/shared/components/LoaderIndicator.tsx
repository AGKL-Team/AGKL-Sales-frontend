type LoadingIndicatorProps = {
  isLoading: boolean;
  message?: string;
};

export default function LoadingIndicator({
  isLoading,
  message = "Cargando...",
}: LoadingIndicatorProps) {
  if (!isLoading) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75 gap-2"
      style={{ zIndex: 0 }}
    >
      <div className="spinner-border text-primary" role="status" />
      <span>{message}</span>
    </div>
  );
}
