import { ImcResponse } from "../interfaces/imc-response.interface";

/**
 * Calculates average weight, variation percentage, and count of records.
 */
export const useEvolutionStatistics = (records: ImcResponse[]) => {
  /**
   * Number of records
   */
  const count = records.length;

  /**
   * Average weight and variation percentage
   */
  const average =
    count === 0
      ? 0
      : records.reduce((sum, record) => sum + record.weight, 0) / count;

  /**
   * Variation percentage between the first and last records (absolute value, 0-100)
   */
  const variation =
    count < 2
      ? 0
      : Math.abs(
          (records[count - 1].weight - records[0].weight) / records[0].weight
        ) * 100;

  return {
    average: average.toPrecision(4),
    variation: variation.toPrecision(4),
    count,
  };
};
