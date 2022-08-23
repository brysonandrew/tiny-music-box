import {
  INIT_MIDIS,
  MIDIS,
} from "../../config";
import type { TState } from "../types";
import { TWEAK_CONFIG_DEFAULT } from "./tweak";
import { STYLE_CONFIG_DEFAULT } from "./style";
import { ADSR_CONFIG_DEFAULT } from "./adsr";
import { MOOG_CONFIG_DEFAULT } from "./moog";
import { BITCRUSHER_CONFIG_DEFAULT } from "./bitcrusher";
import { LOWPASS_CONFIG_DEFAULT } from "./lowpass";

export const _STATE_STORAGE_KEY =
  "_STATE_STORAGE_KEY";

const context = new AudioContext();

export const INIT_STATE: TState = {
  context,
  effect: "bitcrusher",
  wave: "sine",
  adsr: ADSR_CONFIG_DEFAULT,
  tweak: TWEAK_CONFIG_DEFAULT,
  moog: MOOG_CONFIG_DEFAULT,
  lowpass: LOWPASS_CONFIG_DEFAULT,
  bitcrusher: BITCRUSHER_CONFIG_DEFAULT,
  menu: null,
  style: STYLE_CONFIG_DEFAULT,
  active: {},
  loading: {},
  ready: true,
  midis: MIDIS,
  lastMidi: null,
  initMidis: INIT_MIDIS,
  x: 0,
};
