import { STYLE } from "../../styles/style";

export const TWEAK_CONFIG_KEYS = [
  "decay",
  "delay",
  "depth",
  "span",
] as const;

export type TTweakConfigKey =
  typeof TWEAK_CONFIG_KEYS[number];

export const TWEAK_RANGE: Record<
  TTweakConfigKey,
  any
> = {
  decay: {
    min: 0.001,
    max: 0.999,
    step: 0.001,
    ...STYLE.tweak,
  }, // delay min="0.001" max="0.02" step="0.001" value="0.005"
  delay: {
    min: 0.0001,
    max: 1,
    step: 0.0001,
    ...STYLE.tweak,
  }, // delay min="0.001" max="0.02" step="0.001" value="0.005"
  // gain: {
  //   min: 0.0001,
  //   max: 2,
  //   step: 0.001,
  //   ...STYLE.tweak,
  // },
  depth: {
    min: 0.001,
    max: 2,
    step: 0.001,
    ...STYLE.tweak,
  },
  // detune: {
  //   ...DETUNE_NORMAL_RANGE,
  //   ...STYLE.effectExtra,
  // },
  span: {
    min: 1,
    max: 100,
    step: 1,
    ...STYLE.tweak,
  },
};
export type TTweakConfig = Record<
  TTweakConfigKey,
  number
>;
export const TWEAK_CONFIG_DEFAULT: TTweakConfig =
  {
    decay: 0.999,
    delay: 0.0001,
    depth: 1,
    span: 50,
  };
