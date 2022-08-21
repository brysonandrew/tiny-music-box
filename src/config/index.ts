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
  step: 0.00083333333,
};

export const FROM_KEY = 20;
export const TOTAL_KEYS = 2;


export const MIDI_KEYS: number[] =
  resolveKeys({
    from: FROM_KEY,
    total: TOTAL_KEYS,
  });

export const MIDIS: boolean[] =
  resolveMidis({
    from: FROM_KEY,
    total: TOTAL_KEYS + FROM_KEY,
  });

export const INIT_MIDIS: null[] =
  resolveInitMidis({
    from: FROM_KEY,
    total: TOTAL_KEYS + FROM_KEY,
  });
