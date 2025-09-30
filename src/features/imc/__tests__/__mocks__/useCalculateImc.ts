import { vi } from "vitest";

export const calculateImcMock = vi.fn();

let mockState = {
  isPending: false,
  imcResponse: null as null | { imc: number; categoria: string },
};

export function setMockImcState(partial: Partial<typeof mockState>) {
  mockState = { ...mockState, ...partial };
}

export function useCalculateImc() {
  return {
    calculateImc: calculateImcMock,
    isPending: mockState.isPending,
    imcResponse: mockState.imcResponse,
  };
}
