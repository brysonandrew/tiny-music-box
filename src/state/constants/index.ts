import {
  INIT_MIDIS,
  MIDIS,
  TOTAL_KEYS,
} from "../../config";
import type { TState } from "../types";
import { TWEAK_CONFIG_DEFAULT } from "./tweak";
import { STYLE_CONFIG_DEFAULT } from "./style";
import { ADSR_CONFIG_DEFAULT } from "./adsr";

export const _STATE_STORAGE_KEY =
  "_STATE_STORAGE_KEY";
 
const context = new AudioContext();
const merger = new ChannelMergerNode(
  context,
  { numberOfInputs: TOTAL_KEYS  } as ChannelMergerOptions
);
merger.connect(context.destination);

export const INIT_STATE: TState = {
  merger,
  context,
  adsr: ADSR_CONFIG_DEFAULT,
  tweak: TWEAK_CONFIG_DEFAULT,
  style: STYLE_CONFIG_DEFAULT,
  menu: null,
  active: {},
  loading: {},
  ready: true,
  midis: MIDIS,
  lastMidi: null,
  initMidis: INIT_MIDIS,
};
