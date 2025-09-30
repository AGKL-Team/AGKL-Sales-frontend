import { useState } from "react";
import { ImcFiltersSchema } from "./../schemas/imc-history-filters.schema";

export const useImcFilters = () => {
  const [filters, setFilters] = useState<ImcFiltersSchema>({
    dateFrom: undefined,
    dateTo: undefined,
  });

  return { filters, setFilters };
};
