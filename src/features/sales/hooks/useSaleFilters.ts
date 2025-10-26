import { useState } from "react";

export interface SaleFilters {
  byProducts: boolean;
  byBrands: boolean;
  startDate: Date | null;
  endDate: Date | null;
}

export const useSaleFilters = () => {
  const [filters, setFilters] = useState<SaleFilters>({
    byProducts: false,
    byBrands: false,
    startDate: null,
    endDate: null,
  });

  const toggleProductFilter = () => {
    setFilters((prev) => ({
      ...prev,
      byProducts: !prev.byProducts,
    }));
  };

  const toggleBrandFilter = () => {
    setFilters((prev) => ({
      ...prev,
      byBrands: !prev.byBrands,
    }));
  };

  const setStartDate = (date: Date | null) => {
    setFilters((prev) => ({
      ...prev,
      startDate: date,
    }));
  };

  const setEndDate = (date: Date | null) => {
    setFilters((prev) => ({
      ...prev,
      endDate: date,
    }));
  };

  return {
    filters,
    toggleProductFilter,
    toggleBrandFilter,
    setStartDate,
    setEndDate,
  };
};
