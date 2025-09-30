import z from "zod";

export const selectRequiredNumber = (message: string) =>
  z.preprocess(
    (val) => (typeof val === "number" && isNaN(val) ? undefined : val),
    z.number({ error: message }).int({ message })
  );
