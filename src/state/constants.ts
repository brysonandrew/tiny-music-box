import type { TState } from "./types";

export const _STATE_STORAGE_KEY =
  "_STATE_STORAGE_KEY";

const context = new AudioContext();

export const INIT_STATE: TState = {
  context,
  active: {},
  loading: {},
  ready: false,
};
