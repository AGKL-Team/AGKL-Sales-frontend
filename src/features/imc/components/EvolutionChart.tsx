import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import LoadingIndicator from "../../../shared/components/LoaderIndicator";
import { usePreferenceTheme } from "../../../shared/hooks/usePreferenceTheme";
import { useWindowSize } from "../../../shared/hooks/useWindowSize";
import { useImcHistory } from "../hooks/useImcHistory";
import { ImcFiltersSchema } from "../schemas/imc-history-filters.schema";
import EvolutionStatistics from "./EvolutionStatistics";

interface EvolutionChartProps {
  filters: ImcFiltersSchema;
  setFilters: (filters: ImcFiltersSchema) => void;
}

export default function EvolutionChart({ filters }: EvolutionChartProps) {
  const { records, isLoading } = useImcHistory(filters);
  const { isDarkMode } = usePreferenceTheme();
  const { height, width } = useWindowSize();

  const chartData = useMemo(
    () =>
      records
        ?.slice()
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((record) => ({
          date: new Date(record.date)
            .toISOString()
            .replace("T", " ")
            .substring(0, 16),
          weight: record.weight,
        })),
    [records]
  );

  return (
    <div className="mt-4" style={{ overflow: "hidden" }}>
      {isLoading && <LoadingIndicator isLoading />}
      {!chartData || chartData.length === 0 || !records ? (
        <div className="alert alert-info">
          No se han encontrado registros para los filtros seleccionados.
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-evenly flex-wrap">
          <LineChart
            className="col-sm-12 col-lg-4 shadow-sm rounded"
            height={Math.min(400, height * 0.6)}
            width={Math.min(700, width * 0.9)}
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
            <Line
              dataKey={"weight"}
              name="Peso (Kg)"
              type={"monotone"}
              strokeWidth={2}
              stroke={isDarkMode ? "#65ecd6ff" : "#007bff"}
            />
            <XAxis dataKey={"date"} interval={"equidistantPreserveStart"} />
            <YAxis
              interval={"preserveStart"}
              label={{ value: "Peso (Kg)", angle: -90, position: "insideLeft" }}
            />
            <Legend align="center" />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                backgroundColor: isDarkMode ? "black" : "white",
                color: isDarkMode ? "white" : "black",
              }}
            />
          </LineChart>
          <div className="alert alert-info col-sm-12 col-lg-4 mt-4 shadow-sm rounded">
            <EvolutionStatistics records={records} />
          </div>
        </div>
      )}
    </div>
  );
}
