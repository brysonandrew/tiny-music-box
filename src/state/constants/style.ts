export const STYLE_CONFIG_KEYS = [
  "hue",
];

export type TStyleConfigKey =
  typeof STYLE_CONFIG_KEYS[number];

export const STYLE_RANGE: Record<
  TStyleConfigKey,
  any
> = {
  hue: {
    min: 0,
    max: 360,
    step: 1,
  },
};
export type TStyleConfig = Record<
  TStyleConfigKey,
  number
>;
export const STYLE_CONFIG_DEFAULT: TStyleConfig =
  { hue: 0 };
