import { PaintRoller } from "../../icons/PaintRoller";
import { SwissArmyKnife } from "../../icons/SwissArmyKnife";

export const MENU_KEYS = [
  "style",
  "tweak",
] as const;
export type TMenuKey =
  typeof MENU_KEYS[number];

export const ICON: Record<
  TMenuKey,
  JSX.Element | null
> = {
  style: <PaintRoller />,
  tweak: <SwissArmyKnife />,
};
