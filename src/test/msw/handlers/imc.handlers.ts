import { delay, http, HttpResponse } from "msw";
import { ImcResponse } from "../../../features/imc/interfaces/imc-response.interface";

const IMC_RESPONSE: ImcResponse = {
  id: 1,
  imc: 24.22,
  category: {
    id: 2,
    name: "Normal",
    min: 18.51,
    max: 25,
  },
  date: new Date().toISOString(),
  height: 1.7,
  userId: "1",
  weight: 70,
};

export const imcHandlers = [
  http.post("/imc/calcular", async () => {
    return HttpResponse.json(IMC_RESPONSE, { status: 200 });
  }),

  http.get("/imc/history", async () => {
    await delay(150);
    return HttpResponse.json([
      { id: 1, height: 1.7, weight: 70, imc: 24.22 },
      { id: 2, height: 1.75, weight: 80, imc: 26.12 },
    ]);
  }),
];
