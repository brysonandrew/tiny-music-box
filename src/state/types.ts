import type {
  Dispatch,
  Reducer,
  ReducerState,
  ReducerAction,
} from "react";
import type { TMenuKey } from "../layout/header/config";
import type { INIT_STATE } from "./constants";
import type { TNodeRecord } from "./constants/node-record";
import type { TTweakConfig } from "./constants/tweak";
import type { TStyleConfig } from "./constants/style";
import type { TAdsrConfig } from "./constants/adsr";

export type TContext = TState & {
  dispatch: TDispatch;
};

export type TState = {
  context: AudioContext;
  menu: TMenuKey | null;
  active: Partial<
    Record<TActiveKey, boolean>
  >;
  adsr: TAdsrConfig;
  tweak: TTweakConfig;
  style: TStyleConfig;
  loading: Partial<
    Record<
      TLoadableKey,
      boolean | string
    >
  >;
  ready: boolean;
  midis: boolean[];
  lastMidi: number | null;
  initMidis: (null | TNodeRecord)[];
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
  "Menu",
  "None",
] as const;
export type TActiveKey =
  typeof ACTIVE[number];

export type TInitMidiValue = {
  midi: number;
  nodeRecord: TNodeRecord;
};
