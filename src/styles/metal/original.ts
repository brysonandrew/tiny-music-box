/*
Metal styles from
https://codepen.io/simurai/pen/DwJdq
*/

import { css } from "@emotion/react";
import { GLASS_RED } from "../constants";

const metalBorderStyle = css`
  box-shadow: inset hsla(0, 0%, 15%, 1)
      0 0px 0px 4px,
    /* border */ inset
      hsla(0, 0%, 15%, 0.8) 0 -1px 5px 4px,
    /* soft SD */ inset
      hsla(0, 0%, 0%, 0.25) 0 -1px 0px 7px,
    /* bottom SD */ inset
      hsla(0, 0%, 100%, 0.7) 0 2px 1px
      7px;
`;

const metalBorderActiveStyle = css`
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
    hsla(0, 0%, 100%, 0.6) 0 2px 1px;
  background-color: hsl(0, 0%, 90%);
  transition: color 0.2s;
  ${metalBorderStyle}
`;

export const METAL_RADIAL_GRADIENT = `radial-gradient(
  50% 0%,
  8% 50%,
  hsla(0, 0%, 100%, 0.5) 0%,
  hsla(0, 0%, 100%, 0) 100%
),
radial-gradient(50% 100%, 12% 50%, hsla(0, 0%, 100%, 0.6) 0%, hsla(
        0,
        0%,
        100%,
        0
      )
      100%),
radial-gradient(0% 50%, 50% 7%, hsla(0, 0%, 100%, 0.5) 0%, hsla(
        0,
        0%,
        100%,
        0
      )
      100%),
radial-gradient(100% 50%, 50% 5%, hsla(0, 0%, 100%, 0.5) 0%, hsla(
        0,
        0%,
        100%,
        0
      )
      100%),
repeating-radial-gradient(50% 50%, 100% 100%, hsla(0, 0%, 0%, 0) 0%, hsla(
        0,
        0%,
        0%,
        0
      )
      3%, hsla(0, 0%, 0%, 0.1) 3.5%),
repeating-radial-gradient(50% 50%, 100% 100%, hsla(0, 0%, 100%, 0)
      0%, hsla(0, 0%, 100%, 0) 6%, hsla(0, 0%, 100%, 0.1) 7.5%),
repeating-radial-gradient(50% 50%, 100% 100%, hsla(0, 0%, 100%, 0)
      0%, hsla(0, 0%, 100%, 0) 1.2%, hsla(0, 0%, 100%, 0.2) 2.2%),
radial-gradient(50% 50%, 200% 50%, hsla(0, 0%, 90%, 1) 5%, hsla(
        0,
        0%,
        85%,
        1
      )
      30%, hsla(0, 0%, 60%, 1) 100%);
`;

export const metalRadialCss = css`
  position: relative;
  background-image: ${METAL_RADIAL_GRADIENT};
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
    background-image: -webkit-radial-gradient(
        50% 0%,
        10% 50%,
        hsla(0, 0%, 0%, 0.1) 0%,
        hsla(0, 0%, 0%, 0) 100%
      ),
      -webkit-radial-gradient(50% 100%, 10%
            50%, hsla(0, 0%, 0%, 0.1) 0%, hsla(
              0,
              0%,
              0%,
              0
            )
            100%),
      -webkit-radial-gradient(0% 50%, 50%
            10%, hsla(0, 0%, 0%, 0.1) 0%, hsla(
              0,
              0%,
              0%,
              0
            )
            100%),
      -webkit-radial-gradient(100% 50%, 50%
            06%, hsla(0, 0%, 0%, 0.1) 0%, hsla(
              0,
              0%,
              0%,
              0
            )
            100%);
  }

  &:before {
    transform: rotate(65deg);
  }
  &:after {
    transform: rotate(-65deg);
  }
`;

export const metalLinearCss = css`
  background-image: -webkit-repeating-linear-gradient(
      left,
      hsla(0, 0%, 100%, 0) 0%,
      hsla(0, 0%, 100%, 0) 6%,
      hsla(0, 0%, 100%, 0.1) 7.5%
    ),
    -webkit-repeating-linear-gradient(left, hsla(
            0,
            0%,
            0%,
            0
          )
          0%, hsla(0, 0%, 0%, 0) 4%, hsla(
            0,
            0%,
            0%,
            0.03
          )
          4.5%),
    -webkit-repeating-linear-gradient(left, hsla(
            0,
            0%,
            100%,
            0
          )
          0%, hsla(0, 0%, 100%, 0) 1.2%, hsla(
            0,
            0%,
            100%,
            0.15
          )
          2.2%);
`;

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
