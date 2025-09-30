import ImcForm from "../components/ImcForm";

export function ImcPage() {
  return (
    <div className="container-lg container-md text-center">
      <div className="d-flex justify-content-center flex-column">
        <h1 className="mb-4 text-center">Calculadora de IMC</h1>
        <ImcForm />
      </div>
    </div>
  );
}
