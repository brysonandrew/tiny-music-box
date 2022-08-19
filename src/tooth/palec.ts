

export type TPalecConfig = {
  decay: number;
  depth: number;
  gain: number;
  delay: number;
  detune: number;
  span: number;
};


export const GLASS_RED = "rgba(139, 0, 0,0.28)";
export const GLASS_RED_5 = "rgba(139, 0, 0,0.04)";
export const GLASS_PURPLE = "rgba(98, 0, 234,0.4)";
export const GLASS_PURPLE_DARK = "rgba(98, 0, 234,0.9)";
export const GLASS_BORDER = "1px solid rgba(255, 255, 255, 0.125)";

export const GLASS_RED_2 = "rgba(255,61,0, 0.1)";
export const GLASS_RED_3 = "rgba(255,61,0, 0.2)";

export const GLASS_RED_BORDER = `1px solid ${GLASS_RED_3}`;
export const GLASS_PURPLE_BORDER = `1px solid ${GLASS_PURPLE}`;

export const TRANSPARENT = "rgba(0,0,0, 0)";

export const GLASS_GREEN = "rgba(28,183,90, 0.1)";

export const GLASS_BLUE = "rgba(28, 89, 183, 0.1)";



export const SOUND = { style: { backgroundColor: GLASS_GREEN } };
export const EFFECT = { style: { backgroundColor: GLASS_PURPLE } };
export const EFFECT_EXTRA = { style: { backgroundColor: GLASS_RED } };
export const SOUND_EXTRA = { style: { backgroundColor: GLASS_BLUE } };
export const BEAT_COUNT = 16;

export const DETUNE_NORMAL_RANGE = {
  min: -1,
  max: 1,
  step: 0.00083333333,
};

export const PALEC = {
  range: {
    decay: { min: 0.001, max: 0.999, step: 0.001, ...SOUND }, // delay min="0.001" max="0.02" step="0.001" value="0.005"
    delay: { min: 0.0001, max: 1, step: 0.0001, ...SOUND }, // delay min="0.001" max="0.02" step="0.001" value="0.005"
    gain: { min: 0.0001, max: 2, step: 0.001, ...SOUND },
    depth: { min: 0.001, max: 2, step: 0.001, ...SOUND },
    detune: { ...DETUNE_NORMAL_RANGE, ...EFFECT_EXTRA },
    span: { min: 1, max: 1000, step: 1, ...SOUND },
  },
  default: {
    decay: 0.999,
    delay: 0.0001,
    gain: 0.4,
    depth: 1,
    detune: 0,
    span: 100,
  },
};
