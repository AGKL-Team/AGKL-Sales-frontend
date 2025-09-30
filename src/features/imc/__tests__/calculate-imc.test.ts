import { describe, expect, it } from "vitest";
import { CalculateImcSchema } from "../schemas/calculate-imc.schema";

// Suponiendo que el schema es algo como:
// z.object({ height: z.number().min(0.1).max(3), weight: z.number().min(1).max(500) })

describe("CalculateImcSchema", () => {
  it("should accept input within range", () => {
    const data = { height: "1.75", weight: "80" };
    const parsed = CalculateImcSchema.parse(data);
    expect(parsed).toEqual({ height: 1.75, weight: 80 });
  });

  it("should reject height out of range", () => {
    expect(() =>
      CalculateImcSchema.parse({ height: "5", weight: "80" })
    ).toThrow(/height/i);
  });

  it("should reject weight out of range", () => {
    expect(() =>
      CalculateImcSchema.parse({ height: "1.8", weight: "900" })
    ).toThrow(/weight/i);
  });
});
