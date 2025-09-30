import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Calculadora de IMC</h1>
      <div className="text-center mb-4">
        <h4 className="text-secondary">
          La forma más simple y rápida de conocer tu Índice de Masa Corporal
        </h4>
        <p className="mt-3">
          Descubrí tu estado nutricional ingresando tu peso y altura. La
          calculadora te ayuda a identificar si estás en un rango saludable y te
          orienta para cuidar tu bienestar.
        </p>
      </div>

      <div className="row text-center">
        <div className="col-md-6 mb-4">
          <img
            src="https://img.icons8.com/?size=100&id=492ILERveW8G&format=png&color=000000"
            alt="usuarios"
          />
          <h5 className="mt-3">Para usuarios</h5>
          <p>
            Ingresá tus datos básicos y obtené tu IMC en segundos. Guardá tus
            resultados y hacé un seguimiento de tu evolución de forma práctica y
            sencilla.
          </p>
        </div>
        <div className="col-md-6 mb-4">
          <img
            src="https://img.icons8.com/?size=100&id=9shlfoGKqCS7&format=png&color=000000"
            alt="salud"
          />
          <h5 className="mt-3">Para profesionales</h5>
          <p>
            Utilizá la herramienta como apoyo en tus consultas. Mostrá
            resultados claros a tus pacientes y ayudalos a comprender mejor su
            estado de salud.
          </p>
        </div>
      </div>

      <div className="text-center mt-4">
        <Link to="/auth/log-in" className="btn btn-primary btn-lg">
          Empezar ahora
        </Link>
      </div>
    </div>
  );
}
