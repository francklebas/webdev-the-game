import { describe, expect, it } from "vitest";
import { stepScoreAccumulator } from "./scoreSystem";

describe("stepScoreAccumulator", () => {
  it("keeps accumulating when threshold is not reached", () => {
    const result = stepScoreAccumulator(10, 5, 30);
    expect(result).toEqual({ accumulator: 15, scored: false });
  });

  it("resets and scores when threshold is reached", () => {
    const result = stepScoreAccumulator(29, 1, 30);
    expect(result).toEqual({ accumulator: 0, scored: true });
  });
});
