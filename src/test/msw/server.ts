import { setupServer } from "msw/node";
import { imcHandlers } from "./handlers/imc.handlers";

export const server = setupServer(...imcHandlers);
