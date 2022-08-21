import type { InputHTMLAttributes } from "react";
import type { MotionProps } from "framer-motion";

export const NOOP = () => null;

export type TMidiConfig = {
  from: number;
  total: number;
};
export const resolveKeys = ({
  from,
  total,
}: TMidiConfig): number[] =>
  [...Array(total)].map(
    (_, index: number) =>
      +(index + from)
  );
export const resolveMidis = ({
  from,
  total,
}: TMidiConfig): boolean[] =>
  [...Array(total + from)].map(
    (_) => false
  );
export const resolveInitMidis = ({
  from,
  total,
}: TMidiConfig): null[] =>
  [...Array(total + from)].map(
    (_) => null
  );
export const BEAT_COUNT = 16;

export const DETUNE_NORMAL_RANGE = {
  min: -1,
  max: 1,
  step: 0.00083333333, // 1/1200
};

export const FROM_KEY = 40;
export const TOTAL_KEYS = 12;

export const MIDI_KEYS: number[] =
  resolveKeys({
    from: FROM_KEY,
    total: TOTAL_KEYS,
  });

export const MIDIS: boolean[] =
  resolveMidis({
    from: FROM_KEY,
    total: TOTAL_KEYS,
  });

export const INIT_MIDIS: null[] =
  resolveInitMidis({
    from: FROM_KEY,
    total: TOTAL_KEYS,
  });

export type TInputStyledProps = {
  isEmpty: boolean;
};

export type TInputAttributes =
  InputHTMLAttributes<HTMLInputElement> &
    MotionProps;

export const NORMAL_SLIDER_RANGE: TInputAttributes =
  {
    min: 0,
    max: 1,
    step: 0.1,
  };
