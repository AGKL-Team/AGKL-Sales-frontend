import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import LoadingIndicator from "../../../shared/components/LoaderIndicator";
import Header from "../../dashboard/components/Header";
import { useGetSales } from "../hooks/useGetSales";
import { useSaleFilters } from "../hooks/useSaleFilters";

export default function ReportsPage() {
  const {
    filters,
    toggleProductFilter,
    toggleBrandFilter,
    setStartDate,
    setEndDate,
  } = useSaleFilters();

  const { sales: allSales, isLoading } = useGetSales();

  const filteredSales = useMemo(() => {
    if (!allSales) return [];

    // Asumo que si las fechas son nulas, no se filtra
    const { startDate, endDate } = filters;

    if (!startDate && !endDate) {
      return allSales; // Sin filtro de fecha, devuelve todo
    }

    return allSales.filter((sale) => {
      const saleDate = new Date(sale.date);

      if (startDate && saleDate < startDate) {
        return false;
      }
      if (endDate && saleDate > endDate) {
        return false;
      }

      return true;
    });
  }, [allSales, filters]);

  const salesByDate = useMemo(() => {
    const salesMap = new Map<string, number>();
    for (const sale of filteredSales) {
      const saleDate = new Date(sale.date).toISOString().split("T")[0];
      const totalAmount = sale.products.reduce(
        (acc, p) => acc + (p.quantity ?? 0) * (p.unitPrice ?? 0),
        0
      );
      const existingTotal = salesMap.get(saleDate) || 0;
      salesMap.set(saleDate, existingTotal + totalAmount);
    }
    return Array.from(salesMap.entries())
      .map(([name, totalAmount]) => ({ name, totalAmount })) // 'name' es la fecha
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredSales]);

  const salesByProduct = useMemo(() => {
    const salesMap = new Map<string, number>();
    for (const sale of filteredSales) {
      for (const item of sale.products) {
        const productName = item.product?.name || "Desconocido";
        const totalAmount = (item.quantity ?? 0) * (item.unitPrice ?? 0);
        const existingTotal = salesMap.get(productName) || 0;
        salesMap.set(productName, existingTotal + totalAmount);
      }
    }
    return Array.from(salesMap.entries())
      .map(([name, totalAmount]) => ({ name, totalAmount }))
      .sort((a, b) => b.totalAmount - a.totalAmount);
  }, [filteredSales]);

  const salesByBrand = useMemo(() => {
    // ... (lógica idéntica, agrupando por item.product?.brand?.name)
    const salesMap = new Map<string, number>();
    for (const sale of filteredSales) {
      for (const item of sale.products) {
        const brandName = item.product?.brand?.name || "Desconocida";
        const totalAmount = (item.quantity ?? 0) * (item.unitPrice ?? 0);
        const existingTotal = salesMap.get(brandName) || 0;
        salesMap.set(brandName, existingTotal + totalAmount);
      }
    }
    return Array.from(salesMap.entries())
      .map(([name, totalAmount]) => ({ name, totalAmount }))
      .sort((a, b) => b.totalAmount - a.totalAmount);
  }, [filteredSales]);

  const chartData = useMemo(() => {
    if (filters.byProducts) {
      return salesByProduct;
    }
    if (filters.byBrands) {
      return salesByBrand;
    }
    return salesByDate;
  }, [filters, salesByDate, salesByProduct, salesByBrand]);

  // 5. SELECCIÓN DE TÍTULO
  const chartTitle = useMemo(() => {
    if (filters.byProducts) {
      return "Ventas por Producto";
    }
    if (filters.byBrands) {
      return "Ventas por Marca";
    }
    return "Ventas por Fecha";
  }, [filters]);

  const totalFilteredAmount = useMemo(() => {
    const total = chartData.reduce((acc, item) => acc + item.totalAmount, 0);
    return total.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  }, [chartData]);

  const handleDateChange = (
    value: string,
    setter: (date: Date | null) => void,
    isEndDate: boolean = false
  ) => {
    if (!value) {
      setter(null);
      return;
    }
    // Añadimos T00:00:00 o T23:59:59 para forzar la zona horaria local
    // y evitar el bug de medianoche UTC
    const dateStr = isEndDate ? `${value}T23:59:59` : `${value}T00:00:00`;
    setter(new Date(dateStr));
  };

  return (
    <div className="theme-responsive" style={{ minHeight: "100vh" }}>
      <Header />

      {isLoading && (
        <LoadingIndicator isLoading message="Recuperando Ventas..." />
      )}

      <section style={{ textAlign: "center", padding: "24px 16px 16px" }}>
        <h2>Reportes</h2>
      </section>

      <section
        className="theme-card"
        style={{
          maxWidth: 920,
          margin: "0 auto 28px",
          padding: 18,
          borderRadius: 14,
          boxShadow: "0 2px 0 rgba(0,0,0,.08), 0 8px 16px rgba(0,0,0,.06)",
        }}
      >
        <div className="alert alert-secondary mb-4">
          <h4>Filtros</h4>

          <div className="mb-3 gap-2 d-flex align-items-center">
            <label htmlFor="byProducts">Filtrar por Productos</label>
            <input
              type="checkbox"
              id="byProducts"
              checked={filters.byProducts}
              onChange={toggleProductFilter}
            />
          </div>

          <div className="mb-3 gap-2 d-flex align-items-center">
            <label htmlFor="byBrands">Filtrar por Marcas</label>
            <input
              type="checkbox"
              id="byBrands"
              checked={filters.byBrands}
              onChange={toggleBrandFilter}
            />
          </div>

          <div className="mb-3 ">
            <label htmlFor="startDate">Fecha Inicio</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={filters.startDate?.toISOString().split("T")[0] || ""}
              onChange={(e) =>
                handleDateChange(e.target.value, setStartDate, false)
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="endDate">Fecha Fin</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={filters.endDate?.toISOString().split("T")[0] || ""}
              onChange={(e) =>
                handleDateChange(e.target.value, setEndDate, true)
              }
            />
          </div>
        </div>

        <div className="alert alert-info">
          <h4>Información de Ventas</h4>
          <div className="mb-3">
            <input
              readOnly
              className="form-control"
              value={`Total Ventas: ${filteredSales.length}`}
            />
          </div>
          <div className="mb-3">
            <input
              readOnly
              className="form-control"
              value={`Total Importe: ${totalFilteredAmount}`}
            />
          </div>
        </div>

        {/* --- INICIO: REPORTE DINÁMICO --- */}
        <section style={{ textAlign: "center", padding: "24px 16px 16px" }}>
          <h2>{chartTitle}</h2>
        </section>

        <section className="theme-card">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
              data={chartData} // 👈 Usa los datos seleccionados
            >
              <CartesianGrid strokeDasharray="3 3" />
              {/* 'name' es el dataKey unificado (fecha, producto, o marca) */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) =>
                  value.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })
                }
              />
              <Legend />
              <Bar dataKey="totalAmount" fill="#8884d8" name="Total Vendido" />
            </BarChart>
          </ResponsiveContainer>
        </section>
        {/* --- FIN: REPORTE DINÁMICO --- */}
      </section>
    </div>
  );
}
