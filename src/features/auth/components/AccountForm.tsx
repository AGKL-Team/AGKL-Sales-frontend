import LoadingIndicator from "../../../shared/components/LoaderIndicator";
import { useZodForm } from "../../../shared/hooks/useZodForm";
import { useAccountForm } from "../hooks/useAccountForm";
import { useAuthStore } from "../hooks/useAuthStore";
import { AccountSchema, AccountSchemaType } from "../schemas/account-schema";

export default function AccountForm() {
  const { authResponse, setAuthResponse } = useAuthStore();
  const { disableEditing, enableEditing, state, isPending, update } =
    useAccountForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useZodForm(AccountSchema, {
    mode: "all",
  });

  const onSubmit = async (data: AccountSchemaType) => {
    await update(data.height);
    if (authResponse) {
      setAuthResponse({
        ...authResponse,
        height: data.height,
      });
    }
  };

  return (
    <>
      {isPending && (
        <LoadingIndicator isLoading message="Actualizando Altura..." />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto"
        style={{ maxWidth: 400 }}
      >
        <div className="mb-3">
          <label htmlFor="height" className="form-label">
            Altura (m):
          </label>
          <input
            id="height"
            type="number"
            step="0.01"
            min={0.1}
            max={3}
            className={`form-control ${errors.height ? "is-invalid" : ""}`}
            {...register("height")}
            defaultValue={authResponse?.height || ""}
            readOnly={state === "readonly"}
          />
          {errors.height && (
            <div className="invalid-feedback">{errors.height.message}</div>
          )}
        </div>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={() => {
              if (state === "readonly") {
                enableEditing();
              } else {
                handleSubmit(onSubmit)();
                disableEditing();
              }
            }}
            disabled={isPending}
          >
            {isPending
              ? "Guardando..."
              : state === "editing"
              ? "Guardar"
              : "Editar"}
          </button>
        </div>
      </form>
    </>
  );
}
