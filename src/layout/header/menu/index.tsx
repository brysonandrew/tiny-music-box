import type { TMenuKey } from "../config";

import { Tweak } from "./Tweak";
import { Style } from "./Style";
import { Adsr } from "./Adsr";

export const RECORD: Record<
  TMenuKey,
  any
> = {
  tweak: <Tweak />,
  adsr: <Adsr />,
  style: <Style />,
};
