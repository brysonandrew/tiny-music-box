import type {
  Dispatch,
  Reducer,
  ReducerState,
  ReducerAction,
} from "react";
import type { INIT_STATE } from "./constants";

export type TContext = TState & {
  dispatch: TDispatch;
};

export type TState = {
  context: AudioContext;
  active: Partial<
    Record<TActiveKey, boolean | any>
  >;
  loading: Partial<
    Record<
      TLoadableKey,
      boolean | string
    >
  >;
  ready: boolean;
};

export type TActionType =
  | keyof typeof INIT_STATE
  | "state";
export type TActionValue = any;

export type TKeyValuePair = [
  key: TActionType,
  value: TActionValue
];

export type TAction = {
  type: TActionType | "state";
  value?: TActionValue;
};

export type TDispatch =
  Dispatch<TAction>;
export type TReducer = Reducer<
  TState,
  TAction
>;
export type TReducerState =
  ReducerState<TReducer>;
export type TReducerAction =
  ReducerAction<TReducer>;

export const LOADABLE = [
  "None",
  "Calling",
  "Answering",
] as const;
export type TLoadableKey =
  typeof LOADABLE[number];

export const ACTIVE = [
  "None",
  "Menu",
  "Calling",
] as const;
export type TActiveKey =
  typeof ACTIVE[number];
