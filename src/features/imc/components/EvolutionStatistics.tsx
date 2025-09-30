import { useEvolutionStatistics } from "../hooks/useEvolutionChart";
import { ImcResponse } from "../interfaces/imc-response.interface";

interface EvolutionStatisticsProps {
  records: ImcResponse[];
}

export default function EvolutionStatistics({
  records,
}: EvolutionStatisticsProps) {
  const { average, variation, count } = useEvolutionStatistics(records);

  return (
    <>
      <h4>Estadísticas</h4>
      <div className="p-3">
        <span>
          <strong>Promedio: </strong> {average} (kg)
        </span>
        <br />
        <span>
          <strong>Variación: </strong> %{variation}
        </span>
        <br />
        <span>
          <strong>Total de registros: </strong>
          {count}
        </span>
      </div>
    </>
  );
}
