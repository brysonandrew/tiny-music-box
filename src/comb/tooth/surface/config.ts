import { TOTAL_KEYS } from "../../../config";
import { STAGGER } from "../init/size";

export const resolveX = (
  midi: number,
  fromKey: number
) =>
  STAGGER * midi -
  TOTAL_KEYS * 0.5 * STAGGER;

export const resolveColor = (
  isActive: boolean,
  midi: number
) =>
  `hsl(${
    isActive ? midi : 100 + midi * 18
  },${isActive ? 90 : 40}%,${
    isActive ? 90 : 40
  }%)`;

export const resolveTapColor = (
  midi: number
) => `hsl(${100 + midi},90%,90%)`;
