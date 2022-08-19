import { DETUNE_NORMAL_RANGE } from "../../config";
import {
  SOUND,
  EFFECT_EXTRA,
} from "../../comb/tooth/config/style";

export const SOUND_CONFIG_KEYS = [
  "decay",
  "delay",
  "gain",
  "depth",
  "detune",
  "span",
];

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
    ...SOUND,
  }, // delay min="0.001" max="0.02" step="0.001" value="0.005"
  delay: {
    min: 0.0001,
    max: 1,
    step: 0.0001,
    ...SOUND,
  }, // delay min="0.001" max="0.02" step="0.001" value="0.005"
  gain: {
    min: 0.0001,
    max: 2,
    step: 0.001,
    ...SOUND,
  },
  depth: {
    min: 0.001,
    max: 2,
    step: 0.001,
    ...SOUND,
  },
  detune: {
    ...DETUNE_NORMAL_RANGE,
    ...EFFECT_EXTRA,
  },
  span: {
    min: 1,
    max: 1000,
    step: 1,
    ...SOUND,
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
