import { css } from "@emotion/react";
import styled from "@emotion/styled";

const thumbCss = css`
  appearance: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  filter: brightness(100%);
`;

export const inputRangeStyles = css`
  outline: none;
  padding: 0;
  margin: 0;
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

export const SliderRow = styled.ul`
  align-items: center;
  border-radius: 4px;
`;
