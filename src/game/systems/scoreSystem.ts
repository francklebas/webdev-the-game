export type ScoreStep = {
  accumulator: number;
  scored: boolean;
};

export function stepScoreAccumulator(
  accumulator: number,
  delta: number,
  threshold: number,
): ScoreStep {
  const next = accumulator + delta;
  if (next < threshold) {
    return { accumulator: next, scored: false };
  }

  return { accumulator: 0, scored: true };
}
