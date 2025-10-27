import { Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import LoadingIndicator from "../../../shared/components/LoaderIndicator";
import { useZodForm } from "../../../shared/hooks/useZodForm";
import { useAuthStore } from "../../auth/hooks/useAuthStore";
import { useCatalog } from "../../catalog/hooks/useCatalog";
import { useGetCustomers } from "../hooks/useGetCustomers";
import { useSaveSale } from "../hooks/useSaveSale";
import { CustomerResponse } from "../interfaces/customer-response.interface";
import {
  CreateDetailSaleSchemaType,
  CreateSaleSchema,
  CreateSaleSchemaType,
} from "../schemas/create-sale-schema";

const DEFAULT_SALE_ITEM: CreateDetailSaleSchemaType = {
  product: null,
  quantity: 1,
  unitPrice: 0,
  unitTax: 0,
};

export default function SalesForm() {
  const { authResponse } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useZodForm(CreateSaleSchema, {
    mode: "all",
    defaultValues: {
      date: new Date(),
      sellerEmail: authResponse?.email || "",
      customer: null,
      products: [DEFAULT_SALE_ITEM],
    },
  });

  const { items, isLoading: isLoadingProducts } = useCatalog();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const productOptions = items.map((product) => ({
    label: product.name,
    value: product,
  }));

  const { customers, isLoading: isLoadingCustomers } = useGetCustomers();

  const customerOptions = customers.map((customer: CustomerResponse) => ({
    label: `${customer.lastName}, ${customer.name}`,
    value: customer,
  }));

  const { save, isSaving } = useSaveSale();

  const onSubmit = async (data: CreateSaleSchemaType) => {
    await save({
      customerId: data.customer?.id || 0,
      sellerId: 0,
      products: data.products.map((item) => ({
        productId: item.product?.id || 0,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        unitTax: item.unitTax,
      })),
      totalAmount: totalAmount,
    });
  };

  const watchedProducts = watch("products");

  const totalAmount = (watchedProducts || []).reduce((acumulador, item) => {
    const cantidad = item.quantity || 0;
    const precio = item.unitPrice || 0;
    const impuesto = item.unitTax || 0;

    const subtotalItem = (precio + impuesto) * cantidad;
    return acumulador + subtotalItem;
  }, 0);

  console.log("ERRORES DEL FORMULARIO:", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {(isLoadingProducts || isLoadingCustomers) && (
        <LoadingIndicator
          message="Recuperando Clientes y Productos..."
          isLoading={isLoadingProducts || isLoadingCustomers}
        />
      )}

      {/* Fecha */}
      <div style={{ marginBottom: 14 }}>
        <label
          htmlFor="date"
          style={{
            display: "block",
            fontWeight: 700,
            marginBottom: 6,
            color: "var(--theme-text)",
            opacity: 0.9,
          }}
        >
          Fecha
        </label>
        <input
          id="date"
          type="date"
          {...register("date")}
          style={{ width: "100%" }}
          required
        />
        {errors.date && (
          <div className="invalid-feedback">{errors.date.message}</div>
        )}
      </div>

      {/* Vendedor */}
      <div style={{ marginBottom: 14 }}>
        <label
          htmlFor="vendedor"
          style={{
            display: "block",
            fontWeight: 700,
            marginBottom: 6,
            color: "var(--theme-text)",
            opacity: 0.9,
          }}
        >
          Vendedor
        </label>
        <input
          id="vendedor"
          placeholder="Ej: johndoe@example.com"
          {...register("sellerEmail")}
          style={{ width: "100%" }}
          required
          readOnly={!!authResponse}
        />
        {errors.sellerEmail && (
          <div className="invalid-feedback">{errors.sellerEmail.message}</div>
        )}
      </div>

      {/* Cliente */}
      {/* --- INICIO: SECCIÓN DE CLIENTE (con React-Select) --- */}
      {/* 4. Reemplaza tu <div> de cliente por este */}
      <div className="mb-3">
        <label htmlFor="customer" className="form-label fw-bold">
          Cliente
        </label>
        <Controller
          name="customer" // 5. Bindeamos a 'customer' (el objeto)
          control={control}
          render={({ field, fieldState }) => (
            <Select
              {...field}
              id="customer"
              options={customerOptions}
              isLoading={isLoadingCustomers}
              placeholder="Buscar cliente..."
              // 6. Al cambiar, RHF guarda el objeto 'customer' completo
              onChange={(selectedOption) => {
                field.onChange(selectedOption?.value);
              }}
              // 7. Lógica para mostrar el valor seleccionado
              value={customerOptions.find(
                (opt) => opt.value.id === field.value?.id
              )}
              classNamePrefix="react-select"
              className={fieldState.error ? "is-invalid" : ""}
            />
          )}
        />
        {/* 8. El error ahora viene de 'customer' */}
        {errors.customer && (
          <div className="invalid-feedback d-block">
            {errors.customer.message}
          </div>
        )}
      </div>
      {/* --- FIN: SECCIÓN DE CLIENTE --- */}

      <hr className="my-4" />

      {/* --- INICIO: SECCIÓN DE PRODUCTOS (FieldArray) --- */}
      <h5 className="fw-bold">Productos</h5>

      {/* Iterar sobre los campos del FieldArray */}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="row g-2 mb-2 align-items-end p-2 border rounded"
        >
          {/* Columna: Producto (con react-select) */}
          <div className="col-md-5">
            <label className="form-label" htmlFor={`products.${index}.product`}>
              Producto
            </label>
            {/* Usar <Controller> para integrar react-select */}
            <Controller
              name={`products.${index}.product`}
              control={control}
              render={({ field: controllerField, fieldState }) => (
                <Select
                  {...controllerField}
                  id={`products.${index}.product`}
                  options={productOptions}
                  isLoading={isLoadingProducts}
                  placeholder="Buscar producto..."
                  // Lógica para auto-rellenar campos
                  onChange={(selectedOption) => {
                    console.info(selectedOption);
                    controllerField.onChange(selectedOption?.value);
                    setValue(
                      `products.${index}.unitPrice`,
                      selectedOption?.value.price || 0
                    );
                    setValue(`products.${index}.unitTax`, 0);
                  }}
                  value={productOptions.find(
                    (opt) => opt.value.id === controllerField.value?.id
                  )}
                  // Estilos de Bootstrap para errores
                  classNamePrefix="react-select"
                  className={fieldState.error ? "is-invalid" : ""}
                />
              )}
            />
            {errors.products?.[index]?.product && (
              <div className="invalid-feedback d-block">
                {errors.products[index].product.message}
              </div>
            )}
          </div>

          {/* Columna: Cantidad */}
          <div className="col-md-2">
            <label
              className="form-label"
              htmlFor={`products.${index}.quantity`}
            >
              Cantidad
            </label>
            <input
              type="number"
              id={`products.${index}.quantity`}
              className={`form-control ${
                errors.products?.[index]?.quantity ? "is-invalid" : ""
              }`}
              {...register(`products.${index}.quantity`, {
                valueAsNumber: true,
              })}
            />
            {errors.products?.[index]?.quantity && (
              <div className="invalid-feedback">
                {errors.products[index].quantity.message}
              </div>
            )}
          </div>

          {/* Columna: Precio Unitario */}
          <div className="col-md-2">
            <label
              className="form-label"
              htmlFor={`products.${index}.unitPrice`}
            >
              Precio
            </label>
            <input
              type="number"
              step="0.01"
              id={`products.${index}.unitPrice`}
              className={`form-control ${
                errors.products?.[index]?.unitPrice ? "is-invalid" : ""
              }`}
              {...register(`products.${index}.unitPrice`, {
                valueAsNumber: true,
              })}
              readOnly
            />
            {errors.products?.[index]?.unitPrice && (
              <div className="invalid-feedback">
                {errors.products[index].unitPrice.message}
              </div>
            )}
          </div>

          {/* Columna: Impuesto Unitario */}
          <div className="col-md-2">
            <label className="form-label" htmlFor={`products.${index}.unitTax`}>
              Impuesto
            </label>
            <input
              type="number"
              step="0.01"
              id={`products.${index}.unitTax`}
              className={`form-control ${
                errors.products?.[index]?.unitTax ? "is-invalid" : ""
              }`}
              {...register(`products.${index}.unitTax`, {
                valueAsNumber: true,
              })}
            />
          </div>

          {/* Columna: Botón Eliminar */}
          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => remove(index)} // 12. Handler para eliminar
              title="Quitar producto"
            >
              &times;
            </button>
          </div>
        </div>
      ))}

      {/* Botón para agregar nuevo producto */}
      <button
        type="button"
        className="btn btn-outline-primary btn-sm mt-2"
        onClick={() => append(DEFAULT_SALE_ITEM)} // 13. Handler para agregar
      >
        + Agregar Producto
      </button>

      {/* Error general del array de productos (ej: "debe tener al menos 1") */}
      {errors.products?.root && (
        <div className="invalid-feedback d-block mt-2">
          {errors.products.root.message}
        </div>
      )}

      <div className="col-md-2 mt-4">
        <strong>Total: </strong>
        <span>
          {totalAmount.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      {/* --- FIN: SECCIÓN DE PRODUCTOS --- */}

      <hr className="my-4" />

      {/* Botones */}
      <div className="d-flex gap-2 justify-content-end">
        <button
          type="button"
          className="btn btn-light rounded-pill px-3"
          title="Cancelar y volver"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isSaving} // Deshabilitar si no es válido o está guardando
          className="btn btn-primary rounded-pill px-3"
          title="Guardar venta"
        >
          {isSaving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}
