import type { TMenuKey } from "../config";

import { Sound } from "./Sound";
import { Style } from "./Style";

export const RECORD: Record<
  TMenuKey,
  any
> = {
  sound: <Sound />,
  style: <Style />,
};
