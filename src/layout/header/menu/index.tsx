import type { TMenuKey } from "../config";

import { Tweak } from "../../../comb/tooth/play/tweak";
import { Style } from "./Style";
import { Adsr } from "../../../comb/tooth/play/adsr/ui";

export const RECORD: Record<
  TMenuKey,
  any
> = {
  tweak: <Tweak />,
  adsr: <Adsr />,
  style: <Style />,
}; 
