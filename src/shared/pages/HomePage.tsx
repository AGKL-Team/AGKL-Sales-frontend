import { Link } from "react-router-dom";
import { useAuthStore } from "../../features/auth/hooks/useAuthStore";

export default function HomePage() {
  const { authResponse } = useAuthStore();

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Calculadora IMC</h1>
      <div className="text-center mb-4">Hola, {authResponse?.email}</div>

      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm theme-card">
            <div className="card-body">
              <h5 className="card-title">Nuevo Registro</h5>
              <img src="https://img.icons8.com/?size=100&id=69QPdUHJ1fb4&format=png&color=000000" />
              <p className="card-text">Calculá tu índice de masa corporal.</p>
              <Link to="/imc/calculate" className="btn btn-success">
                Calcular
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm theme-card">
            <div className="card-body">
              <h5 className="card-title">Historial</h5>
              <img src="https://img.icons8.com/?size=100&id=QZmOrGcsX4DO&format=png&color=000000" />
              <p className="card-text">Consultá todos tus registros.</p>
              <Link to="/imc/history" className="btn btn-outline-primary">
                Ver Historial
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm theme-card">
            <div className="card-body">
              <h5 className="card-title">Evolución</h5>
              <img src="https://img.icons8.com/?size=100&id=DAoPjn2XoTUN&format=png&color=000000" />
              <p className="card-text">
                Consultá tu evolución a lo largo del tiempo.
              </p>
              <Link to="/imc/evolution" className="btn btn-danger">
                Ver Evolución
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
