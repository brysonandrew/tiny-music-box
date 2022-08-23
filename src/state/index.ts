import { INIT_STATE } from "./constants";
import type {
  TState,
  TReducerAction,
  TInitMidiValue,
} from "./types";

export const resolveHydrationState = (
  state: TState,
  savedState?: TState
): TState => {
  const baseState =
    savedState ?? INIT_STATE;
  const {
    context,
    initMidis,
    ...appState
  } = baseState;
  return {
    ...state,
    ...appState,
    context: INIT_STATE.context,
    initMidis: INIT_STATE.initMidis,
  };
};

export const resolvePostHydrationState =
  (
    state: TState,
    savedState?: TState
  ): TState => {
    const baseState =
      savedState ?? INIT_STATE;
    const {
      context,
      initMidis,
      ...appState
    } = baseState;
    return {
      ...state,
      ...appState,
      context: INIT_STATE.context,
      initMidis: INIT_STATE.initMidis,
      ready: true,
    };
  };

export const reducer = (
  state: TState,
  { type, value }: TReducerAction
) => {
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
      return {
        ...state,
        active: value,
        loading: {},
      };
    }
    case "menu": {
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
    case "adsr": {
      return {
        ...state,
        adsr: {
          ...state.adsr,
          ...value,
        },
      };
    }
    case "tweak": {
      return {
        ...state,
        tweak: {
          ...state.tweak,
          ...value,
        },
      };
    }
    case "wave": {
      return {
        ...state,
        wave: value,
      };
    }
    case "style": {
      return {
        ...state,
        style: {
          ...state.style,
          ...value,
        },
      };
    }
    case "midis": {
      const [target, next] = value;
      const midis = state.midis.map(
        (isMidi, midi) =>
          midi === target
            ? next
            : isMidi
      );
      return {
        ...state,
        midis,
        lastMidi: target,
      };
    }
    case "initMidis": {
      const v: TInitMidiValue = value;
      const initMidis =
        state.initMidis.map(
          (midiRecord, midi) =>
            midi === v.midi
              ? v.nodeRecord
              : midiRecord
        );
      return { ...state, initMidis };
    }
    default: {
      console.error(type);
      throw new Error(
        `Action type invalid. ${type}`
      );
    }
  }
};
