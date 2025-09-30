import { Link } from "react-router-dom";
import SignUpForm from "../components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Registrarse</h2>
      <SignUpForm />
      <div className="text-center p-2">
        <p>
          ¿Ya tenés una cuenta? <Link to="/auth/log-in">Iniciá Sesión</Link>
        </p>
      </div>
    </div>
  );
}
