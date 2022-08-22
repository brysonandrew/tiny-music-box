import {
  useEffect,
  useReducer,
  useRef,
} from "react";
import type { FC } from "react";
import { Context } from "./Context";
import {
  reducer,
  resolveHydrationState,
  resolvePostHydrationState,
} from ".";
import {
  INIT_STATE,
  _STATE_STORAGE_KEY,
} from "./constants";
import { useLocalStorage } from "../storage";
import type {
  TState,
  TReducer,
  TContext,
} from "./types";

type TProviderProps = {
  value?: TContext;
  children: JSX.Element | JSX.Element[];
};
export const Provider: FC<
  TProviderProps
> = ({ children, value }) => {
  const initState: TState = {
    ...INIT_STATE,
    ...(value || {}),
  };
  const [savedState, setSavedState] =
    useLocalStorage<TState>(
      _STATE_STORAGE_KEY,
      initState
    );

  const [state, dispatch] = useReducer<
    TReducer,
    TState
  >(
    (...args) => {
      const nextState = reducer(
        ...args
      );
      setSavedState({
        ...nextState,
        active: {},
        loading: {},
        ready: true,
      });
      return nextState;
    },
    initState,
    (state) =>
      resolveHydrationState(
        { ...state },
        savedState
      )
  );

  const readyRef = useRef(() =>
    dispatch({
      type: "ready",
      value: resolvePostHydrationState(
        { ...state },
        savedState
      ),
    })
  );

  useEffect(() => {
    readyRef.current();
  }, []);

  const init = {
    ...initState,
    ...state,
    ...(value || {}),
    dispatch,
  };

  return (
    <Context.Provider value={init}>
      {children}
    </Context.Provider>
  );
};
