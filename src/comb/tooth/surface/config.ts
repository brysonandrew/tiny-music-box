import { FROM_KEY, TOTAL_KEYS } from "../../../config";
import { STAGGER } from "../init/size";

export const resolveX = (midi:number) =>
  STAGGER * (midi - FROM_KEY) -
  TOTAL_KEYS * 0.5 * STAGGER;
