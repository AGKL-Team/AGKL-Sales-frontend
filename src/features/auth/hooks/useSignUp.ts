import { useMutation } from "@tanstack/react-query";
import { signUp } from "../AuthService";
import { SIGN_UP } from "../constants";
import { SignUpRequest } from "../interfaces/requests/sign-up-request.interface";

import { useLogIn } from "./useLogIn";

export const useSignUp = () => {
  const { signIn, isPending: isSigningIn } = useLogIn();
  const { mutateAsync, isPending: isSigningUp } = useMutation({
    mutationKey: [SIGN_UP],
    mutationFn: (request: SignUpRequest) => signUp(request),
    onSuccess: async (_: unknown, request: SignUpRequest) => {
      await signIn({ email: request.email, password: request.password });
    },
  });

  return {
    signUp: mutateAsync,
    isSigningIn,
    isSigningUp,
  };
};
