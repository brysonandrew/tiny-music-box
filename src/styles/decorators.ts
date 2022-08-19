import { css } from "@emotion/react";
import { ICON_SIZE } from "./constants";

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
