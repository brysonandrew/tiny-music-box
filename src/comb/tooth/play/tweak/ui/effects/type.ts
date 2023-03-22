export const EFFECTS = [
  "moog",
  "lowpass",
  "lowpass2",
  "bitcrusher",
] as const;
export type TEffectKey =
  typeof EFFECTS[number];
export type TEffectRecord = Record<
  TEffectKey,
  AudioWorkletNode
>;
