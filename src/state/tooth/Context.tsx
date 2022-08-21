import {
  useContext as useReactContext,
  createContext,
} from "react";
import type { TContext } from "./types";

export const Context =
  createContext<TContext>(
    {} as TContext
  ); // cheat cause i know it will only be used within it's corresponding provider

export const useContext =
  (): TContext =>
    useReactContext<TContext>(Context);
