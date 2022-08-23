export const BASE_WAVES = [
  "square",
  "sawtooth",
  "sine",
  "triangle",
] as const;
export type TBaseWaveKey =
  typeof BASE_WAVES[number];
