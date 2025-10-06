//import { useAuthStore } from "../../features/auth/hooks/useAuthStore";
import HomeImage from "../components/HomeImage";


export default function HomePage() {
  //const { authResponse } = useAuthStore();

  return (
    <section className="w-full max-w-xl text-center px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-10">
        Gestión de Ventas
      </h1>

      <HomeImage size={300} className="mx-auto mb-6" />

      <div className="max-w-md w-full mx-auto">
        <a href="/home" className="block">
          <button
            type="button"
            className="
              btn btn-primary mt-3
            "
          >
            Empezar ahora
          </button>
        </a>
      </div>
    </section>
  );
}
