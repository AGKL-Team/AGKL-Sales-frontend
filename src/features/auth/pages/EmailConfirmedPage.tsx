import { Link } from "react-router-dom";

export default function EmailConfirmedPage() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Email Confirmado</h2>
      <p>Tu dirección de correo electrónico ha sido confirmada con éxito.</p>
      <Link to="/auth/log-in">Iniciar sesión</Link>
    </div>
  );
}
