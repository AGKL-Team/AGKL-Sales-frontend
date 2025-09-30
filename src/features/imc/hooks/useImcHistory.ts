import { useQuery } from "@tanstack/react-query";
import { IMC_HISTORY } from "../constants";
import { ImcFiltersSchema } from "../schemas/imc-history-filters.schema";
import { getImcHistory } from "../services/imc.service";

export const useImcHistory = (filters: ImcFiltersSchema) => {
  const { data, isLoading } = useQuery({
    queryKey: [IMC_HISTORY, filters],
    queryFn: async () => {
      const records = await getImcHistory(filters);

      // If there is not filters, return all records
      if (
        !filters ||
        filters.dateFrom === undefined ||
        filters.dateTo === undefined
      )
        return records;

      // Filter records when UTC date does not match local date
      // Only must filter when the filters is not undefined
      const auxRecords = records.filter((record) => {
        const recordDateObj = new Date(
          new Date(record.date).toLocaleDateString("es-AR")
        );
        const filterDateObj = new Date(
          new Date(filters.dateFrom!).toLocaleDateString("es-AR")
        );

        // Compare the time values directly
        return recordDateObj >= filterDateObj;
      });

      return auxRecords.length > 0 ? auxRecords : records;
    },
    enabled: true,
  });

  return { records: data, isLoading };
};
