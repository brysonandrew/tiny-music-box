export const EFFECTS = [
  "moog",
  "lowpass",
  "bitcrusher",
] as const;
export type TEffectKey =
  typeof EFFECTS[number];
export type TEffectRecord = Record<
  TEffectKey,
  AudioWorkletNode
>;
