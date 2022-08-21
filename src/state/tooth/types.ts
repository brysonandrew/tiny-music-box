import type {
  Dispatch,
  Reducer,
  ReducerState,
  ReducerAction,
} from "react";
import type { TNodeRecord } from "../constants/node-record";

export type TContext = TState & {
  dispatch: TDispatch;
};

export type TState = TNodeRecord & {
  midi: number;
};

export type TActionType = null;
export type TActionValue = any;

export type TKeyValuePair = [
  key: TActionType,
  value: TActionValue
];

export type TAction = {
  type: TActionType;
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
