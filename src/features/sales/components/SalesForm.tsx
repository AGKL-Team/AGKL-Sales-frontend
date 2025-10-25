import React, { useMemo, useState } from "react";
import { useAuthStore } from "../../auth/hooks/useAuthStore";
import type { Sale } from "../interfaces/sales.interface";

type Props = {
  onSubmit: (data: Omit<Sale, "id" | "total">) => void;
  onCancel?: () => void;
  productosDisponibles?: string[]; // ← opcional, default abajo
};

type FormState = {
  fecha: string; // yyyy-mm-dd
  productos: string[]; // múltiples seleccionados
  vendedor: string;
  cliente: string;
};

const DEFAULT_PRODUCTS = [
  "Producto A",
  "Producto B",
  "Producto C",
  "Producto D",
  "Producto E",
];

export default function SalesForm({
  onSubmit,
  onCancel,
  productosDisponibles = DEFAULT_PRODUCTS,
}: Props) {
  const { authResponse } = useAuthStore();
  const [form, setForm] = useState<FormState>({
    fecha: new Date().toISOString().split("T")[0],
    productos: [],
    vendedor: authResponse?.email || "",
    cliente: "",
  });

  const setText =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleProductosChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setForm((prev) => ({ ...prev, productos: selected }));
  };

  const isValid = useMemo(() => {
    return (
      form.fecha.trim().length > 0 &&
      form.productos.length > 0 &&
      form.vendedor.trim().length > 0 &&
      form.cliente.trim().length > 0
    );
  }, [form]);

  const reset = () =>
    setForm({
      fecha: new Date().toISOString().split("T")[0],
      productos: [],
      vendedor: authResponse?.email || "",
      cliente: "",
    });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const payload: Omit<Sale, "id" | "total"> = {
      fecha: form.fecha.trim(),
      productos: form.productos,
      vendedor: form.vendedor.trim(),
      cliente: form.cliente.trim(),
    };

    onSubmit(payload);
    // Si querés dejar el form listo para otra carga:
    reset();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Fecha */}
      <div style={{ marginBottom: 14 }}>
        <label
          htmlFor="fecha"
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
          id="fecha"
          name="fecha"
          type="date"
          value={form.fecha}
          onChange={setText("fecha")}
          style={{ width: "100%" }}
          required
        />
      </div>

      {/* Productos */}
      <div style={{ marginBottom: 14 }}>
        <label
          htmlFor="productos"
          style={{
            display: "block",
            fontWeight: 700,
            marginBottom: 6,
            color: "var(--theme-text)",
            opacity: 0.9,
          }}
        >
          Productos
        </label>
        <select
          id="productos"
          name="productos"
          multiple
          value={form.productos}
          onChange={handleProductosChange}
          style={{ width: "100%", minHeight: 120, padding: 8 }}
          required
        >
          {productosDisponibles.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <small
          style={{
            display: "block",
            marginTop: 4,
            color: "var(--theme-text)",
            opacity: 0.7,
            fontSize: 12,
          }}
        >
          Mantené presionado Ctrl (Windows) o Cmd (Mac) para selección múltiple.
        </small>
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
          name="vendedor"
          placeholder="Ej: Juan Pérez"
          value={form.vendedor}
          onChange={setText("vendedor")}
          style={{ width: "100%" }}
          required
          readOnly={!!authResponse}
        />
      </div>

      {/* Cliente */}
      <div style={{ marginBottom: 18 }}>
        <label
          htmlFor="cliente"
          style={{
            display: "block",
            fontWeight: 700,
            marginBottom: 6,
            color: "var(--theme-text)",
            opacity: 0.9,
          }}
        >
          Cliente
        </label>
        <input
          id="cliente"
          name="cliente"
          placeholder="Ej: María González"
          value={form.cliente}
          onChange={setText("cliente")}
          style={{ width: "100%" }}
          required
        />
      </div>

      {/* Botones */}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={onCancel}
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
          disabled={!isValid}
          style={{
            padding: "8px 14px",
            border: "1px solid var(--color-input-border)",
            borderRadius: 999,
            background: "#5b9bd5",
            color: "#fff",
            fontWeight: 700,
            cursor: isValid ? "pointer" : "not-allowed",
            opacity: isValid ? 1 : 0.6,
          }}
          title="Guardar venta"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
