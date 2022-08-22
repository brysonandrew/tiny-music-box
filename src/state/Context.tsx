import {
  useContext as useReactContext,
  createContext,
} from "react";
import type { Context as ReactContext } from "react";
import type {
  TAction,
  TContext, 
} from "./types";
import { INIT_STATE } from "./constants";

export const Context: ReactContext<TContext> =
  createContext<TContext>({
    ...INIT_STATE,
    dispatch: (_: TAction) => null,
  });
 
export const useContext =
  (): TContext =>
    useReactContext<TContext>(Context);
