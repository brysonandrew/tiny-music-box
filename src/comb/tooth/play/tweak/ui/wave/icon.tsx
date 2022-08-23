import { Sawtooth } from "../../../../../../icons/Sawtooth";
import { Sine } from "../../../../../../icons/Sine";
import { Square } from "../../../../../../icons/Square";
import { Triangle } from "../../../../../../icons/Triangle";
import type { TBaseWaveKey } from "./type";

export const ICON: Record<
  TBaseWaveKey,
  JSX.Element
> = {
  sawtooth: <Sawtooth />,
  sine: <Sine />,
  triangle: <Triangle />,
  square: <Square />,
};
