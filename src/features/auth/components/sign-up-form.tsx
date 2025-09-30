import LoadingIndicator from "../../../shared/components/LoaderIndicator";
import { useZodForm } from "../../../shared/hooks/useZodForm";
import { useSignUp } from "../hooks/useSignUp";
import { SignUpSchema, type SignUpData } from "../schemas/sign-up-schema";

export default function SignUpForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useZodForm(SignUpSchema, {
    mode: "all",
  });
  const { signUp, isSigningIn, isSigningUp } = useSignUp();

  const onSubmit = async (data: SignUpData) => {
    await signUp({ ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          placeholder="johndoe@gmail.com"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          {...register("email")}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          placeholder="********"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          {...register("password")}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirmar Contraseña
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="********"
          className={`form-control ${
            errors.confirmPassword ? "is-invalid" : ""
          }`}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <div className="invalid-feedback">
            {errors.confirmPassword.message}
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="height">Altura (m)</label>
        <input
          id="height"
          type="number"
          step="0.01"
          min="0.1"
          max="3"
          placeholder="1.75"
          className={`form-control ${errors.height ? "is-invalid" : ""}`}
          {...register("height")}
        />
        {errors.height && (
          <div className="invalid-feedback">{errors.height.message}</div>
        )}
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSigningIn || isSigningUp}
        >
          {isSigningIn || isSigningUp ? (
            <LoadingIndicator isLoading={isSigningUp} />
          ) : (
            "Registrarse"
          )}
        </button>
      </div>
    </form>
  );
}
