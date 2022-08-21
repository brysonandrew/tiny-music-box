import type {
  CSSProperties,
  InputHTMLAttributes,
  LiHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import type {
  MotionAdvancedProps,
  MotionProps,
} from "framer-motion";
import { NORMAL_SLIDER_RANGE } from "../../config";

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
export const SIZE = 100;
export const WIDTH =
  SIZE * ADSR_KEYS.length;
export const HEIGHT = SIZE;
export type TComponentProps<T> = T &
  MotionAdvancedProps &
  MotionProps & {
    style?: CSSProperties;
  };
export type TConfig = TComponentProps<
  InputHTMLAttributes<HTMLInputElement>
> & {
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
    top: "50%",
    left: "0%",
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
};

export const ADSR_CONFIG: Record<
  TKey,
  TConfig
> = {
  attack: {
    ...DEFAULT,
    labelProps: {
      ...DEFAULT.labelProps,
      style: {
        ...DEFAULT.labelProps.style,
        rotateZ: "-45deg",
        width: diagonalSize,
        top: "50%",
      },
    },
    itemProps: {
      style: {
        width: SIZE,
        top: 20,
      },
    },
  },
  decay: {
    ...DEFAULT,
    labelProps: {
      ...DEFAULT.labelProps,
      style: {
        ...DEFAULT.labelProps.style,
        rotateZ: "45deg",
        width: halfDiagonalSize,
        x: "30%",
        y: "25%",
        top: 0,
      },
    },
    itemProps: {
      style: {
        width: SIZE * 0.5,
        y: "-50%",
      },
    },
  },
  sustain: {
    ...DEFAULT,
    style: {
      top: "100%",
      width: SIZE,
    },
    labelProps: {
      ...DEFAULT.labelProps,
      style: {
        ...DEFAULT.labelProps.style,
        x: 30,
        top: 20,
      },
    },
    itemProps: {
      style: {
        width: SIZE * 0.5,
        y: "-50%",
        x: "5%",
      },
    },
  },
  release: {
    ...DEFAULT,
    labelProps: {
      ...DEFAULT.labelProps,
      style: {
        ...DEFAULT.labelProps.style,
        rotateZ: "45deg",
        width: halfDiagonalSize,
        top: "75%",
        left: "150%",
      },
    },
    itemProps: {
      style: {
        width: SIZE * 0.5,
        y: "-46%",
        x: "8%",
        top: 44,
      },
    },
  },
};
