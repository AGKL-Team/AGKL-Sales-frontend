import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { updateHeight } from "../AuthService";
import { UPDATE_HEIGHT } from "../constants";

type FormState = "readonly" | "editing";

export const useAccountForm = () => {
  const [state, setState] = useState<FormState>("readonly");

  const enableEditing = () => setState("editing");
  const disableEditing = () => setState("readonly");

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: [UPDATE_HEIGHT],
    mutationFn: updateHeight,
  });

  return {
    state,
    enableEditing,
    disableEditing,
    update: mutate,
    isPending,
    isSuccess,
  };
};
