import React, { useEffect, useState } from "react";
import Header from "../../dashboard/components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { getProductApi, updateProductApi } from "../services/catalog.api";
// import type { CatalogProduct } from "../interfaces/product.interface"; // ← si lo necesitás, dejalo; si no, removelo

type FormState = {
  nombre: string;
  descripcion: string;
  categoria: string;
  marca: string;
  precio: string;              // string para tipeo, se parsea al guardar
  imagenFile: File | null;     // nueva imagen (opcional)
  imagenPreview: string | null; // preview (usa imagenUrl inicial o la nueva)
};

export default function EditProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>({
    nombre: "",
    descripcion: "",
    categoria: "",
    marca: "",
    precio: "",
    imagenFile: null,
    imagenPreview: null,
  });

  useEffect(() => {
    if (!id) return;
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        const p = await getProductApi(id);
        if (cancel) return;
        setForm({
          nombre: p.nombre ?? "",
          descripcion: p.descripcion ?? "",
          categoria: p.categoria ?? "",
          marca: p.marca ?? "",
          precio: String(p.precio ?? ""),
          imagenFile: null,
          imagenPreview: p.imagenUrl || null,
        });
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        alert(msg || "No se pudo cargar el producto");
        navigate("/dashboard/catalogo");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [id, navigate]);

  const setText =
    (k: keyof Omit<FormState, "imagenFile" | "imagenPreview">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setForm((f) => ({ ...f, imagenFile: null, imagenPreview: f.imagenPreview }));
      return;
    }
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, imagenFile: file, imagenPreview: url }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!form.nombre.trim() || !form.marca.trim() || !form.precio.trim()) {
      alert("Completá nombre, marca y precio.");
      return;
    }

    const precioNumber = Number(form.precio.replace(/[^\d]/g, ""));
    try {
      setSaving(true);
      await updateProductApi(id, {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        categoria: form.categoria,
        marca: form.marca.trim(),
        precio: isNaN(precioNumber) ? 0 : precioNumber,
        imagenFile: form.imagenFile ?? undefined,
      });
      navigate("/dashboard/catalogo");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      alert(msg || "No se pudo actualizar el producto");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="theme-responsive" style={{ minHeight: "100vh" }}>
        <Header />
        <div style={{ maxWidth: 720, margin: "40px auto", padding: 18 }}>Cargando…</div>
      </div>
    );
  }

  return (
    <div className="theme-responsive" style={{ minHeight: "100vh" }}>
      <Header />

      <section style={{ textAlign: "center", padding: "24px 16px 16px" }}>
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: ".2px",
            color: "var(--theme-text)",
          }}
        >
          Editar Producto
        </h2>
      </section>

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
          <div style={{ marginBottom: 14 }}>
            <label htmlFor="nombre" style={{ display: "block", fontWeight: 700, marginBottom: 6, color: "var(--theme-text)", opacity: 0.9 }}>
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              placeholder="Nombre…"
              title="Nombre del producto"
              value={form.nombre}
              onChange={setText("nombre")}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label htmlFor="descripcion" style={{ display: "block", fontWeight: 700, marginBottom: 6, color: "var(--theme-text)", opacity: 0.9 }}>
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

          <div style={{ marginBottom: 14 }}>
            <label htmlFor="categoria" style={{ display: "block", fontWeight: 700, marginBottom: 6, color: "var(--theme-text)", opacity: 0.9 }}>
              Categoría
            </label>
            <select
              id="categoria"
              name="categoria"
              title="Categoría del producto"
              value={form.categoria}
              onChange={setText("categoria")}
              style={{ width: "100%" }}
            >
              <option value="">Seleccionar…</option>
              <option value="Electrónica">Electrónica</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Hogar">Hogar</option>
              <option value="Indumentaria">Indumentaria</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label htmlFor="precio" style={{ display: "block", fontWeight: 700, marginBottom: 6, color: "var(--theme-text)", opacity: 0.9 }}>
              Precio
            </label>
            <input
              id="precio"
              name="precio"
              inputMode="numeric"
              placeholder="$ 0"
              title="Precio del producto"
              value={form.precio}
              onChange={setText("precio")}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label htmlFor="marca" style={{ display: "block", fontWeight: 700, marginBottom: 6, color: "var(--theme-text)", opacity: 0.9 }}>
              Marca
            </label>
            <input
              id="marca"
              name="marca"
              placeholder="Marca…"
              title="Marca del producto"
              value={form.marca}
              onChange={setText("marca")}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label htmlFor="imagen" style={{ display: "block", fontWeight: 700, marginBottom: 6, color: "var(--theme-text)", opacity: 0.9 }}>
              Imagen
            </label>
            <input
              id="imagen"
              name="imagen"
              title="Seleccionar nueva imagen"
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
                  alt="Vista previa"
                  style={{ maxWidth: "100%", maxHeight: "100%", display: "block", objectFit: "cover" }}
                />
              ) : (
                <span style={{ opacity: 0.7, color: "var(--theme-text)", fontSize: 12 }}>Sin imagen</span>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={() => navigate("/dashboard/catalogo")}
              style={{
                padding: "8px 14px",
                border: "1px solid var(--color-input-border)",
                borderRadius: 999,
                background: "var(--color-btn-bg)",
                color: "var(--theme-text)",
                fontWeight: 700,
                cursor: "pointer",
              }}
              disabled={saving}
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
                opacity: saving ? 0.8 : 1,
              }}
              disabled={saving}
              title="Guardar cambios"
            >
              {saving ? "Guardando…" : "Guardar"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
