import { INIT_STATE } from "./constants";
import type {
  TState,
  TReducerAction,
} from "./types";

export const resolveHydrationState = (
  state: TState,
  savedState?: TState
): TState => {
  const baseState =
    savedState ?? INIT_STATE;
  const { context, ...appState } =
    baseState;
  return {
    ...state,
    ...appState,
    context: INIT_STATE.context,
  };
};
export const resolvePostHydrationState =
  (
    state: TState,
    savedState?: TState
  ): TState => {
    const baseState =
      savedState ?? INIT_STATE;
    const { context, ...appState } =
      baseState;
    return {
      ...state,
      ...appState,
      context: INIT_STATE.context,
      ready: true,
    };
  };

export const reducer = (
  state: TState,
  { type, value }: TReducerAction
) => {
  console.log(state);
  console.log(type, value);
  switch (type) {
    case "state": {
      return { ...state, ...value };
    }
    case "loading": {
      return {
        ...state,
        loading: value,
      };
    }
    case "active": {
      console.log("active");
      return {
        ...state,
        active: value,
        loading: {},
      };
    }
    case "menu": {
      console.log(value);
      return {
        ...state,
        menu: value,
      };
    }
    case "ready": {
      return {
        ...state,
        ...value,
        ready: true,
      };
    }
    default: {
      console.error(type);
      throw new Error(
        `Action type invalid. ${type}`
      );
    }
  }
};
