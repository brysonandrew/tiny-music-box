import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const textCss = css`
  position: relative;
  text-transform: uppercase;
  padding: 1px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;
export const Text = styled(motion.div)`
  ${textCss}
`;

export const blinkerCss = css`
  position: absolute;
  top: 4px;
  width: 2px;
  height: 20px;
  z-index: 2;
`;

export const GUTTER_TEXT_WHITE =
  "rgba(117, 125, 140, 1)";

export const textBaseCss = css`
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const textLgCss = css`
  ${textBaseCss}
  font-size: 32px;
  line-height: 40px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export const textMdCss = css`
  ${textBaseCss}
  font-size: 24px;
  line-height: 28px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export const textSmCss = css`
  ${textBaseCss}
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export const textXsCss = css`
  ${textBaseCss}
  font-size: 16px;
`;

export const TextXs = styled(
  motion.div
)`
  ${textXsCss}
`;

export const textXxsCss = css`
  ${textBaseCss}
  font-size: 8px;
`;

export const textBackgroundCss = css`
  ${textXxsCss}
  position: relative;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  transform: translate(0%, 0%);
  text-shadow: none;
  height: 21px;
  line-height: 21px;
  font-size: 18px;
`;
export const TextBackground = styled(
  motion.div
)`
  ${textBackgroundCss}
`;
