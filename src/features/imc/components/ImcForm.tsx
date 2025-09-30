import LoadingIndicator from "../../../shared/components/LoaderIndicator";
import { useZodForm } from "../../../shared/hooks/useZodForm";
import { useAuthStore } from "../../auth/hooks/useAuthStore";
import { useCalculateImc } from "../hooks/useCalculateImc";
import { CalculateImcSchema } from "../schemas/calculate-imc.schema";

export default function ImcForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useZodForm(CalculateImcSchema, {
    mode: "all",
  });
  const { authResponse } = useAuthStore();
  const { calculateImc, isPending, imcResponse } = useCalculateImc();

  const onSubmit = (formData: CalculateImcSchema) => {
    calculateImc(formData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label" htmlFor="height">
            Altura (m)
          </label>
          <input
            id="height"
            type="number"
            step={"0.01"}
            min="0.1"
            max="3"
            className={`form-control${errors.height ? " is-invalid" : ""}`}
            {...register("height")}
            defaultValue={authResponse!.height}
            readOnly={!!authResponse?.height}
          />
          {errors.height && (
            <div className="invalid-feedback">{errors.height.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="weight">
            Peso (kg)
          </label>
          <input
            id="weight"
            type="number"
            min="1"
            max="500"
            step={"0.1"}
            className={`form-control${errors.weight ? " is-invalid" : ""}`}
            {...register("weight")}
          />
          {errors.weight && (
            <div className="invalid-feedback">{errors.weight.message}</div>
          )}
        </div>
        <button className="btn btn-primary" type="submit" disabled={isPending}>
          {isPending ? (
            <LoadingIndicator isLoading={isPending} message="Calculando..." />
          ) : (
            "Calcular"
          )}
        </button>
      </form>

      {imcResponse && (
        <div className="alert alert-info mt-4 shadow-sm rounded text-center">
          <h5 className="mb-2">Resultado</h5>
          <p className="mb-1">
            <strong>IMC:</strong> {imcResponse.imc.toFixed(2)}
          </p>
          <p className="mb-0">
            <strong>Categoría:</strong> {imcResponse.category}
          </p>
        </div>
      )}
    </div>
  );
}
