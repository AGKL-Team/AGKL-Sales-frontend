import { Link } from "react-router-dom";
import LogInForm from "../components/log-in-form";

export default function SignInPage() {
  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Iniciar Sesión</h2>
      <LogInForm />
      <div className="text-center p-2">
        <p>
          ¿Todavía no tenés cuenta? <Link to="/auth/sign-up">Creá una</Link>
        </p>
      </div>
    </div>
  );
}
