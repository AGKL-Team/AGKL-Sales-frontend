import { toast } from "sonner";
import { httpClient } from "../../shared/http/httpClient";
import { SignUpRequest } from "./interfaces/requests/sign-up-request.interface";
import { SignInResponse } from "./interfaces/responses/sign-in-response.interface";
import type { LoginData } from "./schemas/sign-in-schema";

const AUTH_ENDPOINT = import.meta.env.VITE_BACKEND_URL + "/auth";

export async function signIn(request: LoginData): Promise<SignInResponse> {
  const response = await httpClient.post<SignInResponse>(
    `${AUTH_ENDPOINT}/sign-in`,
    request,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
}

export async function signUp(request: SignUpRequest) {
  const response = await httpClient.post(`${AUTH_ENDPOINT}/sign-up`, request);

  if (response.status !== 201) toast.error("Error al registrar el usuario");
  else toast.success("Usuario registrado con éxito");
}

export async function signOut() {
  await httpClient.post(`${AUTH_ENDPOINT}/sign-out`);
}

export async function updateHeight(height: number) {
  const response = await httpClient.patch(`${AUTH_ENDPOINT}/update-height`, {
    height,
  });

  if (response.status !== 200) toast.error("Error al actualizar la altura");
  else toast.success("Altura actualizada con éxito");
}
