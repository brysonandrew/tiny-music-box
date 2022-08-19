export type TSoundConfig = {
  decay: number;
  depth: number;
  gain: number;
  delay: number;
  detune: number;
  span: number;
};

export const SOUND_CONFIG: TSoundConfig = {
  decay: 0.999,
  delay: 0.0001,
  gain: 0.4,
  depth: 1,
  detune: 0,
  span: 100,
};
