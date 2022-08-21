import { useReducer } from "react";
import type { FC } from "react";
import type { TReducer } from "./types";
import type { TNodeRecord } from "../constants/node-record";
import { reducer } from ".";
import { Context } from "./Context";

type TProviderProps = {
  midi: number;
  nodeRecord: TNodeRecord;
  children: JSX.Element | JSX.Element[];
};
export const Provider: FC<
  TProviderProps
> = ({
  midi,
  nodeRecord,
  children,
}) => {
  const [state, dispatch] =
    useReducer<TReducer>(reducer, {
      midi,
      ...nodeRecord,
    });

  return (
    <Context.Provider
    key="x"
      value={{ dispatch, ...state }}
    >
      {children}
    </Context.Provider>
  );
};
