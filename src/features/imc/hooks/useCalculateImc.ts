import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CALCULATE_IMC, IMC_HISTORY } from "../constants";
import { CalculateImcResponse } from "../interfaces/calculate-imc-response.interface";
import { calculateImc } from "../services/imc.service";

export const useCalculateImc = () => {
  const queryClient = useQueryClient();
  const [imcResponse, setImcResponse] = useState<CalculateImcResponse | null>(
    null
  );

  const { mutate, isPending } = useMutation({
    mutationFn: calculateImc,
    mutationKey: [CALCULATE_IMC],
    onSuccess: (data) => {
      setImcResponse(data);
      queryClient.invalidateQueries({ queryKey: [IMC_HISTORY] });
    },
  });

  return { calculateImc: mutate, isPending, imcResponse };
};
