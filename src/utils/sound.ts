export const midi2Freq = (
  noteNum: number,
  baseNote?: number
) =>
  typeof noteNum === "number"
    ? (baseNote || 440) *
      Math.pow(2, (noteNum - 69) / 12)
    : 440;
