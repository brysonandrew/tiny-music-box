import type { TMenuKey } from "../config";

import { Tweak } from "./Tweak";
import { Style } from "./Style";

export const RECORD: Record<
  TMenuKey,
  any
> = {
  tweak: <Tweak />,
  style: <Style />,
};
