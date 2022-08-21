/*
Original metal styles from
https://codepen.io/simurai/pen/DwJdq
*/

import { css } from "@emotion/react";
import { GLASS_RED } from "../constants";

const FADE_15_1 = "hsla(0, 0%, 15%, 1)";
const FADE_15_08 =
  "hsla(0, 0%, 15%, 0.8)";
const FADE_0_025 =
  "hsla(0, 0%, 0%, 0.25)";
const FADE_100_07 =
  "hsla(0, 0%, 100%, 0.7)";
const FADE_100_06 =
  "hsla(0, 0%, 100%, 0.6)";
const FADE_0_01 =
  "hsla(0, 0%, 0%, 0.1)";

export const metalBorderStyle = css`
  box-shadow: inset ${FADE_15_1} 0 0px
      0px 4px,
    /* border */ inset ${FADE_15_08} 0 -1px
      5px 4px,
    /* soft SD */ inset ${FADE_0_025} 0 -1px
      0px 7px,
    /* bottom SD */ inset ${FADE_100_07}
      0 2px 1px 7px;
`;

export const metalBorderActiveStyle = css`
  box-shadow: inset ${GLASS_RED} 0 0px
      0px 4px,
    /* border */ inset ${GLASS_RED} 0 -1px
      5px 4px,
    /* soft SD */ inset ${GLASS_RED} 0 -1px
      0px 7px,
    /* bottom SD */ inset ${GLASS_RED} 0
      2px 1px 7px;
`;

export const metalBaseCss = css`
  color: hsla(0, 0%, 20%, 1);
  text-shadow: hsla(0, 0%, 40%, 0.5) 0 -1px
      0,
    ${FADE_100_06} 0 2px 1px;
  background-color: hsl(0, 0%, 90%);
`;

const FADE_0_003 =
  "hsla(0, 0%, 0%, 0.03)";
const FADE_60_1 = "hsla(0, 0%, 60%, 1)";
const FADE_85_1 = "hsla(0, 0%, 85%, 1)";
const FADE_90_1 = "hsla(0, 0%, 90%, 1)";
const FADE_100_01 =
  "hsla(0, 0%, 100%, 0.1)";
const FADE_100_015 =
  "hsla(0, 0%, 100%, 0.15)";
const FADE_100_02 =
  "hsla(0, 0%, 100%, 0.2)";
const FADE_100_05 =
  "hsla(0, 0%, 100%, 0.5)";

const TRANSPARENT =
  "hsla(0, 0%, 0%, 0)";

export const METAL_RADIAL_GRADIENT = `-webkit-radial-gradient(
  50% 0%,
  8% 50%,
  ${FADE_100_05} 0%,
  ${TRANSPARENT} 100%
),
-webkit-radial-gradient(50% 100%, 12% 50%, ${FADE_100_06} 0%, ${TRANSPARENT}
      100%),
-webkit-radial-gradient(0% 50%, 50% 7%, ${FADE_100_05} 0%, ${TRANSPARENT}
      100%),
      
-webkit-radial-gradient(100% 50%, 50% 5%, ${FADE_100_05} 0%, ${TRANSPARENT}
      100%),
-webkit-repeating-radial-gradient(50% 50%, 100% 100%, ${TRANSPARENT} 0%, ${TRANSPARENT}
      3%, ${FADE_0_01} 3.5%),
-webkit-repeating-radial-gradient(50% 50%, 100% 100%, ${TRANSPARENT}
      0%, ${TRANSPARENT} 6%, ${FADE_100_01} 7.5%),
-webkit-repeating-radial-gradient(50% 50%, 100% 100%, ${TRANSPARENT}
      0%, ${TRANSPARENT} 1.2%, ${FADE_100_02} 2.2%),
-webkit-radial-gradient(50% 50%, 200% 50%, ${FADE_90_1} 5%, ${FADE_85_1}
      30%, ${FADE_60_1} 100%);
`;

const METAL_LINEAR_GRADIENT = `-webkit-repeating-linear-gradient(left, ${TRANSPARENT} 0%, ${TRANSPARENT} 6%, ${FADE_100_01} 7.5%),
 -webkit-repeating-linear-gradient(left, ${TRANSPARENT} 0%, ${TRANSPARENT} 4%, ${FADE_0_003} 4.5%),
 -webkit-repeating-linear-gradient(left, ${TRANSPARENT} 0%, ${TRANSPARENT} 1.2%, ${FADE_100_015} 2.2%),
 linear-gradient(180deg, hsl(0,0%,78%) 0%, hsl(0,0%,90%) 47%, hsl(0,0%,78%) 53%, hsl(0,0%,70%) 100%);`;

const METAL_CONICAL_GRADIENT = `-webkit-radial-gradient(50% 0%, 10% 50%, ${FADE_0_01} 0%, ${TRANSPARENT} 100%),
-webkit-radial-gradient(50% 100%, 10% 50%, ${FADE_0_01} 0%, ${TRANSPARENT} 100%),
-webkit-radial-gradient(0% 50%, 50% 10%, ${FADE_0_01} 0%, ${TRANSPARENT} 100%),
-webkit-radial-gradient(100% 50%, 50% 0%, ${FADE_0_01} 0%, ${TRANSPARENT} 100%)`;

export const metalConicalCss = css`
  &:before,
  &:after {
    content: "";
    top: 0;
    left: 0;
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    pointer-events: none;
    /* fake conical gradients */
    background-image: ${METAL_CONICAL_GRADIENT};
  }
  &:before {
    transform: rotate(65deg);
  }
  &:after {
    transform: rotate(-65deg);
  }
`;

export const metalRadialCss = css`
  position: relative;
  background-image: ${METAL_RADIAL_GRADIENT};
  ${metalConicalCss}
  filter: brightness(100%);
`;

export const metalLinearCss = css`
  background-color: hsla(0, 0%, 90%, 1);
  background-image: linear-gradient(
    -45deg,
    hsla(0, 0%, 0%, 0),
    hsla(0, 0%, 0%, 0.05)
  );
  background-image: ${METAL_LINEAR_GRADIENT};
  background-size: 5px;
`;

//BLUE
export const metalActiveCss = css`
  color: hsl(210, 100%, 40%);
  text-shadow: hsla(210, 100%, 20%, 0.3)
      0 -1px 0,
    hsl(210, 100%, 85%) 0 2px 1px,
    hsla(200, 100%, 80%, 1) 0 0 5px,
    hsla(210, 100%, 50%, 0.6) 0 0 20px;
  box-shadow: inset
      hsla(210, 100%, 30%, 1) 0 0px 0px
      4px,
    /* border */ inset
      hsla(210, 100%, 15%, 0.4) 0 -1px 5px
      4px,
    /* soft SD */ inset
      hsla(210, 100%, 20%, 0.25) 0 -1px 0px
      7px,
    /* bottom SD */ inset
      hsla(210, 100%, 100%, 0.7) 0 2px
      1px 7px,
    /* top HL */
      hsla(210, 100%, 75%, 0.8) 0 0px
      3px 2px,
    /* outer SD */
      hsla(210, 50%, 40%, 0.25) 0 -5px 6px
      4px,
    /* outer SD */
      hsla(210, 80%, 95%, 1) 0 5px 6px
      4px;
  /* outer HL */
`;
