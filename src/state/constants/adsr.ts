import type {
  CSSProperties,
  InputHTMLAttributes,
  LiHTMLAttributes,
  LabelHTMLAttributes,
  HTMLAttributes,
} from "react";
import type {
  MotionAdvancedProps,
  MotionProps,
  MotionTransform,
} from "framer-motion";
import { NORMAL_SLIDER_RANGE } from "../../config";
import {
  GAP,
  GAP_025,
  GAP_05,
  GAP_15,
  GAP_2,
} from "../../styles/constants";

export type TAdsrConfig = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
};

export const ADSR_CONFIG_DEFAULT: TAdsrConfig =
  {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.1,
    release: 0,
  };

export const ADSR_KEYS = [
  "attack",
  "decay",
  "sustain",
  "release",
] as const;
export const SIZE = 120;

const SIZE_0125 = SIZE * 0.125;
const SIZE_02 = SIZE * 0.2;
const SIZE_025 = SIZE * 0.25;
const SIZE_03 = SIZE * 0.3;
const SIZE_0375 = SIZE * 0.375;
const SIZE_05 = SIZE * 0.5;
const SIZE_06 = SIZE * 0.6;

export const SIZE_15 = 120 * 1.5;
export const SIZE_2 = 120 * 2;

const SIZE_075 = SIZE * 0.75;

export const ADSR_WIDTH =
  SIZE * ADSR_KEYS.length;
export const ADSR_HEIGHT = SIZE;
export type TComponentProps<T> = T &
  MotionAdvancedProps &
  MotionProps & {
    style?: CSSProperties;
  };
export type TConfig = TComponentProps<
  InputHTMLAttributes<HTMLInputElement>
> & {
  labelStyle: MotionTransform &
    HTMLAttributes<HTMLDivElement>;
  itemProps: MotionProps &
    LiHTMLAttributes<HTMLLIElement>;
  labelProps: MotionProps &
    LabelHTMLAttributes<HTMLLabelElement>;
};
export type TKey =
  typeof ADSR_KEYS[number];
export const diagonalSize = Math.hypot(
  SIZE,
  SIZE
);
export const halfDiagonalSize =
  diagonalSize * 0.5;
export const INPUT_HEIGHT = 6;

export const DEFAULT: TConfig = {
  ...NORMAL_SLIDER_RANGE,
  style: {
    height: INPUT_HEIGHT,
    width: "100%",
  },
  labelProps: {
    style: {
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
    },
  },
  itemProps: {},
  labelStyle: {
    rotateZ: -90
  },
};
const ATTACK = {
  ...DEFAULT,
  labelProps: {
    ...DEFAULT.labelProps,
    style: {
      ...DEFAULT.labelProps.style,
      rotateZ: "-45deg",
      width: diagonalSize,
    },
  },
  itemProps: {
    style: {
      width: SIZE,
      height: SIZE_025,
      x: SIZE_05,
      y: SIZE_025,
    },
  },
  labelStyle: {
    ...DEFAULT.labelStyle,
    width: SIZE,
    x: -SIZE_05,
    y: 0,
  },
};
const DECAY = {
  ...DEFAULT,
  labelProps: {
    ...DEFAULT.labelProps,
    style: {
      ...DEFAULT.labelProps.style,
      rotateZ: "45deg",
      width: halfDiagonalSize,
      x: SIZE_025,
      y: SIZE_0125,
    },
  },
  itemProps: {
    style: {
      height: SIZE_05,
      width: SIZE_075,
      x: SIZE_05 + GAP,
      y: 0,
    },
  },
  labelStyle: {
    ...DEFAULT.labelStyle,
    width: SIZE,
    x: -SIZE_0125,
    y: 0,
  },
};
const SUSTAIN = {
  ...DEFAULT,
  style: {
    width: SIZE,
    height: 4,
  },
  labelProps: {
    ...DEFAULT.labelProps,
    style: {
      ...DEFAULT.labelProps.style,
      x: SIZE_025,
      y: SIZE_025,
    },
  },
  itemProps: {
    style: {
      height: 0,
      width: SIZE_05,
      x: SIZE + GAP,
      y: 0,
    },
  },
  labelStyle: {
    ...DEFAULT.labelStyle,
    x: -SIZE_0125,
    y: SIZE_05,
  },
};
const RELEASE = {
  ...DEFAULT,
  labelProps: {
    ...DEFAULT.labelProps,
    style: {
      ...DEFAULT.labelProps.style,
      rotateZ: "45deg",
      width: halfDiagonalSize,
      y: 0,
      x: 0,
    },
  },
  itemProps: {
    style: {
      width: SIZE_05,
      y: SIZE_05,
      x: SIZE_2 + GAP_2,
    },
  },
  labelStyle: {
    ...DEFAULT.labelStyle,
    x: -SIZE_03,
    y: 0,
  },
};
export const ADSR_CONFIG: Record<
  TKey,
  TConfig
> = {
  attack: ATTACK,
  decay: DECAY,
  sustain: SUSTAIN,
  release: RELEASE,
};
