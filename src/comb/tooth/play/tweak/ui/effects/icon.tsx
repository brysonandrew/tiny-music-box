import { Bass } from "../../../../../../icons/Bass";
import { Blender } from "../../../../../../icons/Blender";
import { Moog } from "../../../../../../icons/Moog";
import type { TEffectKey } from "./type";

export const ICON: Record<
  TEffectKey,
  JSX.Element
> = {
  lowpass: <Bass />,
  moog: <Moog />,
  bitcrusher: <Blender />,
};
