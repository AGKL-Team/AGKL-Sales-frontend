import ImcFilters from "../components/ImcHistoryFilters";
import ImcHistoryList from "../components/ImcHistoryList";
import { useImcFilters } from "../hooks/useImcHistoryFilters";

export default function ImcHistoryPage() {
  const { filters, setFilters } = useImcFilters();

  return (
    <>
      <div className="container py-5">
        <h2>Historial</h2>
        <ImcFilters filters={filters} setFilters={setFilters} />
        <ImcHistoryList filters={filters} />
      </div>
    </>
  );
}
