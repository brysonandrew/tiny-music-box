import type { TMenuKey } from "../config";

import { Tweak } from "./Tweak";
import { Style } from "./Style";
import { Adsr } from "../../../comb/tooth/play/adsr";

export const RECORD: Record<
  TMenuKey,
  any
> = {
  tweak: <Tweak />,
  adsr: <Adsr />,
  style: <Style />,
}; 
