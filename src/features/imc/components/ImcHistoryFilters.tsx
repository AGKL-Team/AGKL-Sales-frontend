import { ImcFiltersSchema } from "../schemas/imc-history-filters.schema";

interface ImcFiltersProps {
  filters: ImcFiltersSchema;
  setFilters: (filters: ImcFiltersSchema) => void;
}

export default function ImcFilters({ filters, setFilters }: ImcFiltersProps) {
  return (
    <div id="filters" className="container card p-3 mb-4 theme-card">
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="dateFrom" className="form-label">
            Fecha Desde:
          </label>
          <input
            type="date"
            id="dateFrom"
            className="form-control"
            value={filters.dateFrom ?? ""}
            onChange={(e) =>
              setFilters({ ...filters, dateFrom: e.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="dateTo" className="form-label">
            Fecha Hasta:
          </label>
          <input
            type="date"
            id="dateTo"
            className="form-control"
            value={filters.dateTo ?? ""}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
