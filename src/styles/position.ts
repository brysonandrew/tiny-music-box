import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { FC } from "react";

export const centerSelfCss = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const coverCss = css`
  ${centerSelfCss}
  width: 100%;
  height: 100%;
`;

export const centerChildrenCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CenterSelf = styled.div`
  ${centerSelfCss}
`;

export const CenterToAnchor = styled.div`
  position: relative;
  transform: translate(-50%, -50%);
`;

export const CenterAnchor = styled.div`
  ${centerSelfCss}
  position: fixed;
  width: 0px;
  height: 0px;
`;

export const Presentation = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
`;

export const Controls = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;
