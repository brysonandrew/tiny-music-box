type Texts<T extends PropertyKey> = T extends number
  ? `text${T}`
  : never;

type TTypeToBeMade = number; // maybe this should be provided as a generic
type T = null | "auto" | Texts<TTypeToBeMade>;

type Dictionary = {
  [Prop in TTypeToBeMade as `${Prop}`]: Prop;
};

export type TRequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

type N = Extract<T, `text${number}`> extends `text${infer R}`
  ? R extends keyof Dictionary
    ? Dictionary[R]
    : never
  : never;

export type TRequireAtLeastOne<
  T,
  Keys extends keyof T = keyof T
> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];


export type TMapped<
  N extends number,
  Result extends Array<unknown> = []
> = Result["length"] extends N
  ? Result
  : TMapped<N, [...Result, Result["length"]]>;