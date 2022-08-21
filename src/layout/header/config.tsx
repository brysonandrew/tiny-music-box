import { Clockwork } from "../../icons/Clockwork";
import { PaintRoller } from "../../icons/PaintRoller";
import { SwissArmyKnife } from "../../icons/SwissArmyKnife";

export const MENU_KEYS = [
  "adsr",
  "tweak",
  "style",
] as const;
export type TMenuKey =
  typeof MENU_KEYS[number];

export const ICON: Record<
  TMenuKey,
  JSX.Element | null
> = {
  adsr: <Clockwork />,
  tweak: <SwissArmyKnife />,
  style: <PaintRoller />,
};
