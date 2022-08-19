import type {
  Dispatch,
  Reducer,
  ReducerState,
  ReducerAction,
} from "react";
import { MENU_KEYS } from "../layout/header/config";
import type { INIT_STATE } from "./constants";
import type { TSoundConfig } from "./constants/sound";
import type { TStyleConfig } from "./constants/style";

export type TContext = TState & {
  dispatch: TDispatch;
};

export type TState = {
  context: AudioContext;
  active: Partial<
    Record<TActiveKey, boolean | any>
  >;
  sound: TSoundConfig;
  style: TStyleConfig;
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
  "Sound",
  "Style",
] as const;
export type TLoadableKey =
  typeof LOADABLE[number];

export const ACTIVE = [
  ...MENU_KEYS,
  "None",
] as const;
export type TActiveKey =
  typeof ACTIVE[number];
