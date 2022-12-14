import {
  INIT_MIDIS,
  MIDIS,
} from "../../config";
import type { TState } from "../types";
import { SOUND_CONFIG_DEFAULT } from "./sound";
import { STYLE_CONFIG_DEFAULT } from "./style";

export const _STATE_STORAGE_KEY =
  "_STATE_STORAGE_KEY";

const context = new AudioContext();

export const INIT_STATE: TState = {
  context,
  sound: SOUND_CONFIG_DEFAULT,
  style: STYLE_CONFIG_DEFAULT,
  menu: null,
  active: {},
  loading: {},
  ready: true,
  midis: MIDIS,
  initMidis: INIT_MIDIS,
};
