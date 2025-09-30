import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signIn } from "../AuthService";
import { LOG_IN } from "../constants";

import { SignInResponse } from "../interfaces/responses/sign-in-response.interface";
import { useAuthSession } from "./useAuthSession";
import { useAuthStore } from "./useAuthStore";

export const useLogIn = () => {
  useAuthSession();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    mutationKey: [LOG_IN],
    onSuccess: (data: SignInResponse) => {
      login(data);

      navigate({
        pathname: "/redirect",
      });
    },
  });

  return {
    signIn: mutate,
    isPending,
  };
};
