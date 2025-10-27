import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "sonner";
import LoadingIndicator from "../../../shared/components/LoaderIndicator";
import { useZodForm } from "../../../shared/hooks/useZodForm";
import { useGetBrandCategories } from "../../brands/hooks/useGetBrandCategories";
import { useGetBrands } from "../../brands/hooks/useGetBrands";
import { BrandResponse } from "../../brands/interfaces/brand-response.interface";
import { CategoryResponse } from "../../brands/interfaces/category-response.interface";
import Header from "../../dashboard/components/Header";
import { useSaveProduct } from "../hooks/useSaveProduct";
import { CreateProductRequest } from "../interfaces/create-product-request.interface";
import {
  CreateProductSchema,
  CreateProductSchemaType,
} from "../schemas/create-product-schema";

export default function CreateProductForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useZodForm(CreateProductSchema, {
    mode: "all",
  });

  const { brands, isLoading: isLoadingBrands } = useGetBrands();

  const brandOptions = brands.map((brand) => ({
    label: brand.name,
    value: brand,
  }));

  const [brandSelected, setBrandSelected] = useState<BrandResponse | null>(
    null
  );
  const { categories, isLoading: isLoadingBrandCategories } =
    useGetBrandCategories(brandSelected?.id || 0, false);

  const categoriesOptions = categories.map((category) => ({
    label: category.name,
    value: category,
  }));

  const [categorySelected, setCategorySelected] =
    useState<CategoryResponse | null>(null);

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { save } = useSaveProduct();

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setImage(null);
      setImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setImage(file);
    setImagePreview(url);
  };

  const onSubmit = async (data: CreateProductSchemaType) => {
    if (!brandSelected) {
      toast.error("Por favor, selecciona una marca para el producto.");
      return;
    }
    if (!image) {
      toast.error("Por favor, selecciona una imagen para el producto.");
      return;
    }

    const request: CreateProductRequest = {
      name: data.name,
      description: data.description ?? "",
      brand: brandSelected,
      category: categorySelected ?? undefined,
      price: data.price,
      images: [image],
    };

    await save(request);
  };

  useEffect(() => {
    if (brandSelected === null) {
      return;
    }
  }, [brandSelected]);

  return (
    <div className="theme-responsive" style={{ minHeight: "100vh" }}>
      <Header />

      {/* Título */}
      <section style={{ textAlign: "center", padding: "24px 16px 16px" }}>
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: ".2px",
            color: "var(--theme-text)",
          }}
        >
          Nuevo Producto
        </h2>
      </section>

      {(isLoadingBrands || isLoadingBrandCategories) && (
        <LoadingIndicator
          isLoading={isLoadingBrands || isLoadingBrandCategories}
          message="Cargando datos..."
        />
      )}

      {/* Card del formulario */}
      <section
        className="theme-card"
        style={{
          maxWidth: 720,
          margin: "0 auto 28px",
          padding: 18,
          borderRadius: 14,
          boxShadow: "0 2px 0 rgba(0,0,0,.08), 0 8px 16px rgba(0,0,0,.06)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Nombre */}
          <div style={{ marginBottom: 14 }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                fontWeight: 700,
                marginBottom: 6,
                color: "var(--theme-text)",
                opacity: 0.9,
              }}
            >
              Nombre
            </label>
            <input
              id="name"
              placeholder="Ej: Producto 6"
              title="Nombre del producto"
              {...register("name")}
              style={{ width: "100%" }}
            />
            {errors.name && (
              <div className="invalid-feedback d-block">
                {errors.name.message}
              </div>
            )}
          </div>

          {/* Descripción */}
          <div style={{ marginBottom: 14 }}>
            <label
              htmlFor="description"
              style={{
                display: "block",
                fontWeight: 700,
                marginBottom: 6,
                color: "var(--theme-text)",
                opacity: 0.9,
              }}
            >
              Descripción
            </label>
            <textarea
              id="description"
              placeholder="Detalle del producto…"
              title="Descripción del producto"
              {...register("description")}
              rows={3}
              style={{ width: "100%", resize: "vertical" }}
            />
            {errors.description && (
              <div className="invalid-feedback d-block">
                {errors.description.message}
              </div>
            )}
          </div>

          {/* Marca */}
          <div style={{ marginBottom: 14 }}>
            <label
              htmlFor="brand"
              style={{
                display: "block",
                fontWeight: 700,
                marginBottom: 6,
                color: "var(--theme-text)",
                opacity: 0.9,
              }}
            >
              Marca
            </label>
            <Controller
              name="brand"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  id="brand"
                  options={brandOptions}
                  isLoading={isLoadingBrands}
                  placeholder="Seleccione una Marca:"
                  onChange={(selectedOption) => {
                    // --- CAMBIO AQUÍ ---
                    // Guarda solo el objeto BrandResponse (o null si se deselecciona)
                    const brandValue = selectedOption
                      ? selectedOption.value
                      : null;
                    field.onChange(brandValue);
                    // ------------------

                    setBrandSelected(
                      brandValue ? (brandValue as BrandResponse) : null
                    );

                    // Reset category when brand changes
                    setCategorySelected(null);
                    setValue("category", null);
                  }}
                  value={brandOptions.find(
                    (opt) => opt.value.id === field.value?.id
                  )}
                  classNamePrefix={"react-select"}
                  className={fieldState.error ? "is-invalid" : ""}
                />
              )}
            />
            {errors.brand && (
              <div className="invalid-feedback d-block">
                {errors.brand.message}
              </div>
            )}
          </div>

          {/* Categoría */}
          <div style={{ marginBottom: 14 }}>
            <label
              htmlFor="category"
              style={{
                display: "block",
                fontWeight: 700,
                marginBottom: 6,
                color: "var(--theme-text)",
                opacity: 0.9,
              }}
            >
              Categoría
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  id="category"
                  options={categoriesOptions}
                  isLoading={isLoadingBrandCategories}
                  placeholder="Seleccione una Categoría:"
                  onChange={(selectedOption) => {
                    // --- CAMBIO AQUÍ ---
                    const categoryValue = selectedOption
                      ? selectedOption.value
                      : null;
                    field.onChange(categoryValue);
                    // ------------------

                    setCategorySelected(
                      categoryValue ? (categoryValue as CategoryResponse) : null
                    );
                  }}
                  value={categoriesOptions.find(
                    (opt) => opt.value.id === field.value?.id
                  )}
                  classNamePrefix={"react-select"}
                  className={fieldState.error ? "is-invalid" : ""}
                />
              )}
            />
            {errors.category && (
              <div className="invalid-feedback d-block">
                {errors.category.message}
              </div>
            )}
          </div>

          {/* Precio */}
          <div style={{ marginBottom: 14 }}>
            <label
              htmlFor="price"
              style={{
                display: "block",
                fontWeight: 700,
                marginBottom: 6,
                color: "var(--theme-text)",
                opacity: 0.9,
              }}
            >
              Precio
            </label>
            <input
              id="price"
              inputMode="numeric"
              placeholder="$ 0"
              title="Precio del producto"
              {...register("price")}
              style={{ width: "100%" }}
            />
            {errors.price && (
              <div className="invalid-feedback d-block">
                {errors.price.message}
              </div>
            )}
          </div>

          {/* Imagen */}
          <div style={{ marginBottom: 18 }}>
            <label
              htmlFor="imagen"
              style={{
                display: "block",
                fontWeight: 700,
                marginBottom: 6,
                color: "var(--theme-text)",
                opacity: 0.9,
              }}
            >
              Imagen
            </label>
            <input
              id="imagen"
              name="imagen"
              title="Seleccionar imagen"
              type="file"
              accept="image/*"
              onChange={onPickImage}
            />
            {!image && (
              <div className="invalid-feedback d-block">
                Por favor, selecciona una imagen para el producto.
              </div>
            )}
            <div
              style={{
                marginTop: 10,
                width: 160,
                height: 110,
                borderRadius: 8,
                border: "1px solid var(--color-input-border)",
                background: "var(--color-result-bg)",
                display: "grid",
                placeItems: "center",
                overflow: "hidden",
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Vista previa de la imagen seleccionada"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span
                  style={{
                    opacity: 0.7,
                    color: "var(--theme-text)",
                    fontSize: 12,
                  }}
                >
                  Sin imagen
                </span>
              )}
            </div>
          </div>

          {/* Botones */}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={() => navigate("/dashboard/products")}
              style={{
                padding: "8px 14px",
                border: "1px solid var(--color-input-border)",
                borderRadius: 999,
                background: "var(--color-btn-bg)",
                color: "var(--theme-text)",
                fontWeight: 700,
                cursor: "pointer",
              }}
              title="Cancelar y volver"
            >
              Cancelar
            </button>

            <button
              type="submit"
              style={{
                padding: "8px 14px",
                border: "1px solid var(--color-input-border)",
                borderRadius: 999,
                background: "#5b9bd5",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
              title="Guardar producto"
            >
              Guardar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
