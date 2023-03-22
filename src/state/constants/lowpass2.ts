export const LOWPASS2_CONFIG_KEYS = [
  "frequency",
] as const;

export type TLowpass2ConfigKey =
  typeof LOWPASS2_CONFIG_KEYS[number];

export const LOWPASS2_RANGE: Record<
  TLowpass2ConfigKey,
  any
> = {
  frequency: {
    min: 0,
    max: 440,
    step: 1,
  },
};

export type TLowpass2Config = Record<
  TLowpass2ConfigKey,
  number
>;
export const LOWPASS2_CONFIG_DEFAULT: TLowpass2Config =
  {
    frequency: 50,
  };
