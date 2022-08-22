import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { metalRadialCss } from "../styles/metal";
import {
  GLASS_BLACK,
  GLASS_PURPLE,
  GLASS_PURPLE_09,
  GLASS_WHITE_04,
} from "../styles/constants";
const THUMB_SIZE = 20;

const thumbCss = css`
  ${metalRadialCss}
  appearance: none;
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  cursor: pointer;
  border: none;
  border-radius: ${THUMB_SIZE * 0.5}px;
  filter: brightness(100%);
`;

export const inputRangeStyles = css`
  background-color: ${GLASS_PURPLE_09};
  outline: none;
  padding: 0;
  margin: 0;
  border-radius: ${THUMB_SIZE * 0.5}px;

  -webkit-appearance: none;
  cursor: crosshair;

  &:focus {
    outline: none;
  }
  &::-webkit-slider-thumb {
    ${thumbCss}
  }

  &:active::-webkit-slider-thumb {
  }

  &::-moz-range-thumb {
    ${thumbCss}
  }

  &:active::-moz-range-thumb {
  }

  &:focus {
    &::-webkit-slider-thumb {
    }
  }

  &::-moz-range-track {
    padding: 0 10px;
    background: repeating-linear-gradient(
      to right,
      #ccc,
      #ccc 10%,
      #000 10%,
      #000 11%,
      #ccc 11%,
      #ccc 20%
    );
  }

  &::-moz-focus-inner,
  &::-moz-focus-outer {
    border: 0;
  }
`;

export const Root = styled(
  motion.label
)`
  position: relative;
  width: 100%;
  height: 40px;
  z-index: 0;
  & datalist {
    position: absolute;
    display: flex;
    align-items: flex-start;
    top: -10px;
    left: 10px;
    width: calc(100% - 20px);
    height: 10px;
    pointer-events: none;
  }
  & option {
    position: absolute;
    top: 20px;
    left: 0;
    font-size: 10px;
    width: 0;
    &:last-child {
      text-align: right;
    }
    &:after {
      content: "";
      top: -10px;
      height: 10px;
      width: 1px;
    }
  }
`;

export const Input = styled(
  motion.input
)`
  ${inputRangeStyles}
  position: relative;
  left: 0;
  top: 0;
  height: 20px;
  width: 100%;
  transform: translateY(-100%);
`;
