import {
  FROM_KEY,
  TOTAL_KEYS,
} from "../../../config";
import { STAGGER } from "../init/size";

export const resolveX = (
  midi: number
) =>
  STAGGER * (midi - FROM_KEY) -
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
