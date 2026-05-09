import { describe, expect, it } from "vitest";
import { clamp } from "./math";

describe("clamp", () => {
  it("bounds values to min and max", () => {
    expect(clamp(10, 0, 5)).toBe(5);
    expect(clamp(-3, 0, 5)).toBe(0);
    expect(clamp(3, 0, 5)).toBe(3);
  });
});
