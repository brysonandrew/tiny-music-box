export const MOOG_CONFIG_KEYS = [
  "cutoff",
  "resonance",
  "offset",
] as const;

export type TMoogConfigKey =
  typeof MOOG_CONFIG_KEYS[number];

export const MOOG_RANGE: Record<
  TMoogConfigKey,
  any
> = {
  cutoff: {
    min: 0,
    max: 1,
    step: 0.001,
  },
  resonance: {
    min: 0,
    max: 4,
    step: 0.0005,
  },
  offset: {
    min: 0,
    max: 10,
    step: 0.1,
  },
};
export type TMoogConfig = Record<
  TMoogConfigKey,
  number
>;
export const MOOG_CONFIG_DEFAULT: TMoogConfig =
  {
    cutoff: 0.065,
    resonance: 3.99,
    offset: 0.3,
  };
