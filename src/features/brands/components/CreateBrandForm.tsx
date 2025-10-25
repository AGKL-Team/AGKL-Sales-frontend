import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "../../dashboard/components/Header";
import { useSaveBrand } from "../hooks/useSaveBrand";
import { CreateBrandRequest } from "../interfaces/create-brand-request.interface";

type FormState = {
  nombre: string;
  descripcion: string;
  imagenFile: File | null;
  imagenPreview: string | null; // para ver la imagen antes de subir
};

export default function CreateBrandForm() {
  const navigate = useNavigate();

  const { isPending, save } = useSaveBrand();

  const [form, setForm] = useState<FormState>({
    nombre: "",
    descripcion: "",
    imagenFile: null,
    imagenPreview: null,
  });

  const setText =
    (k: keyof Omit<FormState, "imagenFile" | "imagenPreview">) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setForm((f) => ({ ...f, imagenFile: null, imagenPreview: null }));
      return;
    }
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, imagenFile: file, imagenPreview: url }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.imagenFile) {
      toast.error("Indique un nombre y una imagen");
      // alert("Completá nombre e indica una imagen.");
      return;
    }

    const payload: CreateBrandRequest = {
      name: form.nombre.trim(),
      description: form.descripcion.trim(),
      image: form.imagenFile!, // acá después pondrás la URL devuelta por el backend
    };

    await save(payload);
  };

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
          Nueva Marca
        </h2>
      </section>

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
        <form onSubmit={onSubmit} noValidate>
          {/* Nombre */}
          <div style={{ marginBottom: 14 }}>
            <label
              htmlFor="nombre"
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
              id="nombre"
              name="nombre"
              placeholder="Ej: Producto 6"
              title="Nombre del producto"
              value={form.nombre}
              onChange={setText("nombre")}
              style={{ width: "100%" }}
            />
          </div>

          {/* Descripción */}
          <div style={{ marginBottom: 14 }}>
            <label
              htmlFor="descripcion"
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
              id="descripcion"
              name="descripcion"
              placeholder="Detalle del producto…"
              title="Descripción del producto"
              value={form.descripcion}
              onChange={setText("descripcion")}
              rows={3}
              style={{ width: "100%", resize: "vertical" }}
            />
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
              {form.imagenPreview ? (
                <img
                  src={form.imagenPreview}
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
              disabled={isPending}
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
              disabled={isPending}
            >
              Guardar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
