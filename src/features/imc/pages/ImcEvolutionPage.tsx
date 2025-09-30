import EvolutionChart from "../components/EvolutionChart";
import ImcFilters from "../components/ImcHistoryFilters";
import { useImcFilters } from "../hooks/useImcHistoryFilters";

export default function ImcEvolutionPage() {
  const { filters, setFilters } = useImcFilters();

  return (
    <div className="container py-5">
      <h1>Evolución</h1>
      <ImcFilters filters={filters} setFilters={setFilters} />
      <EvolutionChart filters={filters} setFilters={setFilters} />
    </div>
  );
}
