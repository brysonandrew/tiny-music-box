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
} from "./types";

type TProviderProps = {
  children: JSX.Element | JSX.Element[];
};
export const Provider: FC<
  TProviderProps
> = ({ children }) => {
  const [savedState, setSavedState] =
    useLocalStorage<TState>(
      _STATE_STORAGE_KEY,
      INIT_STATE
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
    INIT_STATE,
    (state) =>
      resolveHydrationState(
        state,
        savedState
      )
  );

  const readyRef = useRef(() =>
    dispatch({
      type: "ready",
      value: resolvePostHydrationState(
        state,
        savedState
      ),
    })
  );

  useEffect(() => {
    readyRef.current();
  }, []);
  
  const init = {
    ...state,
    dispatch,
  };
  
  return (
    <Context.Provider
      value={init}
    >
      {children}
    </Context.Provider>
  );
};
