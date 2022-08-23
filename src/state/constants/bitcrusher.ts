export const BITCRUSHER_CONFIG_KEYS = [
  "bits",
  "frequency",
] as const;

export type TBitcrusherConfigKey =
  typeof BITCRUSHER_CONFIG_KEYS[number];

export const BITCRUSHER_RANGE: Record<
  TBitcrusherConfigKey,
  any
> = {
  bits: {
    min: 0,
    max: 64,
    step: 1,
  },
  frequency: {
    min: 0,
    max: 4,
    step: 0.01,
  },
};

export type TBitcrusherConfig = Record<
  TBitcrusherConfigKey,
  number
>;
export const BITCRUSHER_CONFIG_DEFAULT: TBitcrusherConfig =
  {
    bits: 16,
    frequency: 0.5,
  };
