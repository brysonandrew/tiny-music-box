import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import {
  GAP,
  GAP_05,
  GLASS_GREY,
  GLASS_PURPLE_09,
  GLASS_WHITE,
  ICON_SIZE,
} from "./constants";

export const rowCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const icon = css`
  ${rowCenter}
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
`;

export const rowGap = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const rowEven = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const columnCenter = css`
  ${rowCenter}
  flex-direction: column;
`;

export const columnStart = css`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export const columnEnd = css`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
`;

export const columnStartEnd = css`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: column;
`;

export const spaceCss = css`
  padding: ${GAP}px;
`;

export const Space = styled.div`
  ${spaceCss}
`;

export const halfSpaceCss = css`
  padding: ${GAP_05}px;
`;

export const HalfSpace = styled.div`
  ${halfSpaceCss}
`;

export const SELECT_TEXT = {
  initial: false,
  animate: {
    opacity: 0.6,
    color: GLASS_WHITE,
  },
  whileHover: {
    opacity: 1,
    color: GLASS_GREY,
  },
};

export const breakCss = css`
  margin: ${GAP_05}px 0 ${GAP}px;
  height: 1px;
  background-color: ${GLASS_PURPLE_09};
`;
export const Break = styled(motion.div)`
  ${breakCss}
`;
