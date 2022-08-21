import { DETUNE_NORMAL_RANGE } from "../../config";
import { STYLE } from "../../styles/style";

export const SOUND_CONFIG_KEYS = [
  "decay",
  "delay",
  "gain",
  "depth",
  "detune",
  "span",
] as const;

export type TSoundConfigKey =
  typeof SOUND_CONFIG_KEYS[number];

export const SOUND_RANGE: Record<
  TSoundConfigKey,
  any
> = {
  decay: {
    min: 0.001,
    max: 0.999,
    step: 0.001,
    ...STYLE.sound,
  }, // delay min="0.001" max="0.02" step="0.001" value="0.005"
  delay: {
    min: 0.0001,
    max: 1,
    step: 0.0001,
    ...STYLE.sound,
  }, // delay min="0.001" max="0.02" step="0.001" value="0.005"
  gain: {
    min: 0.0001,
    max: 2,
    step: 0.001,
    ...STYLE.sound,
  },
  depth: {
    min: 0.001,
    max: 2,
    step: 0.001,
    ...STYLE.sound,
  },
  detune: {
    ...DETUNE_NORMAL_RANGE,
    ...STYLE.effectExtra,
  },
  span: {
    min: 1,
    max: 1000,
    step: 1,
    ...STYLE.sound,
  },
};
export type TSoundConfig = Record<
  TSoundConfigKey,
  number
>;
export const SOUND_CONFIG_DEFAULT: TSoundConfig =
  {
    decay: 0.999,
    delay: 0.0001,
    gain: 0.4,
    depth: 1,
    detune: 0,
    span: 100,
  };
