export const LOWPASS_CONFIG_KEYS = [
  "range",
] as const;

export type TLowpassConfigKey =
  typeof LOWPASS_CONFIG_KEYS[number];

export const LOWPASS_RANGE: Record<
  TLowpassConfigKey,
  any
> = {
  range: {
    min: 0,
    max: 1,
    step: 0.001,
  },
};
export type TLowpassConfig = Record<
  TLowpassConfigKey,
  number
>;
export const LOWPASS_CONFIG_DEFAULT: TLowpassConfig =
  {
    range: 0.065,
  };
