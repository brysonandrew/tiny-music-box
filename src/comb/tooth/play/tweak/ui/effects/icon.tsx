import { Bass } from "../../../../../../icons/Bass";
import { Blender } from "../../../../../../icons/Blender";
import { EarthSplit } from "../../../../../../icons/EarthSplit";
import { Moog } from "../../../../../../icons/Moog";
import type { TEffectKey } from "./type";

export const ICON: Record<
  TEffectKey,
  JSX.Element
> = {
  lowpass: <Bass />,
  lowpass2: <EarthSplit />,
  moog: <Moog />,
  bitcrusher: <Blender />,
};
